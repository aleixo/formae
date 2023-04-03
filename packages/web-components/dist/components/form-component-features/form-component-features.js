import { jsx as _jsx } from "react/jsx-runtime";
import { FormProvider, } from "@form-builder/engine";
import { formMapper, formPropsMapping, } from "./form-component-features.configs";
import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";
import { useCallback, useMemo, useState } from "react";
import { ECMSActions } from "../../contexts/cms.reducer";
import { schema as validationsSchema } from "./form-component-features.validations";
import { schema as formattersSchema } from "./form-component-features.formatters";
import { schema as errorMessagesSchema } from "./form-component-features.error-messages";
import { schema as filterSchema } from "./form-component-features.filter";
import { FeatureEvents } from "./form-component-events";
import * as S from "./form-component-features.styles";
const merge = (t, s) => {
    const o = Object, a = o.assign;
    for (const k of o.keys(s))
        s[k] instanceof o && a(s[k], merge(t[k], s[k]));
    return a(t || {}, s), t;
};
const FormComponentFeatures = ({ feature, events, onEventClick, showEventSelection, }) => {
    const [selectedEvent, setSelectedEvent] = useState();
    const cms = useCms();
    const schema = useSchema();
    const featureSchema = useMemo(() => ({
        validations: validationsSchema,
        formatters: formattersSchema,
        errorMessages: errorMessagesSchema,
        filter: filterSchema,
    }[feature]), [feature]);
    const handleFormData = useCallback((data) => {
        console.log(data.formatted);
        const component = merge(cms.state.selectedComponent, data.formatted);
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
    }, [cms, schema]);
    if (showEventSelection && events) {
        return (_jsx(FeatureEvents, { events: events, onEventClick: (event) => {
                onEventClick(event);
                setSelectedEvent(event);
            } }));
    }
    return (_jsx(FormProvider, Object.assign({ mapper: formMapper, propsMapping: formPropsMapping }, { children: _jsx(S.FormFullWidth, { initialValues: cms.state.selectedComponent, onData: handleFormData, id: feature, schema: featureSchema({
                event: selectedEvent,
                component: cms.state.selectedComponent,
            }) }) })));
};
export { FormComponentFeatures };
//# sourceMappingURL=form-component-features.js.map