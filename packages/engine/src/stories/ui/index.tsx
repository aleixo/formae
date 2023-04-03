import React, { useState } from 'react';
import { ComponentsPanel } from './ComponentsPanel';
import { mappings, formBuilderPropsMapping } from './mappings';
import * as S from './index.styles';
import * as schema from './schema';
import { Form, FormProvider, TComponent, TField } from '../../form';
import { ComponentConfigurations } from './ComponentConfigurations';

const UI = () => {
  const [formKey, setFormKey] = useState(new Date().getTime());
  const [buildingSchema, setBuildingSchema] = useState(schema.init());
  const [selectedComponent, setSelectedComponent] = useState<(TComponent & TField) | undefined>(undefined);
  const handleComponentClick = (key) => {
    setFormKey(new Date().getTime());
    setBuildingSchema(schema.add(buildingSchema, schema.buildComponent({ component: key })));
  };
  return (
    <FormProvider mapper={mappings} propsMapping={formBuilderPropsMapping}>
      <S.Container>
        <S.ComponentsContainer>
          <ComponentsPanel components={mappings} onComponentClick={handleComponentClick} />
        </S.ComponentsContainer>
        <S.BuilderContainer>
          <Form
            key={formKey}
            id={formKey.toString()}
            schema={buildingSchema}
            onFocus={(_, component, field) => {
              setSelectedComponent({ ...component, ...field });
            }}
          />
          {!!selectedComponent && (
            <ComponentConfigurations
              component={selectedComponent}
              onClose={() => setSelectedComponent(undefined)}
              onSave={(component: TComponent) => {
                setFormKey(new Date().getTime());
                setBuildingSchema(
                  schema.edit(
                    buildingSchema,
                    component,
                    selectedComponent.schemaLocation?.step,
                    selectedComponent.schemaLocation?.index,
                    selectedComponent.schemaLocation?.depth,
                  ),
                );
              }}
            />
          )}
        </S.BuilderContainer>
      </S.Container>
    </FormProvider>
  );
};

export { UI };
