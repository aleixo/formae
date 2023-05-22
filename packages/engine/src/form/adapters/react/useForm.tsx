import { useEffect, useCallback } from 'react';

import { TChildrenOptions, TFormValues } from './types';

import { getFormInstance, CoreEvents, ALL_NAMESPACE_EVENTS, TField } from 'core';
import { DEFAULT_FORM_HOOK_ID } from 'core/constants';
import { EEVents } from 'core/events';

type TProps = {
  /**
   * The if of the form you want to connect to
   */
  id?: string;
  /**
   * And array of ids of forms you want to connect to
   */
  ids?: string[];
  /**
   * Callback to be called when form validity toggled
   * @param data All the available form data
   */
  onValid?(data: TFormValues, field: TField): void;
  /**
   * Callback to be called when the form generates some new data
   * @param data All the available form data
   */
  onData?(data: TFormValues): void;
  /**
   * Callback to be called when the form submits
   * @param data All the available form data
   */
  onSubmit?(data: TFormValues): void;
};

type THookReturn = {
  /**
   * A function that lets you start the form submission
   */
  submitForm(): void;
  /**
   * You can call this function to get all the updated form data
   *
   * @param opts Options to configure your form data
   */
  formData(opts?: TChildrenOptions): TFormValues;
};

/**
 * This hooks lets you connect to your form/s in anywherer in your application. Even if you are outside the <FormProvider />
 *
 * You can connect to:
 * - A specific form
 * - Several forms identified by their id's
 * - A group of forms
 *
 */
const useForm = ({ onValid, onData, onSubmit, id = DEFAULT_FORM_HOOK_ID, ids }: TProps): THookReturn => {
  /**
   * Subscribe to some event.
   *
   * If the hook has more than one formId, will run subscription for all of them
   *
   * @param event The event name
   * @param cb The callback to run on subscription
   */
  const subscribe = (event, cb) => {
    if (!cb) return;
    if (ids) {
      ids.map((formId) =>
        getFormInstance(formId).subscribe(event, ({ data }) =>
          cb(getFormInstance(formId).formData, { field: data.field }),
        ),
      );
      return;
    }

    getFormInstance(id).subscribe(event, cb);
  };

  /**
   * Get all the available form data
   *
   * Will return to a given form, or data to multiple form in the same data structure
   *
   * @returns form data
   */
  const extractFormsData = () => {
    if (!ids) return getFormInstance(id).formData;
    return ids.reduce(
      (acc, formId) =>
        Object.keys(acc).reduce(
          (innerAcc, key) => ({
            ...innerAcc,
            [key]: { ...acc[key], ...getFormInstance(formId).formData[key] },
          }),
          {},
        ),
      {
        formatted: {},
        erroredFields: {},
        fields: {},
        form: {},
        predictableErroredFields: {},
        filteredFields: {},
      },
    ) as TFormValues;
  };

  const onDataChange = useCallback(() => {
    let data = getFormInstance(id).formData;
    if (ids) {
      data = ids.reduce(
        (acc, formId) => ({
          ...acc,
          [formId]: getFormInstance(formId).formData,
        }),
        {},
      ) as TFormValues;
    }

    onData && onData(data);
  }, [onData, onValid]);

  useEffect(() => subscribe(EEVents.ON_FIELD_VALIDATION_TOGGLE, onValid), [onValid]);
  useEffect(() => subscribe(ALL_NAMESPACE_EVENTS(CoreEvents.ON_FIELD_CHANGE), onDataChange), [onData, onValid]);
  useEffect(() => subscribe(ALL_NAMESPACE_EVENTS(CoreEvents.ON_FIELD_REHYDRATE), onDataChange), [onData, onValid]);

  useEffect(
    () =>
      subscribe(CoreEvents.ON_FORM_SUBMIT, () => {
        onSubmit && onSubmit(extractFormsData());
      }),
    [onSubmit],
  );

  const submitForm = () => getFormInstance(ids ? ids[0] : id).publish(CoreEvents.ON_FORM_SUBMIT);

  return { submitForm, formData: extractFormsData };
};

export default useForm;
