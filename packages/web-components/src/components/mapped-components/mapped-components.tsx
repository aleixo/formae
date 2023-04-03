import { Grid } from "@mui/material";
import { ReactElement } from "react";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { ActionAreaCard } from "../action-area-card/action-area-card";

const MappedComponents = (): ReactElement => {
  const cms = useCms();
  const schema = useSchema();
  return (
    <Grid container spacing={2}>
      {Object.keys(cms.mappings).map((key, i) => (
        <Grid item xs={6} key={key}>
          <ActionAreaCard
            title={cms.mappings[key].label as string}
            description={cms.mappings[key].description as string}
            onClick={() => {
              cms.dispatch({
                type: ECMSActions.SET_BUILDER_SCHEMA,
                payload: {
                  schema: schema.addToFormStep(
                    cms.state.schema!,
                    schema.buildComponent({
                      component: key,
                      props: cms.examples[key] as any,
                    })
                  ),
                },
              });
            }}
          ></ActionAreaCard>
        </Grid>
      ))}
    </Grid>
  );
};

export { MappedComponents };
