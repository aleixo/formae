import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { FormTextField } from "../textfield/textfield";
import { useForm } from "@form-builder/engine";

const NewTemplateModal = ({ open, onClose, feature, template }) => {
  const [openModal, setOpenModal] = useState(open);
  const [isValid, setIsValid] = useState(false);
  const cms = useCms();

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  const { formData } = useForm({
    id: "new_template",
    onData: (data) => {
      setIsValid(data.form.isValid);
    },
  });

  return (
    <Dialog
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>New template</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ser the configurations for the new template
        </DialogContentText>
        <FormTextField
          fullWidth
          formId="new_template"
          placeholder="Template name"
          name="new_template_name"
          validations={{
            ON_FIELD_MOUNT: {
              required: true,
            },
            ON_FIELD_CHANGE: {
              required: true,
            },
          }}
          errorMessages={{
            default: "Template name is required",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={!isValid}
          onClick={() => {
            setOpenModal(false);
            cms.dispatch({
              type: ECMSActions.ADD_TEMPLATE,
              payload: {
                template: {
                  feature,
                  configuration: template,
                  name: formData()?.formatted?.new_template_name as string,
                },
              },
            });
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { NewTemplateModal };
