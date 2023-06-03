import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useForm } from "@form-builder/engine";
import { FormTextField } from "../textfield/textfield";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";

const PageConfigurations = ({ page }) => {
  const { submitForm } = useForm({
    id: "new_page",
    onSubmit: async () => {
      //const res = await createBin(
      //  schema.init({ configs: data.formatted.configs }),
      //  data.formatted.configs.name
      //);
      //router.push(`/builder?id=${res.metadata?.id}`);
    },
  });

  const onRemovePageClick = useCallback(async () => {
    //await deleteBin(router.query.id);
    //router.push(`/builder`);
  }, []);

  return (
    <div>
      {page && (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Name" secondary={page.configs.name} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Url" secondary={page.configs.url} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Vacation"
              secondary={page.configs.description}
            />
          </ListItem>
        </List>
      )}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} id="new">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            New/clone
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Add page or clone this
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormTextField
            formId="new_page"
            label="Name"
            name="configs.name"
            placeholder="Page name"
          />
          <FormTextField
            formId="new_page"
            label="Url"
            name="configs.url"
            placeholder="Page url"
          />
          <FormTextField
            formId="new_page"
            label="Description"
            name="configs.description"
            placeholder="Page description"
          />
        </AccordionDetails>
        <Button onClick={submitForm}>Add</Button>
        <Button onClick={submitForm}>Clone this content</Button>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} id="new">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Page details
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Edit current page details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            endIcon={<Delete />}
            variant="outlined"
            fullWidth
            color="error"
            onClick={onRemovePageClick}
          >
            REMOVE PAGE
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export { PageConfigurations };
