/// <reference types="react" />
import { TComponent } from "@form-builder/engine";
interface IProps {
    children: any;
    onDragStart(): void;
    onDrop(): void;
    component: TComponent & {
        id?: string;
    };
}
declare const PreviewContainer: ({ children, onDragStart, onDrop, component, }: IProps) => JSX.Element;
export { PreviewContainer };
