import React, { useRef } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Form, FormProvider, TFormRefActions } from '../form';
export default {
  title: 'Form/CrashCourse',
};

// MAPPINGS

import Input from '@bit/bolttech.components.ui.input';
import FormGroup from '@bit/bolttech.components.common.form-group';

import { TMapper } from 'adapters/react';

const mappings: TMapper = {
  input: { component: Input },
  formGroup: { component: FormGroup },
};

const propsMappings = {
  input: {
    getValue: 'onChange',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
  },
};

// FORMS

export const Basic: Story = (): React.ReactElement => {
  const ref = useRef<TFormRefActions>(null);
  return (
    <FormProvider mapper={mappings} propsMapping={propsMappings}>
      <div style={{ backgroundColor: 'beige', padding: '1rem' }}>
        <Form
          ref={ref}
          autoComplete="nope"
          initialValues={{ myInput: '222' }}
          submitOnValidOnly={false}
          schema={{
            filteredFields: ['myInput'],
            components: [
              {
                component: '',
                name: '',
                children: [
                  {
                    component: 'formGroup',
                    name: '',
                    props: {
                      title: 'Group',
                      mb: '200px',
                    },
                    children: [
                      {
                        group: 'r',
                        component: 'input',
                        name: 'myInput',
                        props: {
                          label: 'A minha label',
                          placeholder: '${global.i18n.myInputPlaceholder}',
                        },
                        validations: {
                          ON_FIELD_CHANGE: {
                            required: true,
                          },
                        },
                      },
                      {
                        group: 'r',
                        component: 'input',
                        name: 'myInput3',
                        props: {
                          label: 'A minha label',
                          placeholder: '${global.i18n.myInputPlaceholder}',
                        },
                      },
                      {
                        group: 'r',
                        component: 'input',
                        name: 'myInput4',
                        props: {
                          label: 'A minha label',
                          placeholder: '${global.i18n.myInputPlaceholder}',
                        },
                      },
                      {
                        component: 'input',
                        name: 'myInput2',
                        props: {
                          label: 'A minha label2 ',
                          placeholder: 'Meu component2',
                        },
                        group: 'r',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
        />
        <button onClick={() => ref.current?.submit()}>dasdasd</button>
      </div>
    </FormProvider>
  );
};

export const VisibilityConditions: Story = (): React.ReactElement => (
  <FormProvider mapper={mappings} propsMapping={propsMappings}>
    <div style={{ backgroundColor: 'beige', padding: '1rem' }}>
      <Form
        schema={{
          components: [
            {
              component: '',
              name: '',
              children: [
                {
                  component: 'formGroup',
                  name: '',
                  props: {
                    title: 'My group',
                  },
                  children: [
                    {
                      component: 'input',
                      name: '1',
                      props: {
                        label: 'Input 1',
                      },
                    },
                    {
                      component: 'input',
                      name: '2',
                      props: {
                        label: 'Visibility conditions',
                      },
                      visibilityConditions: {
                        ON_FIELD_CHANGE: [
                          {
                            validations: {
                              value: '2',
                            },
                            fieldNames: ['1'],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
    </div>
  </FormProvider>
);

export const ClearFields: Story = (): React.ReactElement => (
  <FormProvider mapper={mappings} propsMapping={propsMappings}>
    <div style={{ backgroundColor: 'beige', padding: '1rem' }}>
      <Form
        schema={{
          components: [
            {
              component: '',
              name: '',
              children: [
                {
                  component: 'formGroup',
                  name: '',
                  props: {
                    title: 'My group',
                  },
                  children: [
                    {
                      component: 'input',
                      name: '1',
                      props: {
                        label: 'Input 1',
                      },
                    },
                    {
                      component: 'input',
                      name: '2',
                      props: {
                        label: 'Clear Fields',
                      },
                      clearFields: {
                        ON_FIELD_CHANGE: [
                          {
                            validations: {
                              value: '2',
                            },
                            fields: ['1'],
                            clearedValue: 'cleared',
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
    </div>
  </FormProvider>
);
