import * as Events from 'core/events';
import * as apis from 'core/apis';
import { TComponent } from 'core/types';

export const handler = ({ form, eventReducedSchema }: Events.TEventInformation) => {
  eventReducedSchema?.clearFields.forEach((clearField) => {
    clearField.fields.forEach((fieldName) => {
      const targetField = form.fields[fieldName];
      if (!targetField) return;
      if (!clearField.validations) {
        targetField.value = clearField.clearedValue;
        targetField.rehydrate();

        return;
      }

      const errors = apis.validations.run(targetField.value, clearField.validations);

      if (!targetField.fieldHasError(errors)) return;
      targetField.value = clearField.clearedValue;
      targetField.rehydrate();
    });
  });
};

export const events = (component: TComponent) => Object.keys(component.clearFields || {});
