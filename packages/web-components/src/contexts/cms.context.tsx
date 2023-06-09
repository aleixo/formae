import { TComponent } from "@form-builder/engine";
import { TMapper } from "@form-builder/engine/dist/adapters/react";
import { TPropsMapping, TSchema } from "@form-builder/engine/dist/core/types";
import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useApi } from "../hooks/useApi";
import { useSchema } from "../hooks/useSchema";
import {
  cmsInitialState,
  cmsReducer,
  TCMSAction,
  ICMSState,
  ECMSActions,
  useCmsMiddleware,
} from "./cms.reducer";

interface IContext {
  examples: Record<string, unknown>;
  propsMapping: TPropsMapping;
  mappings: TMapper & { isContainer?: boolean };
  props: Record<string, TComponent[]>;
  state: ICMSState;
  dispatch: Dispatch<TCMSAction>;
  onSave(schema?: TSchema): void;
}

interface IProviderProps {
  children: ReactElement;
  mappings: IContext;
  onSave(schema?: TSchema): void;
  initialSchema?: TSchema;
}

export const Context = createContext<IContext>({
  examples: {},
  propsMapping: {},
  mappings: {},
  props: {},
  state: cmsInitialState,
  dispatch: () => {},
  onSave: () => {},
});
Context.displayName = "CMSContext";

const Provider = ({
  children,
  mappings,
  onSave,
  initialSchema,
}: IProviderProps): ReactElement => {
  const api = useApi();
  const schema = useSchema();
  const [state, dispatch] = useReducer(cmsReducer, {
    ...cmsInitialState,
  });

  const { pre } = useCmsMiddleware();

  useEffect(() => {
    dispatch({
      type: ECMSActions.REHYDRATE,
      payload: {
        newState: {
          schema: api.getSchema() || initialSchema || schema.initForm(),
          templates: api.getTemplates() as any,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!Object.keys(state.templates).length) return;

    api.updateTemplates(state.templates);
  }, [JSON.stringify(state.templates)]);

  return (
    <Context.Provider
      value={{
        ...mappings,
        state,
        onSave,
        dispatch: (action) => {
          pre(action);
          dispatch(action);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useCms = (): IContext => {
  const context = useContext(Context);
  return context;
};

export { useCms, Provider };
