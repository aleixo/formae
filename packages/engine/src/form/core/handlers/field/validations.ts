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

  // Publish on validation toggle topic if needed
  if (field.fieldHasError(error) !== field.fieldHasError()) {
    field.publish(Events.EEVents.ON_FIELD_VALIDATION_TOGGLE, { field: field.data });
  }

  field.errors = error;

  field.data.failedErrorMessages = field.getFieldErrorMessages(field.data);
};

export const events = (component: TComponent) => Object.keys(component.validations || {});
