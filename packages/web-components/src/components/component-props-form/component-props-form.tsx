import { Form, FormProvider, TSchema } from "@form-builder/engine";
import { useEffect, useState } from "react";

import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { EBuilderComponentPropsTypes } from "../../types/engine";
import { Checkbox } from "../checkbox/checkbox";
import { FormGroup } from "../formGroup/formGroup";
import { TextField } from "../textfield/textfield";

const ComponentPropsForm = () => {
  const cms = useCms();
  const schema = useSchema();
  const [formKey, setFormKey] = useState(new Date().getTime());

  useEffect(() => {
    setFormKey(new Date().getTime());
  }, [cms.state.selectedComponent?.name]);

  if (!cms.state.selectedComponent) return <></>;
  return (
    <FormProvider
      mapper={{
        [EBuilderComponentPropsTypes.STRING]: {
          component: TextField,
        },
        [EBuilderComponentPropsTypes.BOOLEAN]: {
          component: Checkbox,
        },
        formGroup: {
          component: FormGroup,
        },
      }}
      propsMapping={{
        [EBuilderComponentPropsTypes.STRING]: {
          getValue: "onChange",
          setValue: "value",
        },
        [EBuilderComponentPropsTypes.BOOLEAN]: {
          getValue: "onChange",
          setValue: "checked",
        },
      }}
    >
      <Form
        key={formKey}
        onData={(data) => {
          cms.dispatch({
            type: ECMSActions.SET_BUILDER_SCHEMA,
            payload: {
              schema: schema.edit<TSchema>(cms.state.schema!, {
                ...cms.state.selectedComponent,
                ...data.formatted,
              } as any),
            },
          });
        }}
        initialValues={cms.state.selectedComponent}
        id={[cms.state.selectedComponent?.component] + ".props"}
        schema={{
          components: [
            {
              component: "formGroup",
              name: "",
              children: [
                {
                  component: "formGroup",
                  name: "",
                  children: cms.props[
                    cms.state.selectedComponent?.component
                  ].map((comp) => ({
                    ...comp,
                    name: "props." + comp.name,
                    props: {
                      label:
                        comp.name.charAt(0).toUpperCase() + comp.name.slice(1),
                    },
                  })),
                },
              ],
            },
          ],
        }}
      />
    </FormProvider>
  );
};

export { ComponentPropsForm };
