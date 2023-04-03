/// <reference types="react" />
interface IProps {
    onSaveClick(): void;
    onPreviewClick(): void;
    onSettingsClick(): void;
    onListClick(): void;
    onHierarchyClick(): void;
    pages: any;
}
declare const Toolbar: ({ onSaveClick, onPreviewClick, onSettingsClick, onListClick, onHierarchyClick, pages }: IProps) => JSX.Element;
export { Toolbar };
