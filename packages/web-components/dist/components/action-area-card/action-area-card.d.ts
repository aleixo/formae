/// <reference types="react" />
declare function ActionAreaCard({ title, description, onClick, preview, }: {
    title: string;
    description: string;
    onClick(): void;
    preview?: any;
}): JSX.Element;
export { ActionAreaCard };
