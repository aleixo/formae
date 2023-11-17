import { TComponent, TSchema } from "@form-builder/engine";
import { useApi } from "../hooks/useApi";

export enum ECMSActions {
  SET_OVERED_COMPONENT = "SET_OVERED_COMPONENT",
  SET_BUILDER_SCHEMA = "SET_BUILDER_SCHEMA",
  SET_SELECTED_COMPONENT = "SET_SELECTED_COMPONENT",
  ADD_TEMPLATE = "ADD_TEMPLATE",
  REHYDRATE = "REHYDRATE",
}

export interface ICMSState {
  overedComponent?: TComponent & { id?: string };
  selectedComponent?: TComponent & { id?: string };
  schema?: TSchema;
  templates: Record<string, any[]>;
}

type TActionType =
  | ECMSActions.SET_OVERED_COMPONENT
  | ECMSActions.SET_SELECTED_COMPONENT
  | ECMSActions.SET_BUILDER_SCHEMA
  | ECMSActions.ADD_TEMPLATE
  | ECMSActions.REHYDRATE;

export type TCMSAction = {
  type: TActionType;
  payload: {
    component?: TComponent;
    schema?: TSchema;
    newState?: ICMSState;
    template?: {
      feature: string;
      configuration: any;
      name: string;
    };
  };
};

const cmsInitialState: ICMSState = {
  overedComponent: undefined,
  schema: undefined,
  selectedComponent: undefined,
  templates: {},
};

const cmsReducer = (state: ICMSState, action: TCMSAction): ICMSState => {
  const mapper: Record<TActionType, () => ICMSState> = {
    [ECMSActions.REHYDRATE]: () => ({
      ...state,
      ...action.payload.newState,
    }),
    [ECMSActions.SET_OVERED_COMPONENT]: () => ({
      ...state,
      overedComponent: action.payload.component,
    }),
    [ECMSActions.SET_SELECTED_COMPONENT]: () => ({
      ...state,
      selectedComponent: action.payload.component,
    }),
    [ECMSActions.SET_BUILDER_SCHEMA]: () => ({
      ...state,
      schema: action.payload.schema as TSchema,
    }),
    [ECMSActions.ADD_TEMPLATE]: () => ({
      ...state,
      templates: {
        ...state.templates,
        [action.payload.template?.feature || ""]: [
          ...(state.templates[action.payload.template?.feature || ""] || []),
          {
            name: action.payload.template?.name,
            configuration: action.payload.template?.configuration,
          },
        ],
      },
    }),
  };
  if (!mapper[action.type]) {
    throw new Error("Non available action " + action.type);
  }
  return mapper[action.type]();
};

const useCmsMiddleware = () => {
  const api = useApi();

  const mapper = {
    [ECMSActions.SET_BUILDER_SCHEMA]: (action: TCMSAction) => {
      //api.updateSchema(action.payload.schema!);
    },
  };

  const pre = (action: TCMSAction) =>
    mapper[action.type] && mapper[action.type](action);

  return { pre };
};

export { cmsInitialState, cmsReducer, useCmsMiddleware };
