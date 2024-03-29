import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { Form, FormProvider, } from "@form-builder/engine";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { PreviewContainer } from "../form-field-wrapper/form-field-wrapper";
const Builder = ({ mode }) => {
    const [formKey, setFormKey] = useState(new Date().getTime());
    const cms = useCms();
    const schema = useSchema();
    useEffect(() => {
        setFormKey(new Date().getTime());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(cms.state.schema)]);
    const formRef = useRef(null);
    let draggingElementRef = useRef(null);
    const resetOveredAndSelected = () => {
        cms.dispatch({
            type: ECMSActions.SET_OVERED_COMPONENT,
            payload: { component: undefined },
        });
        cms.dispatch({
            type: ECMSActions.SET_SELECTED_COMPONENT,
            payload: { component: undefined },
        });
    };
    const handleFieldFocus = useCallback((_, component) => {
        if (mode === "PREVIEW")
            return;
        cms.dispatch({
            type: ECMSActions.SET_OVERED_COMPONENT,
            payload: { component },
        });
    }, [cms, mode]);
    const renderFieldWrapper = useCallback((component, children) => {
        if (mode === "PREVIEW")
            return _jsx(_Fragment, { children: children });
        return (_jsx(PreviewContainer, Object.assign({ onDragStart: () => {
                draggingElementRef.current = Object.assign(Object.assign({}, draggingElementRef.current), component);
            }, onDrop: () => {
                cms.dispatch({
                    type: ECMSActions.SET_BUILDER_SCHEMA,
                    payload: {
                        schema: schema.moveTo(cms.state.schema, draggingElementRef.current, component),
                    },
                });
                cms.dispatch({
                    type: ECMSActions.SET_OVERED_COMPONENT,
                    payload: { component: undefined },
                });
            }, component: component }, { children: children })));
    }, [cms, mode, schema]);
    return (_jsx(FormProvider, Object.assign({ mapper: cms.mappings, propsMapping: cms.propsMapping }, { children: _jsx("div", Object.assign({ onClick: resetOveredAndSelected }, { children: cms.state.schema && (_jsx(Form, { id: "builder_form", ref: formRef, schema: cms.state.schema, onFocus: handleFieldFocus, renderFieldWrapper: renderFieldWrapper }, formKey + mode)) })) })));
};
export { Builder };
//# sourceMappingURL=builder.js.map