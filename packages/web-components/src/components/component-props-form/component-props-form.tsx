import { Form, FormProvider, TSchema, useForm } from "@form-builder/engine";
import { useEffect, useState } from "react";

import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { formMapper, formPropsMapping } from "../../common/mappings/mappings";
import { EBuilderComponentPropsTypes } from "../../common/types/engine";
import { ScopeModal } from "../scope-modal/scope-modal";

const ComponentPropsForm = () => {
  const cms = useCms();
  const schema = useSchema();
  const [formKey, setFormKey] = useState(new Date().getTime());

  const { formData } = useForm({ id: "builder_form" });

  useEffect(() => {
    setFormKey(new Date().getTime());
  }, [cms.state.selectedComponent?.name]);

  if (!cms.state.selectedComponent) return <></>;

  return (
    <FormProvider mapper={formMapper} propsMapping={formPropsMapping}>
      <ScopeModal scope={formData().form.scope} />
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
              component: EBuilderComponentPropsTypes.GROUP,
              name: "",
              children: [
                {
                  component: EBuilderComponentPropsTypes.GROUP,
                  name: "",
                  children: cms.props[
                    cms.state.selectedComponent?.component
                  ].map((comp) => ({
                    ...comp,
                    name: "props." + comp.name,
                    props: {
                      ...comp.props,
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
