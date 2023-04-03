import { ReactElement } from "react";
type TComponentItem = {
    label: string;
};
interface Props {
    components: Record<string, TComponentItem>;
    onComponentClick(component: string): void;
}
declare const TemplateComponents: ({ components, onComponentClick, }: Props) => ReactElement;
export { TemplateComponents };
