/// <reference types="react" />
declare function BreadCrumb({ paths, onClick, }: {
    paths: string[];
    onClick(path?: string): void;
}): JSX.Element;
export { BreadCrumb };
