import React from "react";
import { TComponent, TField } from "@form-builder/engine";
interface IProps {
    component?: TComponent & TField;
    propsMapping: any;
}
declare const ComponentConfigurations: React.MemoExoticComponent<({ component }: IProps) => JSX.Element>;
export { ComponentConfigurations };
