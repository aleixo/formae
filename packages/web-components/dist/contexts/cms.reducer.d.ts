import { TComponent, TSchema } from "@form-builder/engine";
export declare enum ECMSActions {
    SET_OVERED_COMPONENT = "SET_OVERED_COMPONENT",
    SET_BUILDER_SCHEMA = "SET_BUILDER_SCHEMA",
    SET_SELECTED_COMPONENT = "SET_SELECTED_COMPONENT"
}
export interface ICMSState {
    overedComponent?: TComponent & {
        id?: string;
    };
    selectedComponent?: TComponent & {
        id?: string;
    };
    schema?: TSchema;
}
type TActionType = ECMSActions.SET_OVERED_COMPONENT | ECMSActions.SET_SELECTED_COMPONENT | ECMSActions.SET_BUILDER_SCHEMA;
export type TCMSAction = {
    type: TActionType;
    payload: {
        component?: TComponent;
        schema?: TSchema;
    };
};
declare const cmsInitialState: ICMSState;
declare const cmsReducer: (state: ICMSState, action: TCMSAction) => ICMSState;
declare const useCmsMiddleware: () => {
    middleware: (action: TCMSAction) => any;
};
export { cmsInitialState, cmsReducer, useCmsMiddleware };
