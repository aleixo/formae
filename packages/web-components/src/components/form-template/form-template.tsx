import {
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useCms } from "../../contexts/cms.context";
import { TComponent } from "@form-builder/engine";
import { useState } from "react";
import { NewTemplateModal } from "../new-template-modal/new-template-modal";
import { ActionAreaCard } from "../action-area-card/action-area-card";
import { useSchema } from "../../hooks/useSchema";
import { ECMSActions } from "../../contexts/cms.reducer";

const FormComponentFeatureTemplate = ({
  feature,
  template,
  onChangeTemplate,
  showGrid,
}: {
  showGrid?: boolean;
  template: any;
  feature: string;
  onChangeTemplate(template: { formatted: TComponent }): void;
}) => {
  const [openNewTemplateModal, setOpenNewTemplateModal] = useState(false);
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
    <List>
      <NewTemplateModal
        open={openNewTemplateModal}
        onClose={() => setOpenNewTemplateModal(false)}
        feature={feature}
        template={template}
      />
      <ListItemButton
        onClick={() => {
          setOpenNewTemplateModal(true);
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Save and create template from selection" />
      </ListItemButton>
      {showGrid || (
        <ListItemButton>
          <FormControl fullWidth>
            <InputLabel id="templates">Configured templates</InputLabel>
            <Select
              labelId="templates"
              id="demo-simple-select"
              value={"Templates"}
              label="Configured templates"
              placeholder="Select one template"
              onChange={(e) => {
                onChangeTemplate(
                  cms.state.templates[feature].find(
                    (template) => template.name === e.target.value
                  )
                );
              }}
            >
              {cms.state.templates[feature] &&
                cms.state.templates[feature].map((template) => (
                  <MenuItem key={template.name} value={template.name}>
                    {template.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </ListItemButton>
      )}
      {showGrid && (
        <Grid container spacing={2}>
          {cms.state.templates.container &&
            cms.state.templates.container.map((template) => (
              <Grid item xs={6} key={template.name}>
                <ActionAreaCard
                  title={template.name}
                  description={"User template"}
                  onClick={() => {
                    console.log(template);
                    dispatchNewComponentToSchema(
                      schema.cloneComponent(template.configuration)
                    );
                  }}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </List>
  );
};
export { FormComponentFeatureTemplate };
