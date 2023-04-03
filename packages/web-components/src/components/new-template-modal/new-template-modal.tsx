import {
  Modal,
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { FormTextField } from "../textfield/textfield";
import { useForm } from "@form-builder/engine";

const NewTemplateModal = ({ open, onClose, feature, template }) => {
  const [openModal, setOpenModal] = useState(open);
  const cms = useCms();
  useEffect(() => {
    setOpenModal(open);
  }, [open]);
  const { formData } = useForm({
    formId: "new_template",
  });

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxHeight: "50%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <Typography id="modal-modal-title" variant="h4" component="h2">
          New Template
        </Typography>
        <FormTextField
          formId="new_template"
          placeholder="Template name"
          name="new_template_name"
        />
        <Button
          onClick={() => {
            cms.dispatch({
              type: ECMSActions.ADD_TEMPLATE,
              payload: {
                template: {
                  feature,
                  configuration: template,
                  name:
                    (formData()?.formatted?.new_template_name as string) ||
                    "new_template",
                },
              },
            });
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export { NewTemplateModal };
