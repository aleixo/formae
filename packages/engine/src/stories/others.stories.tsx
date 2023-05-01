import React, { useEffect, useRef } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { formBuilderPropsMapping, Mappings } from './mappings/bolttech';
import { Form, FormProvider, TFormRefActions, TSchema } from '../form';
import { useState } from 'react';

export default {
  title: 'Form/Others',
  component: Form,
};

const groups: TSchema = {
  validations: {
    path: {
      required: true,
      path: 'roofUpdatedOptions',
    },
  },
  filteredFields: ['roofUpdatedOptions'],
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          component: 'formGroup',
          name: 'containerGroup',
          props: {
            center: true,
            mb: 0.5,
          },
          children: [
            {
              name: 'roofUpdated',
              group: 'roofUpdatedOptions',
              clearFields: {
                ON_FIELD_CHANGE: [
                  {
                    validations: {
                      value: 'Yes',
                    },
                    fields: ['roofNoUpdated'],
                    clearedValue: false,
                  },
                ],
              },
              component: 'checkbox',
              props: {
                id: 'roofUpdated',
                dataTestId: 'roofUpdated',
                checked: false,
                label: 'Yes',
                variant: 'rounded',
                size: 3,
                value: 'Yes',
                padding: '14px 20px',
                bgColor: '#ffffff',
                updateBackground: true,
              },
            },
            {
              name: 'roofNoUpdated',
              group: 'roofUpdatedOptions',
              clearFields: {
                ON_FIELD_CHANGE: [
                  {
                    validations: {
                      value: 'No',
                    },
                    fields: ['roofUpdated'],
                    clearedValue: false,
                  },
                ],
              },
              component: 'checkbox',
              props: {
                id: 'roofNoUpdated',
                dataTestId: 'roofNoUpdated',
                checked: false,
                label: 'No',
                value: 'No',
                variant: 'rounded',
                size: 3,
                padding: '14px 20px',
                bgColor: '#ffffff',
                updateBackground: true,
              },
            },
          ],
        },
      ],
    },
  ],
};

export const Groups: Story = (): React.ReactElement => {
  const [schema, setSchema] = useState();
  const [groupValue, setGroupValue] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setSchema(groups);
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        initialValues={{ roofUpdatedOptions: 'Yes' }}
        schema={schema}
        onData={(data) => {
          setGroupValue(data.formatted.roofUpdatedOptions as string);
        }}
      />
      <h2>Group selected value:</h2>
      <h3>{groupValue}</h3>
    </FormProvider>
  );
};
export const AsyncSchema: Story = (): React.ReactElement => {
  const [schema, setSchema] = useState();
  const [groupValue, setGroupValue] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setSchema(groups);
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form
        renderLoading={() => <p>Loading schema in 3 secs</p>}
        initialValues={{ roofUpdatedOptions: 'Yes' }}
        schema={schema}
        onData={(data) => {
          setGroupValue(data.formatted.roofUpdatedOptions as string);
        }}
      />
      <h2>Group selected value:</h2>
      <h3>{groupValue}</h3>
    </FormProvider>
  );
};

const schema: TSchema = {
  action: '${global.x}',
  method: 'POST',
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          children: [
            {
              component: 'input',
              name: 'email',
              validations: {
                ON_FIELD_CHANGE: {
                  required: true,
                },
              },
              errorMessages: {
                required: 'E-mail is mandatory',
                email: 'Must be a valid e-mail',
              },
              props: {
                name: 'testsubscreve',
                variants: 'default_border',
                placeholder: 'Please enter your email address',
                label: 'E-mail address',
              },
            },
            {
              component: 'input',
              name: 'email2',
              errorMessages: {
                required: 'E-mail is mandatory',
                email: 'Must be a valid e-mail',
              },
              validations: {
                ON_FIELD_CHANGE: {
                  required: false,
                },
              },
              props: {
                name: 'default_border',
                variants: 'default_border',
                placeholder: 'Please enter your email address2',
                label: 'E-mail address2',
              },
            },
            {
              component: 'input',
              name: 'password',
              errorMessages: {
                required: 'Password is required',
                value: 'Error varOps.add(${fields.email.value||0},10)',
              },
              validations: {
                ON_FIELD_CHANGE: {
                  required: true,
                  value: 'varOps.add(${fields.email.value||0},10)',
                },
              },
              props: {
                variants: 'default_border',
                placeholder: 'Please enter your password',
                label: 'Password dsa das ',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const useMethodAndAction: Story = (): React.ReactElement => {
  const [x, t] = useState('');
  useEffect(() => {
    setTimeout(() => {
      t('https://jsonplaceholder.typicode.com/posts');
    }, 5000);
  }, []);
  const ref = useRef<TFormRefActions>(null);

  return (
    <FormProvider
      mapper={Mappings}
      propsMapping={{
        __default__: { onBlur: 'onBlur', getValue: 'onChange', setValue: 'value', setErrorMessage: 'errorMessage' },
      }}
    >
      <Form ref={ref} schema={schema} iVars={{ x }} />
      <button type="submit" onClick={() => ref.current?.submit()}>
        submit
      </button>
    </FormProvider>
  );
};

export const SetErrorState: Story = (): React.ReactElement => {
  const [s, d] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      d(false);
    }, 10000);
  }, []);
  return (
    <FormProvider
      mapper={Mappings}
      propsMapping={{
        __default__: {
          onBlur: 'onBlur',
          getValue: 'onChange',
          setValue: 'value',
          setErrorMessage: 'errorMessage',
          setErrorState: 'isErrored',
        },
      }}
    >
      <p>Inject error state into the component. Errors - Required, email</p>
      <Form
        disable={s}
        schema={{
          components: [
            {
              component: '',
              name: '',
              children: [
                {
                  name: '',
                  component: 'formGroup',
                  children: [
                    {
                      component: 'errorStateInput',
                      name: 'email',
                      props: {
                        variants: 'default_border',
                        label: 'E-mail address',
                      },
                      validations: {
                        ON_FIELD_MOUNT: {
                          required: true,
                          email: true,
                        },
                        ON_FIELD_CHANGE: {
                          required: true,
                          email: true,
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
    </FormProvider>
  );
};
