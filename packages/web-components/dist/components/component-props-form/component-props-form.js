import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, FormProvider, useForm } from "@form-builder/engine";
import { useEffect, useState } from "react";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { formMapper, formPropsMapping } from "../../common/mappings/mappings";
import { EBuilderComponentPropsTypes } from "../../common/types/engine";
import { ScopeModal } from "../scope-modal/scope-modal";
const ComponentPropsForm = () => {
    var _a, _b, _c;
    const cms = useCms();
    const schema = useSchema();
    const [formKey, setFormKey] = useState(new Date().getTime());
    const { formData } = useForm({ id: "builder_form" });
    useEffect(() => {
        setFormKey(new Date().getTime());
    }, [(_a = cms.state.selectedComponent) === null || _a === void 0 ? void 0 : _a.name]);
    if (!cms.state.selectedComponent)
        return _jsx(_Fragment, {});
    return (_jsxs(FormProvider, Object.assign({ mapper: formMapper, propsMapping: formPropsMapping }, { children: [_jsx(ScopeModal, { scope: formData().form.scope }), _jsx(Form, { onData: (data) => {
                    cms.dispatch({
                        type: ECMSActions.SET_BUILDER_SCHEMA,
                        payload: {
                            schema: schema.edit(cms.state.schema, Object.assign(Object.assign({}, cms.state.selectedComponent), data.formatted)),
                        },
                    });
                }, initialValues: cms.state.selectedComponent, id: [(_b = cms.state.selectedComponent) === null || _b === void 0 ? void 0 : _b.component] + ".props", schema: {
                    components: [
                        {
                            component: EBuilderComponentPropsTypes.GROUP,
                            name: "",
                            children: [
                                {
                                    component: EBuilderComponentPropsTypes.GROUP,
                                    name: "",
                                    children: cms.props[(_c = cms.state.selectedComponent) === null || _c === void 0 ? void 0 : _c.component].map((comp) => (Object.assign(Object.assign({}, comp), { name: "props." + comp.name, props: Object.assign(Object.assign({}, comp.props), { label: comp.name.charAt(0).toUpperCase() + comp.name.slice(1) }) }))),
                                },
                            ],
                        },
                    ],
                } }, formKey)] })));
};
export { ComponentPropsForm };
//# sourceMappingURL=component-props-form.js.map