import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, } from "@mui/material";
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
        formId: "new_template",
        onData: (data) => {
            setIsValid(data.form.isValid);
        },
    });
    return (_jsxs(Dialog, Object.assign({ open: openModal, onClose: onClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: [_jsx(DialogTitle, { children: "New template" }), _jsxs(DialogContent, { children: [_jsx(DialogContentText, { children: "Ser the configurations for the new template" }), _jsx(FormTextField, { fullWidth: true, formId: "new_template", placeholder: "Template name", name: "new_template_name", validations: {
                            ON_FIELD_MOUNT: {
                                required: true,
                            },
                            ON_FIELD_CHANGE: {
                                required: true,
                            },
                        }, errorMessages: {
                            default: "Template name is required",
                        } })] }), _jsxs(DialogActions, { children: [_jsx(Button, Object.assign({ onClick: () => {
                            setOpenModal(false);
                        } }, { children: "Cancel" })), _jsx(Button, Object.assign({ disabled: !isValid, onClick: () => {
                            var _a, _b;
                            setOpenModal(false);
                            cms.dispatch({
                                type: ECMSActions.ADD_TEMPLATE,
                                payload: {
                                    template: {
                                        feature,
                                        configuration: template,
                                        name: (_b = (_a = formData()) === null || _a === void 0 ? void 0 : _a.formatted) === null || _b === void 0 ? void 0 : _b.new_template_name,
                                    },
                                },
                            });
                        } }, { children: "Save" }))] })] })));
};
export { NewTemplateModal };
//# sourceMappingURL=new-template-modal.js.map