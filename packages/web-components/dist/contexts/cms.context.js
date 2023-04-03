import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useReducer, } from "react";
import { useApi } from "../hooks/useApi";
import { useSchema } from "../hooks/useSchema";
import { cmsInitialState, cmsReducer, ECMSActions, useCmsMiddleware, } from "./cms.reducer";
export const Context = createContext({
    examples: {},
    propsMapping: {},
    mappings: {},
    props: {},
    state: cmsInitialState,
    dispatch: () => { },
});
Context.displayName = "CMSContext";
const Provider = ({ children, mappings }) => {
    const api = useApi();
    const schema = useSchema();
    const [state, dispatch] = useReducer(cmsReducer, Object.assign(Object.assign({}, cmsInitialState), { schema: schema.initForm() }));
    const { middleware } = useCmsMiddleware();
    useEffect(() => {
        const schemaFromApi = api.getSchema();
        if (!Object.keys(schemaFromApi).length) {
            return;
        }
        dispatch({
            type: ECMSActions.SET_BUILDER_SCHEMA,
            payload: { schema: schemaFromApi },
        });
    }, [api]);
    return (_jsx(Context.Provider, Object.assign({ value: Object.assign(Object.assign({}, mappings), { state, dispatch: (action) => {
                middleware(action);
                dispatch(action);
            } }) }, { children: children })));
};
const useCms = () => {
    const context = useContext(Context);
    return context;
};
export { useCms, Provider };
//# sourceMappingURL=cms.context.js.map