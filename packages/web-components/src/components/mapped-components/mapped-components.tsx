import { Divider, Grid, Stack } from "@mui/material";
import { ReactElement } from "react";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { ActionAreaCard } from "../action-area-card/action-area-card";
import { FormComponentFeatureTemplate } from "../form-template/form-template";
import { Form, FormProvider, TSchema } from "@form-builder/engine";
const MappedComponents = (): ReactElement => {
  const cms = useCms();
  const schema = useSchema();

  const dispatchNewComponentToSchema = (component) => {
    cms.dispatch({
      type: ECMSActions.SET_BUILDER_SCHEMA,
      payload: {
        schema: schema.addToFormStep(cms.state.schema!, component),
      },
    });
  };

  return (
    <Stack spacing={3}>
      <Divider>User mapped components</Divider>
      <Grid container spacing={2}>
        {Object.keys(cms.mappings).map((key, i) => (
          <Grid item xs={6} key={key}>
            <ActionAreaCard
              preview={() => (
                <FormProvider
                  propsMapping={cms.propsMapping}
                  mapper={cms.mappings}
                >
                  <Form
                    disable
                    schema={schema.addToFormStep(
                      schema.initForm(),
                      schema.buildComponent({
                        component: key,
                        props: cms.examples[key] as any,
                      })
                    )}
                  />
                </FormProvider>
              )}
              title={cms.mappings[key].label as string}
              description={cms.mappings[key].description as string}
              onClick={() => {
                dispatchNewComponentToSchema(
                  schema.buildComponent({
                    component: key,
                    props: cms.examples[key] as any,
                  })
                );
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Divider>Container Templates</Divider>
      <FormComponentFeatureTemplate
        feature="container"
        template={cms.state.selectedComponent}
        onChangeTemplate={(template) => {}}
        showGrid
      />
    </Stack>
  );
};

export { MappedComponents };
