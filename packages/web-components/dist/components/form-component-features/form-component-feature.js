import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/system";
import { EBuilderComponentPropsTypes } from "../../types/engine";
import { Checkbox } from "../checkbox/checkbox";
import { FormTextField } from "../textfield/textfield";
const ComponentFeature = ({ event, feature, validation, formId, component, index, }) => {
    const buildFieldName = (opts = { validation }) => {
        var _a, _b;
        const fieldNames = {
            ARRAY_FEATURE: () => `${feature.key}.${event === null || event === void 0 ? void 0 : event.event}.[${index}].${opts.validation}`,
            CONFIGURED_EVENTS: () => `${feature.key}${(event === null || event === void 0 ? void 0 : event.event) ? "." + (event === null || event === void 0 ? void 0 : event.event) : ""}${validation ? "." + validation : ""}`,
            NO_CONFIGURED_EVENTS: () => `${feature.key}${validation ? "." + validation : ""}`,
        };
        if (feature.type === EBuilderComponentPropsTypes.ARRAY) {
            return fieldNames.ARRAY_FEATURE();
        }
        if ((_a = feature.configurations) === null || _a === void 0 ? void 0 : _a.events) {
            return fieldNames.CONFIGURED_EVENTS();
        }
        if (!((_b = feature.configurations) === null || _b === void 0 ? void 0 : _b.events)) {
            return fieldNames.CONFIGURED_EVENTS();
        }
        return "";
    };
    const extractFieldValueFromComponent = (validation) => {
        var _a, _b, _c, _d, _e, _f;
        const hasNoConfigurationFields = !((_a = feature.configurations) === null || _a === void 0 ? void 0 : _a.fields);
        if (!component[feature.key]) {
            return "";
        }
        if (feature.type === EBuilderComponentPropsTypes.ARRAY &&
            component[feature.key][event === null || event === void 0 ? void 0 : event.event][index]) {
            return component[feature.key][event === null || event === void 0 ? void 0 : event.event][index][validation];
        }
        const hasConfigurationFields = !hasNoConfigurationFields &&
            ((_b = feature.configurations) === null || _b === void 0 ? void 0 : _b.fields) &&
            (((_d = (_c = feature.configurations) === null || _c === void 0 ? void 0 : _c.fields[validation]) === null || _d === void 0 ? void 0 : _d.type) ===
                EBuilderComponentPropsTypes.NUMBER ||
                ((_f = (_e = feature.configurations) === null || _e === void 0 ? void 0 : _e.fields[validation]) === null || _f === void 0 ? void 0 : _f.type) ===
                    EBuilderComponentPropsTypes.STRING);
        return hasConfigurationFields
            ? component[feature.key][validation]
            : component[feature.key];
    };
    const render = (validation) => {
        var _a, _b, _c, _d, _e;
        const fieldName = buildFieldName({ validation: validation });
        const fieldValue = extractFieldValueFromComponent(validation);
        if (!((_a = feature === null || feature === void 0 ? void 0 : feature.configurations) === null || _a === void 0 ? void 0 : _a.fields)) {
            return _jsx(_Fragment, {});
        }
        if ((validation &&
            ((_b = feature === null || feature === void 0 ? void 0 : feature.configurations.fields[validation]) === null || _b === void 0 ? void 0 : _b.type) ===
                EBuilderComponentPropsTypes.OBJECT) ||
            (!validation && feature.type === EBuilderComponentPropsTypes.OBJECT)) {
            return (_jsx(FormTextField, { sx: { pb: 2 }, fullWidth: true, formId: formId, name: fieldName, label: validation, placeholder: validation, value: fieldValue }));
        }
        if ((validation &&
            ((_c = feature === null || feature === void 0 ? void 0 : feature.configurations.fields[validation]) === null || _c === void 0 ? void 0 : _c.type) ===
                EBuilderComponentPropsTypes.STRING) ||
            (validation &&
                ((_d = feature === null || feature === void 0 ? void 0 : feature.configurations.fields[validation]) === null || _d === void 0 ? void 0 : _d.type) ===
                    EBuilderComponentPropsTypes.NUMBER) ||
            (!validation && feature.type === EBuilderComponentPropsTypes.STRING) ||
            (!validation && feature.type === EBuilderComponentPropsTypes.NUMBER)) {
            return (_jsx(FormTextField, { fullWidth: true, formId: formId, name: fieldName, label: validation, placeholder: validation, value: fieldValue }));
        }
        if ((validation &&
            ((_e = feature === null || feature === void 0 ? void 0 : feature.configurations.fields[validation]) === null || _e === void 0 ? void 0 : _e.type) ===
                EBuilderComponentPropsTypes.BOOLEAN) ||
            (!validation && feature.type === EBuilderComponentPropsTypes.BOOLEAN)) {
            return (_jsxs("div", { children: [_jsx("label", { children: validation }), _jsx(Checkbox, { formId: formId, name: fieldName, checked: fieldValue, value: fieldValue })] }));
        }
        return _jsx(_Fragment, {});
    };
    if (typeof validation === "object") {
        return (_jsxs(_Fragment, { children: [Object.keys(validation).map((key, i) => (_jsx(Box, Object.assign({ sx: { pb: 1 } }, { children: render(key) }), i + key + validation))), _jsx("br", {})] }));
    }
    return render(validation);
};
export { ComponentFeature };
//# sourceMappingURL=form-component-feature.js.map