import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, Grid, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useCms } from "../../contexts/cms.context";
import { Form, FormProvider } from "@form-builder/engine";
import { useState } from "react";
import { NewTemplateModal } from "../new-template-modal/new-template-modal";
import { ActionAreaCard } from "../action-area-card/action-area-card";
import { useSchema } from "../../hooks/useSchema";
import { ECMSActions } from "../../contexts/cms.reducer";
const FormComponentFeatureTemplate = ({ feature, template, onChangeTemplate, showGrid, }) => {
    const [openNewTemplateModal, setOpenNewTemplateModal] = useState(false);
    const cms = useCms();
    const schema = useSchema();
    const dispatchNewComponentToSchema = (component) => {
        cms.dispatch({
            type: ECMSActions.SET_BUILDER_SCHEMA,
            payload: {
                schema: schema.addToFormStep(cms.state.schema, component),
            },
        });
    };
    return (_jsxs(List, { children: [_jsx(NewTemplateModal, { open: openNewTemplateModal, onClose: () => setOpenNewTemplateModal(false), feature: feature, template: template }), template && (_jsxs(ListItemButton, Object.assign({ onClick: () => {
                    setOpenNewTemplateModal(true);
                } }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Save and create template from selection" })] }))), showGrid || (_jsx(ListItemButton, { children: _jsxs(FormControl, Object.assign({ fullWidth: true }, { children: [_jsx(InputLabel, Object.assign({ id: "templates" }, { children: "Configured templates" })), _jsx(Select, Object.assign({ labelId: "templates", id: "demo-simple-select", value: "Templates", label: "Configured templates", placeholder: "Select one template", onChange: (e) => {
                                onChangeTemplate(cms.state.templates[feature].find((template) => template.name === e.target.value));
                            } }, { children: cms.state.templates[feature] &&
                                cms.state.templates[feature].map((template) => (_jsx(MenuItem, Object.assign({ value: template.name }, { children: template.name }), template.name))) }))] })) })), showGrid && (_jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: cms.state.templates.container &&
                    cms.state.templates.container.map((template) => (_jsx(Grid, Object.assign({ item: true, xs: 6 }, { children: _jsx(ActionAreaCard, { preview: () => (_jsx(FormProvider, Object.assign({ propsMapping: cms.propsMapping, mapper: cms.mappings }, { children: _jsx(Form, { disable: true, schema: schema.addToFormStep(schema.initForm(), template.configuration) }) }))), title: template.name, description: "User template", onClick: () => {
                                dispatchNewComponentToSchema(schema.cloneComponent(template.configuration));
                            } }) }), template.name))) })))] }));
};
export { FormComponentFeatureTemplate };
//# sourceMappingURL=form-template.js.map