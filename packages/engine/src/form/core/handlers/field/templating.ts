import * as utils from 'core/utils';
import * as Events from 'core/events';
import * as apis from 'core/apis';

import { TComponent } from 'core/types';

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

export const handler = ({ field }: Events.TEventInformation) => {
  if (!field) return;
  const { component } = field;

  const isFieldExcludedObservable = !field.scope.scope.configs?.observables?.templates?.exclude?.includes(
    field.component.name,
  );

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

    const matchingParts = parts[0].split('.');
    isFieldExcludedObservable &&
      field.subscribe(Events.BUILD_EVENT(Events.EEVents.ON_SCOPE_CHANGE, matchingParts[0], matchingParts[1]), () => {
        field.scopedComponent = scopeComponent();
        field.rehydrate();
      });

    const scopedTemplateValue = utils.object.getValueByPath(field.scope.getGlobalScope(), match);

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
        } as Record<string, string>;
      }

      if (typeof object[key] === 'object') {
        return {
          ...acc,
          [key]: {
            ...inObject({ ...(object[key] as Record<string, unknown>) }, recursionLevel + 1),
          },
        } as Record<string, string>;
      }

      if (typeof object[key] !== 'string') {
        return {
          ...acc,
          [key]: object[key],
        } as Record<string, string>;
      }

      if (!hasTemplateString(object[key] as string)) {
        return { ...acc, [key]: object[key] } as Record<string, string>;
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
      } as Record<string, string>;
    }, {} as Record<string, string>);
  };

  const scopeComponent = (): TComponent => {
    const { children, wrapper, ...rest } = component;
    const scopedComponent = {
      ...inObject(rest as any),
    };

    return {
      ...rest,
      ...scopedComponent,
      children,
      wrapper,
    };
  };
  field.scopedComponent = scopeComponent();
};
