import { TComponent } from "@form-builder/engine";
import { TMapper } from "@form-builder/engine/dist/adapters/react";
import { TPropsMapping } from "@form-builder/engine/dist/core/types";
import { Dispatch, ReactElement } from "react";
import { TCMSAction, ICMSState } from "./cms.reducer";
interface IContext {
    examples: Record<string, unknown>;
    propsMapping: TPropsMapping;
    mappings: TMapper & {
        isContainer?: boolean;
    };
    props: Record<string, TComponent[]>;
    state: ICMSState;
    dispatch: Dispatch<TCMSAction>;
}
interface IProviderProps {
    children: ReactElement;
    mappings: IContext;
}
export declare const Context: import("react").Context<IContext>;
declare const Provider: ({ children, mappings }: IProviderProps) => ReactElement;
declare const useCms: () => IContext;
export { useCms, Provider };
