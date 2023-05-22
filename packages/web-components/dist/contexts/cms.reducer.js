import { useApi } from "../hooks/useApi";
export var ECMSActions;
(function (ECMSActions) {
    ECMSActions["SET_OVERED_COMPONENT"] = "SET_OVERED_COMPONENT";
    ECMSActions["SET_BUILDER_SCHEMA"] = "SET_BUILDER_SCHEMA";
    ECMSActions["SET_SELECTED_COMPONENT"] = "SET_SELECTED_COMPONENT";
    ECMSActions["ADD_TEMPLATE"] = "ADD_TEMPLATE";
    ECMSActions["REHYDRATE"] = "REHYDRATE";
})(ECMSActions || (ECMSActions = {}));
const cmsInitialState = {
    overedComponent: undefined,
    schema: undefined,
    selectedComponent: undefined,
    templates: {},
};
const cmsReducer = (state, action) => {
    const mapper = {
        [ECMSActions.REHYDRATE]: () => (Object.assign(Object.assign({}, state), action.payload.newState)),
        [ECMSActions.SET_OVERED_COMPONENT]: () => (Object.assign(Object.assign({}, state), { overedComponent: action.payload.component })),
        [ECMSActions.SET_SELECTED_COMPONENT]: () => (Object.assign(Object.assign({}, state), { selectedComponent: action.payload.component })),
        [ECMSActions.SET_BUILDER_SCHEMA]: () => (Object.assign(Object.assign({}, state), { schema: action.payload.schema })),
        [ECMSActions.ADD_TEMPLATE]: () => {
            var _a, _b, _c, _d;
            return (Object.assign(Object.assign({}, state), { templates: Object.assign(Object.assign({}, state.templates), { [((_a = action.payload.template) === null || _a === void 0 ? void 0 : _a.feature) || ""]: [
                        ...(state.templates[((_b = action.payload.template) === null || _b === void 0 ? void 0 : _b.feature) || ""] || []),
                        {
                            name: (_c = action.payload.template) === null || _c === void 0 ? void 0 : _c.name,
                            configuration: (_d = action.payload.template) === null || _d === void 0 ? void 0 : _d.configuration,
                        },
                    ] }) }));
        },
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
    const pre = (action) => mapper[action.type] && mapper[action.type](action);
    return { pre };
};
export { cmsInitialState, cmsReducer, useCmsMiddleware };
//# sourceMappingURL=cms.reducer.js.map