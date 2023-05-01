import React, { useEffect, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Form, FormProvider, useForm, TSchema } from '../form';
import { formBuilderPropsMapping, FormCheckbox, FormInput, Mappings } from './mappings/bolttech';

export default {
  title: 'Form/Jsx',
  component: Form,
};

const schema: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            mb: 1,
          },
          children: [
            {
              component: 'input',
              name: 'name',
              props: {
                name: 'change',
                id: 'change',
                label: 'On Change',
              },
            },
            {
              component: 'input',
              name: 'blur',
              props: {
                name: 'blur',
                id: 'blur',
                label: 'On Blur',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const ConnectedInputInsideSchema: Story = (): React.ReactElement => {
  const { submitForm } = useForm({
    id: '1',
    onData: (data) => {},
    onSubmit: console.log,
  });
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <Form schema={schema} id="1" />

      <button onClick={submitForm}>SUBMIT</button>
    </FormProvider>
  );
};

export const ConnectedValidations: Story = (): React.ReactElement => {
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <FormInput
        filter={{ maxLength: 10 }}
        masks={{
          ON_FIELD_FOCUS: { cleanMask: true },
          ON_FIELD_BLUR: {
            generic: [
              {
                from: 1,
                to: 2,
                mask: 'X',
              },
              {
                from: 4,
                to: 5,
                mask: 'X',
              },
            ],
          },
        }}
        formatters={{
          ON_FIELD_CHANGE: {
            splitter: [
              {
                position: 2,
                value: '/',
              },
              {
                position: 5,
                value: '/',
              },
            ],
          },
        }}
        name="ss"
        validations={{
          ON_FIELD_BLUR: {
            callback: (data) => {
              return {
                fail: data === '10/10/1000',
              };
            },
          },
        }}
        errorMessages={{ default: 'ERRRO' }}
      />
    </FormProvider>
  );
};

export const CustomValue: Story = (): React.ReactElement => {
  const [value, setValue] = useState('initial value');
  useEffect(() => {
    setTimeout(() => {
      setValue('My updatedvalue');
    }, 3000);
  }, []);
  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <FormInput value={value} name="ss" />
    </FormProvider>
  );
};

export const InitialyVisibility: Story = (): React.ReactElement => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1500);
  }, []);

  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <FormCheckbox
        disabled={false}
        checked={!!visible}
        id="field_visibility"
        name="field_visibility"
        label="Visibility Example"
        onChange={() => setVisible(!visible)}
      />
      <FormInput visibility={visible} value="visible now" name="ss2" variants="bg-grey" />
    </FormProvider>
  );
};

export const AddingRemovingField: Story = (): React.ReactElement => {
  const [rows, setRows] = useState(1);

  return (
    <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
      <>
        {Array.from({ length: rows }).map((_el, idx) => (
          <FormInput
            key={idx}
            variants="bg-grey"
            formId="ADD_RM_FIELD"
            label="Field example"
            name={`field.${idx}.asd`}
            validations={{ ON_FIELD_BLUR: { required: true } }}
            errorMessages={{ required: 'This field is required' }}
          />
        ))}

        <button onClick={() => setRows(rows - 1)}>Delete row</button>
        <button onClick={() => setRows(rows + 1)}>Add new row</button>
      </>
    </FormProvider>
  );
};

export const UseFormOnMultiple: Story = (): React.ReactElement => {
  const { submitForm } = useForm({
    ids: ['form1', 'form2'],
    onSubmit: (data) => {
      console.log('SUBMIT ', data);
    },
  });
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
      <Form
        id="form1"
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
                      name: 'emailform1',
                      props: {
                        variants: 'default_border',
                        label: 'Input form 1',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
      <Form
        id="form2"
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
                      component: 'input',
                      name: 'emailform2',
                      props: {
                        variants: 'default_border',
                        label: 'Input form 2',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
      <button onClick={() => submitForm()}>Submit the two forms</button>
    </FormProvider>
  );
};

export const UseFormGroup: Story = (): React.ReactElement => {
  const { submitForm } = useForm({
    ids: ['form', 'form2'],
    onValid: (d, a) => {
      console.log('validation', d, a);
    },
    onSubmit: (data) => {
      console.log('SUBMIT ', data);
    },
    onData: console.log,
  });
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
      <Form
        id="form"
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
                      name: 'emailform1',
                      props: {
                        variants: 'default_border',
                        label: 'Input form 1',
                      },
                      validations: {
                        ON_FIELD_CHANGE: {
                          required: true,
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
      <Form
        id="form2"
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
                      component: 'input',
                      name: 'emailform2',
                      props: {
                        variants: 'default_border',
                        label: 'Input form 2',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
      <button onClick={() => submitForm()}>Submit the two forms</button>
    </FormProvider>
  );
};
