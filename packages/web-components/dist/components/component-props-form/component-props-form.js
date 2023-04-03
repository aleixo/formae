import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Form, FormProvider } from "@form-builder/engine";
import { useEffect, useState } from "react";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { EBuilderComponentPropsTypes } from "../../types/engine";
import { Checkbox } from "../checkbox/checkbox";
import { FormGroup } from "../formGroup/formGroup";
import { TextField } from "../textfield/textfield";
const ComponentPropsForm = () => {
    var _a, _b, _c;
    const cms = useCms();
    const schema = useSchema();
    const [formKey, setFormKey] = useState(new Date().getTime());
    useEffect(() => {
        setFormKey(new Date().getTime());
    }, [(_a = cms.state.selectedComponent) === null || _a === void 0 ? void 0 : _a.name]);
    if (!cms.state.selectedComponent)
        return _jsx(_Fragment, {});
    return (_jsx(FormProvider, Object.assign({ mapper: {
            [EBuilderComponentPropsTypes.STRING]: {
                component: TextField,
            },
            [EBuilderComponentPropsTypes.BOOLEAN]: {
                component: Checkbox,
            },
            formGroup: {
                component: FormGroup,
            },
        }, propsMapping: {
            [EBuilderComponentPropsTypes.STRING]: {
                getValue: "onChange",
                setValue: "value",
            },
            [EBuilderComponentPropsTypes.BOOLEAN]: {
                getValue: "onChange",
                setValue: "checked",
            },
        } }, { children: _jsx(Form, { onData: (data) => {
                cms.dispatch({
                    type: ECMSActions.SET_BUILDER_SCHEMA,
                    payload: {
                        schema: schema.edit(cms.state.schema, Object.assign(Object.assign({}, cms.state.selectedComponent), data.formatted)),
                    },
                });
            }, initialValues: cms.state.selectedComponent, id: [(_b = cms.state.selectedComponent) === null || _b === void 0 ? void 0 : _b.component] + ".props", schema: {
                components: [
                    {
                        component: "formGroup",
                        name: "",
                        children: [
                            {
                                component: "formGroup",
                                name: "",
                                children: cms.props[(_c = cms.state.selectedComponent) === null || _c === void 0 ? void 0 : _c.component].map((comp) => (Object.assign(Object.assign({}, comp), { name: "props." + comp.name, props: {
                                        label: comp.name.charAt(0).toUpperCase() + comp.name.slice(1),
                                    } }))),
                            },
                        ],
                    },
                ],
            } }, formKey) })));
};
export { ComponentPropsForm };
//# sourceMappingURL=component-props-form.js.map