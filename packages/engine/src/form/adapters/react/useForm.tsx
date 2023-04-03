import { useEffect, useCallback, useRef } from 'react';

import { TChildrenOptions, TFormValues } from './types';

import { getFormInstance, CoreEvents, ALL_NAMESPACE_EVENTS } from 'core';
import { DEFAULT_FORM_HOOK_ID } from 'core/constants';

type TProps = {
  formId?: string;
  onValid?(data: TFormValues): void;
  onData?(data: TFormValues): void;
  onSubmit?(data: TFormValues | { data: TFormValues }): void;
};

type THookReturn = {
  submitForm(): void;
  formData(opts?: TChildrenOptions): TFormValues;
  configs: { formId: string };
};

const useForm = ({ onValid, onData, onSubmit, formId = DEFAULT_FORM_HOOK_ID }: TProps): THookReturn => {
  const formRef = useRef<{ values: TFormValues }>(null);

  const onDataChange = useCallback(() => {
    const data = getFormInstance(formId).formData;
    if (data.form?.isValid !== formRef?.current?.values?.form?.isValid) {
      onValid && onValid(data);
    }
    onData && onData(data);
  }, [onData, onValid]);

  useEffect(
    () => getFormInstance(formId).subscribe(ALL_NAMESPACE_EVENTS(CoreEvents.ON_FIELD_CHANGE), onDataChange),
    [onData, onValid],
  );

  useEffect(
    () => getFormInstance(formId).subscribe(ALL_NAMESPACE_EVENTS(CoreEvents.ON_FIELD_REHYDRATE), onDataChange),
    [onData, onValid],
  );

  useEffect(
    () =>
      getFormInstance(formId).subscribe(
        CoreEvents.ON_FORM_SUBMIT,
        () => onSubmit && onSubmit(getFormInstance(formId).formData),
      ),
    [onSubmit],
  );

  const submitForm = () => getFormInstance(formId).publish(CoreEvents.ON_FORM_SUBMIT);

  const configs = {
    formId: getFormInstance(formId).formId,
  };

  return { submitForm, formData: () => getFormInstance(formId).formData, configs };
};

export default useForm;
