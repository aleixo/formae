import { TComponent } from 'core';
import * as apis from 'core/apis';
import * as Events from 'core/events';

export const handler = ({ field, eventReducedSchema: { validations }, form }: Events.TEventInformation) => {
  if (!validations) return;

  const error = apis.validations.run(
    field.data.value,
    validations,
    field.scopedComponent.errorMessages,
    form.formData.fields,
  );
  field.errors = error;

  (field.data.failedErrorMessages as string[]) = field.getFieldErrorMessages(field.data);
};

export const events = (component: TComponent) => Object.keys(component.validations || {});
