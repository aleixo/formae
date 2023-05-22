import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Divider, Grid, Stack } from "@mui/material";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { ActionAreaCard } from "../action-area-card/action-area-card";
import { FormComponentFeatureTemplate } from "../form-template/form-template";
import { Form, FormProvider } from "@form-builder/engine";
const MappedComponents = () => {
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
    return (_jsxs(Stack, Object.assign({ spacing: 3 }, { children: [_jsx(Divider, { children: "User mapped components" }), _jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: Object.keys(cms.mappings).map((key, i) => (_jsx(Grid, Object.assign({ item: true, xs: 6 }, { children: _jsx(ActionAreaCard, { preview: () => (_jsx(FormProvider, Object.assign({ propsMapping: cms.propsMapping, mapper: cms.mappings }, { children: _jsx(Form, { schema: schema.addToFormStep(schema.initForm(), schema.buildComponent({
                                    component: key,
                                    props: cms.examples[key],
                                })) }) }))), title: cms.mappings[key].label, description: cms.mappings[key].description, onClick: () => {
                            dispatchNewComponentToSchema(schema.buildComponent({
                                component: key,
                                props: cms.examples[key],
                            }));
                        } }) }), key))) })), _jsx(Divider, { children: "Container Templates" }), _jsx(FormComponentFeatureTemplate, { template: cms.state.selectedComponent, feature: "container", showGrid: true, onChangeTemplate: (template) => { } })] })));
};
export { MappedComponents };
//# sourceMappingURL=mapped-components.js.map