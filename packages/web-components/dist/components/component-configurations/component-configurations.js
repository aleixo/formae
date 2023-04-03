import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { FormComponentFeatures } from "../form-component-features/form-component-features";
import { ComponentPropsForm } from "../component-props-form/component-props-form";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import { FormTextField } from "../textfield/textfield";
import { Accordion } from "../accordion/accordion";
import { FormCheckbox } from "../checkbox/checkbox";
const RawComponentConfigurations = ({ component }) => {
    if (!component)
        return _jsx(_Fragment, {});
    return (_jsxs(_Fragment, { children: [_jsx(Accordion, Object.assign({ title: "Templates", description: "All the configured templates" }, { children: _jsx(Accordion, Object.assign({ disabled: !component.children, title: "Configured templates", description: "Templates that can contain several fields and their configurations" }, { children: _jsxs(Stack, { children: [_jsx(FormCheckbox, { name: "isReference", formId: "new_template", label: "Is Reference" }), _jsx(FormTextField, { name: "templateName", variant: "outlined", formId: "new_template", placeholder: "name" }), _jsx(Button, Object.assign({ variant: "contained", onClick: (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                } }, { children: "Create" }))] }) })) })), _jsx(ComponentPropsForm, {}), _jsx(FormComponentFeatures, { feature: "validations" })] }));
};
const ComponentConfigurations = React.memo(RawComponentConfigurations, (prev, next) => {
    var _a, _b;
    if (((_a = prev.component) === null || _a === void 0 ? void 0 : _a.name) === ((_b = next.component) === null || _b === void 0 ? void 0 : _b.name))
        return true;
    return false;
});
export { ComponentConfigurations };
//# sourceMappingURL=component-configurations.js.map