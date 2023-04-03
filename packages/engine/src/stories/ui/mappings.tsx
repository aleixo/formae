import Input from '@bit/bolttech.components.ui.input';
import Checkbox from '@bit/bolttech.components.ui.checkbox';
import FormGroup from '@bit/bolttech.components.common.form-group';
import Dropdown from '@bit/bolttech.components.ui.dropdown';
import CreditNumberInput from '@bit/bolttech.components.common.credit-number-input';
import CvvInput from '@bit/bolttech.components.common.cvv-input';
import { asFormField } from 'index';
import React from 'react';

const formBuilderPropsMapping = {
  cvvInput: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
  creditNumberInput: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
  h1: {
    setValue: 'value',
  },
  p: {
    setValue: 'value',
  },
  input: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
  checkbox: {
    getValue: 'onChange',
    setValue: 'checked',
  },
  dropdown: {
    getValue: 'onSelect',
    setValue: 'value',
  },
};
const ReactInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;
const FormInput = asFormField({ Comp: ReactInput, propsMapping: formBuilderPropsMapping.input });

const mappings = {
  cvvInput: { component: async () => await import('@bit/bolttech.components.common.cvv-input'), label: 'CVV Input' },
  creditNumberInput: { component: CreditNumberInput, label: 'Credit Number Input' },
  input: { component: async () => await import('@bit/bolttech.components.ui.input'), label: 'Input' },
  checkbox: { component: Checkbox, label: 'Checkbox' },
  formGroup: { component: FormGroup, label: 'Form Group' },
  dropdown: { component: Dropdown, label: 'Dropdown' },
};
const props = {
  input: {
    label: {
      type: 'string',
      required: false,
    },
  },
};

export { mappings, formBuilderPropsMapping, FormInput, props };
