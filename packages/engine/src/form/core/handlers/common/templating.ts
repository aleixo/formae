import * as utils from 'core/utils';
import * as Events from 'core/events';
import * as apis from 'core/apis';

import { BUILD_EVENT } from 'core/events';

const template = {
  BEGIN: '${',
  END: '}',
  DEFAULT_SPLITTER: '||',
};

const hasTemplateString = (value: string) => {
  return /\$\{(.*)\}.*/g.test(value);
};

const varOps = {
  PREFIX: 'varOps.',
  FUNCTION_SUFFIX: ')',
  FUNCTION_PREFIX: '(',
  FUNCTION_ARGUMENTS_SPLITTER: ',',
};

const isVarOps = (value: string) => value.includes(varOps.PREFIX);

const extractVarOpsArgs = (value: string) =>
  value
    .split(varOps.PREFIX)[1]
    .split(varOps.FUNCTION_PREFIX)[1]
    .split(varOps.FUNCTION_SUFFIX)[0]
    .split(varOps.FUNCTION_ARGUMENTS_SPLITTER);

const getVarOpsOp = (value: string) => apis.varOps[value.split(varOps.PREFIX)[1].split(varOps.FUNCTION_PREFIX)[0]];

export const handler = ({ field, form }: Events.TEventInformation) => {
  const scopeComponent = () => {
    if (!field) return;
    const { children, wrapper, ...rest } = field.component;
    const scopedComponent = {
      ...inObject(rest as any),
    };

    field.scopedComponent = {
      ...rest,
      ...scopedComponent,
      children,
      wrapper,
    };
  };

  const scopeForm = () => {
    const { components, ...rest } = form.schema;
    const newScopedForm = inObject<any>(rest);

    form.scopedSchema = newScopedForm;
    form.rehydrate();
  };

  const subscribeFieldToScopeChange = (parts) => {
    const isFieldExcludedObservable = !field.scope.scope.configs?.observables?.templates?.exclude?.includes(
      field.component.name,
    );
    const matchingParts = parts[0].split('.');
    isFieldExcludedObservable &&
      field.subscribe(BUILD_EVENT(Events.EEVents.ON_SCOPE_CHANGE, matchingParts[0], matchingParts[1]), () => {
        scopeComponent();
        field.rehydrate();
      });
  };

  const replaceTemplateString = (targetString: string): any => {
    targetString = targetString.toString();
    const lastIndex = targetString.lastIndexOf(template.BEGIN);
    if (lastIndex === -1) return targetString;

    const substringTemplate = targetString.substring(lastIndex + template.BEGIN.length, targetString.length);
    let match = substringTemplate.substring(0, substringTemplate.indexOf(template.END));
    const originalMatchLength = match.length;

    let defaultValue = '';
    const parts = match.split(template.DEFAULT_SPLITTER);
    if (parts.length > 1) {
      match = parts[0];
      defaultValue = (utils.object.getValueByPath(field.scope.getGlobalScope(), parts[1]) as string) || parts[1];
    }

    field && subscribeFieldToScopeChange(parts);

    const scopedTemplateValue = utils.object.getValueByPath(form.scope.getGlobalScope(), match);

    let value = typeof scopedTemplateValue === 'undefined' ? defaultValue : scopedTemplateValue;

    // If we are interested in other data than string and its the only data we have in the template, we just return it
    if (typeof value !== 'string' && lastIndex === 0) {
      return value;
    }

    // Otherwise, we just stringify it and ussume the client will use as string
    try {
      value = JSON.stringify(value).replace(/^"(.*)"$/, '$1');
      // eslint-disable-next-line no-empty
    } catch (e) {}

    const scopedString =
      targetString.substring(0, lastIndex) +
      value +
      targetString.substring(
        lastIndex + originalMatchLength + template.BEGIN.length + template.END.length,
        targetString.length,
      );

    if (isVarOps(scopedString) && !hasTemplateString(scopedString)) {
      return scopedString.replace(/([^\s]+)/g, (match) => {
        if (!isVarOps(match)) return match;

        const fn = getVarOpsOp(match);
        if (fn) {
          return fn(...extractVarOpsArgs(match));
        }
      });
    }
    return replaceTemplateString(scopedString);
  };

  const inObject = <T extends Record<string, unknown>>(obj: T, recursionLevel = 0): Record<string, unknown> => {
    if (typeof obj === 'string') {
      return replaceTemplateString(obj);
    }
    if (typeof obj === 'number') {
      return obj;
    }

    const object = { ...obj };
    return Object.keys(object).reduce((acc, key): Record<string, string> => {
      if (object[key] === null) {
        return acc;
      }

      if (Array.isArray(object[key])) {
        return {
          ...acc,
          [key]: (object[key] as unknown[]).map(inObject),
        };
      }

      if (typeof object[key] === 'object') {
        return {
          ...acc,
          [key]: {
            ...inObject({ ...(object[key] as Record<string, unknown>) }, recursionLevel + 1),
          },
        };
      }

      if (typeof object[key] !== 'string') {
        return {
          ...acc,
          [key]: object[key],
        };
      }

      if (!hasTemplateString(object[key] as string)) {
        return { ...acc, [key]: object[key] };
      }
      let value = replaceTemplateString(object[key] as string);

      try {
        if (utils.string.hasJsonStructure(value)) {
          value = JSON.parse(value);
        }
        // eslint-disable-next-line no-empty
      } catch (e) {}

      return {
        ...acc,
        [key]: value,
      };
    }, {});
  };

  scopeComponent();
  scopeForm();
};
