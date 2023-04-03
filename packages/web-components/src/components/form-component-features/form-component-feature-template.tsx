import {
  FormControl,
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

const FormComponentFeatureTemplate = ({
  feature,
  template,
  onChangeTemplate,
}: {
  template: any;
  feature: string;
  onChangeTemplate(template: { formatted: TComponent }): void;
}) => {
  const [openNewTemplateModal, setOpenNewTemplateModal] = useState(false);
  const cms = useCms();
  console.log(cms.state.templates);
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
    </List>
  );
};
export { FormComponentFeatureTemplate };
