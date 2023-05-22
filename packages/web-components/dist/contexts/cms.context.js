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
    onSave: () => { },
});
Context.displayName = "CMSContext";
const Provider = ({ children, mappings, onSave, initialSchema, }) => {
    const api = useApi();
    const schema = useSchema();
    const [state, dispatch] = useReducer(cmsReducer, Object.assign({}, cmsInitialState));
    const { pre } = useCmsMiddleware();
    useEffect(() => {
        dispatch({
            type: ECMSActions.REHYDRATE,
            payload: {
                newState: {
                    schema: api.getSchema() || initialSchema || schema.initForm(),
                    templates: api.getTemplates(),
                },
            },
        });
    }, []);
    useEffect(() => {
        if (!Object.keys(state.templates).length)
            return;
        api.updateTemplates(state.templates);
    }, [JSON.stringify(state.templates)]);
    return (_jsx(Context.Provider, Object.assign({ value: Object.assign(Object.assign({}, mappings), { state,
            onSave, dispatch: (action) => {
                pre(action);
                dispatch(action);
            } }) }, { children: children })));
};
const useCms = () => {
    const context = useContext(Context);
    return context;
};
export { useCms, Provider };
//# sourceMappingURL=cms.context.js.map