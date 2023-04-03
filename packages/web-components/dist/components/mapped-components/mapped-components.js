import { jsx as _jsx } from "react/jsx-runtime";
import { Grid } from "@mui/material";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { ActionAreaCard } from "../action-area-card/action-area-card";
const MappedComponents = () => {
    const cms = useCms();
    const schema = useSchema();
    return (_jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: Object.keys(cms.mappings).map((key, i) => (_jsx(Grid, Object.assign({ item: true, xs: 6 }, { children: _jsx(ActionAreaCard, { title: cms.mappings[key].label, description: cms.mappings[key].description, onClick: () => {
                    cms.dispatch({
                        type: ECMSActions.SET_BUILDER_SCHEMA,
                        payload: {
                            schema: schema.addToFormStep(cms.state.schema, schema.buildComponent({
                                component: key,
                                props: cms.examples[key],
                            })),
                        },
                    });
                } }) }), key))) })));
};
export { MappedComponents };
//# sourceMappingURL=mapped-components.js.map