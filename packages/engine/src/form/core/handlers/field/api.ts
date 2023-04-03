import { TComponent } from 'core';
import { validations } from 'core/apis';
import * as Events from 'core/events';

const DEFAULT_DEBOUNCE_MS = 200;

export const handler = ({ field, form, eventReducedSchema: { api } }: Events.TEventInformation) =>
  api.forEach((apiCall) => {
    const { scope } = field;
    const meetsRunningCondition = validations.run(
      field.data.value,
      apiCall.preConditions || {},
      field.scopedComponent.errorMessages,
      form?.formData?.fields,
    );
    if (
      field.fieldHasError(meetsRunningCondition) ||
      (apiCall.blockRequestWhenInvalid && field.fieldValidationsHaveError(false))
    )
      return;

    scope.globalScope = {
      namespace: 'api',
      key: apiCall.scope,
      data: {
        loading: true,
      },
    };
    field.debounce(() => {
      return fetch(apiCall.url, {
        method: apiCall.method,
        ...(apiCall.body && { body: JSON.stringify(apiCall.body) }),
        headers: apiCall.headers || { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((res) => {
          const parsedResponse = res.json();
          if (res.status >= 400) throw parsedResponse;

          return parsedResponse;
        })
        .then((res) => {
          scope.globalScope = {
            namespace: 'api',
            key: apiCall.scope,
            data: {
              loading: false,
              response: res,
              ...(res as any),
            },
          };
        })
        .catch(async (err) => {
          const jsonErr = await err;
          scope.globalScope = {
            namespace: 'api',
            key: apiCall.scope,
            data: {
              loading: false,
              error: true,
              err: jsonErr,
            },
          };
        });
    }, apiCall.debounceTime || DEFAULT_DEBOUNCE_MS);
  });

export const events = (component: TComponent) => Object.keys(component.api || {});
