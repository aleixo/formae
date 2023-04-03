import { TComponent, TField, useForm } from 'index';
import React from 'react';
import * as S from './ComponentConfigurations.styles';
import { FormInput, props } from './mappings';

const ComponentConfigurations = ({
  component,
  onSave,
  onClose,
}: {
  component: TComponent & TField;
  onSave(component: TComponent): void;
  onClose(): void;
}) => {
  const { submitForm } = useForm({
    formId: 'configs',
    onSubmit: (data) => onSave({ ...component, ...data.formatted }),
  });

  return (
    <S.Container>
      <S.Col>
        <S.Row>
          <label>Name</label>
          <FormInput formId="configs" name="name" value={component.name} />
        </S.Row>
      </S.Col>
      <S.Col>
        <h4>Props</h4>
        {Object.keys(props[component.component as string]).map((prop) => (
          <S.Row>
            <label>{prop}</label>
            <FormInput
              formId="configs"
              name={`props.${prop}`}
              value={component.props[prop]}
              validations={{
                ON_FIELD_CHANGE: {
                  required: props[component.component as string][prop].required,
                },
              }}
              errorMessages={{
                required: props[component.component as string][prop].required ? 'Field is Required' : 'undefined',
              }}
            />
          </S.Row>
        ))}
      </S.Col>
      <S.Col>
        <h4>Validations</h4>
        <h5>On change</h5>
        <button>+</button>
        {Object.keys(component?.validations?.ON_FIELD_CHANGE).map((key) => (
          <S.Row>
            <label>{key}</label>
            <FormInput
              formId="configs"
              name={`validations.ON_FIELD_CHANGE.${key}`}
              value={component?.validations?.ON_FIELD_CHANGE[key]}
            />
          </S.Row>
        ))}
        <h5>On blur</h5>
        <button>+</button>
        <h5>On mount</h5>
        <button>+</button>
      </S.Col>
      <button type="submit" onClick={submitForm}>
        Save
      </button>
      <button onClick={onClose}>Close</button>
    </S.Container>
  );
};

export { ComponentConfigurations };
