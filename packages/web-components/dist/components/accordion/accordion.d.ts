/// <reference types="react" />
import { TComponent } from "@form-builder/engine";
export interface TPros {
    onChange?(component: TComponent): void;
    title: string;
    description?: string;
    tooltipText?: string;
    children: React.ReactNode;
    id?: string;
    disabled?: boolean;
}
export declare const Accordion: ({ title, description, tooltipText, children, id, disabled, }: TPros) => JSX.Element;
