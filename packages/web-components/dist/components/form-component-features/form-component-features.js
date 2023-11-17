import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FormProvider, } from "@form-builder/engine";
import { formMapper, formPropsMapping } from "../../common/mappings/mappings";
import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";
import { useCallback, useState } from "react";
import { ECMSActions } from "../../contexts/cms.reducer";
import { schema as validationsSchema } from "./forms/form-component-features.validations";
import { schema as formattersSchema } from "./forms/form-component-features.formatters";
import { schema as errorMessagesSchema } from "./forms/form-component-features.error-messages";
import { schema as filterSchema } from "./forms/form-component-features.filter";
import { schema as apiSchema } from "./forms/form-component-features.api";
import { schema as masksSchema } from "./forms/form-component-features.masks";
import { schema as basicsSchema } from "./forms/form-component-features.basics";
import { schema as formConfigurationsSchema } from "./forms/form-component-features.configurations";
import { FeatureEvents } from "./form-component-events";
import * as S from "./form-component-features.styles";
import { FormComponentFeatureTemplate } from "../form-template/form-template";
import { Divider, Stack } from "@mui/material";
function merge(...objects) {
    const isObject = (obj) => obj && typeof obj === "object";
    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = merge(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
}
const FormComponentFeatures = ({ feature = "basic", events, onEventClick, showEventSelection, allowTemplate = true, title, }) => {
    var _a;
    const cms = useCms();
    const schema = useSchema();
    const updateSchemaConfiguration = useCallback((formatted) => {
        cms.dispatch({
            type: ECMSActions.SET_BUILDER_SCHEMA,
            payload: {
                schema: Object.assign(Object.assign({}, formatted), cms.state.schema),
            },
        });
    }, [cms]);
    const handleComponentUpdate = useCallback((data) => {
        if (feature === "configurations") {
            return updateSchemaConfiguration(data.formatted);
        }
        const component = Object.assign(Object.assign({}, cms.state.selectedComponent), data.formatted);
        cms.dispatch({
            type: ECMSActions.SET_SELECTED_COMPONENT,
            payload: {
                component,
            },
        });
        cms.dispatch({
            type: ECMSActions.SET_BUILDER_SCHEMA,
            payload: {
                schema: schema.edit(cms.state.schema, component),
            },
        });
        //setFormKey(new Date().getTime());
    }, [cms, feature, schema, updateSchemaConfiguration]);
    const [formKey] = useState(new Date().getTime());
    const [selectedEvent, setSelectedEvent] = useState();
    if (showEventSelection && events) {
        return (_jsx(FeatureEvents, { events: events, onEventClick: (event) => {
                onEventClick && onEventClick(event);
                setSelectedEvent(event);
            } }));
    }
    return (_jsx(FormProvider, Object.assign({ mapper: formMapper, propsMapping: formPropsMapping }, { children: _jsxs(Stack, Object.assign({ spacing: 3, maxHeight: "100vh" }, { children: [allowTemplate && (_jsxs(_Fragment, { children: [_jsx(Divider, { children: "Templates" }), _jsx(FormComponentFeatureTemplate, { onChangeTemplate: (template) => {
                                if (selectedEvent) {
                                    handleComponentUpdate({
                                        formatted: {
                                            [feature]: {
                                                [selectedEvent]: template.configuration,
                                            },
                                        },
                                    });
                                }
                            }, feature: feature, template: selectedEvent
                                ? ((cms.state.selectedComponent || {})[feature] ||
                                    {})[selectedEvent]
                                : (cms.state.selectedComponent || {})[feature] })] })), _jsx(Divider, { children: title }), _jsx(S.FormFullWidth, { submitOnValidOnly: false, initialValues: Object.assign(Object.assign({}, cms.state.selectedComponent), { formattedDataDefaults: (_a = cms.state.schema) === null || _a === void 0 ? void 0 : _a.formattedDataDefaults }), onData: handleComponentUpdate, id: "features", schema: {
                        basic: basicsSchema,
                        configurations: formConfigurationsSchema,
                        validations: validationsSchema,
                        formatters: formattersSchema,
                        errorMessages: errorMessagesSchema,
                        filter: filterSchema,
                        api: apiSchema,
                        masks: masksSchema,
                    }[feature]({
                        event: selectedEvent,
                        component: cms.state.selectedComponent,
                    }) }, formKey)] })) })));
};
export { FormComponentFeatures };
//# sourceMappingURL=form-component-features.js.map