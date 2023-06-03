/// <reference types="react" />
declare function ActionAreaCard({ title, description, onClick, preview, onDeleteClick, }: {
    title: string;
    description: string;
    onClick(): void;
    onDeleteClick?: () => void;
    preview?: any;
}): JSX.Element;
export { ActionAreaCard };
