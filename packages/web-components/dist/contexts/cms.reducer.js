import { useApi } from "../hooks/useApi";
export var ECMSActions;
(function (ECMSActions) {
    ECMSActions["SET_OVERED_COMPONENT"] = "SET_OVERED_COMPONENT";
    ECMSActions["SET_BUILDER_SCHEMA"] = "SET_BUILDER_SCHEMA";
    ECMSActions["SET_SELECTED_COMPONENT"] = "SET_SELECTED_COMPONENT";
})(ECMSActions || (ECMSActions = {}));
const cmsInitialState = {
    overedComponent: undefined,
    schema: undefined,
    selectedComponent: undefined,
};
const cmsReducer = (state, action) => {
    const mapper = {
        [ECMSActions.SET_OVERED_COMPONENT]: () => (Object.assign(Object.assign({}, state), { overedComponent: action.payload.component })),
        [ECMSActions.SET_SELECTED_COMPONENT]: () => (Object.assign(Object.assign({}, state), { selectedComponent: action.payload.component })),
        [ECMSActions.SET_BUILDER_SCHEMA]: () => (Object.assign(Object.assign({}, state), { schema: action.payload.schema })),
    };
    if (!mapper[action.type]) {
        throw new Error("Non available action " + action.type);
    }
    return mapper[action.type]();
};
const useCmsMiddleware = () => {
    const api = useApi();
    const mapper = {
        [ECMSActions.SET_BUILDER_SCHEMA]: (action) => {
            api.updateSchema(action.payload.schema);
        },
    };
    const middleware = (action) => mapper[action.type] && mapper[action.type](action);
    return { middleware };
};
export { cmsInitialState, cmsReducer, useCmsMiddleware };
//# sourceMappingURL=cms.reducer.js.map