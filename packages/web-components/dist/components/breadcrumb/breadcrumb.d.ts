/// <reference types="react" />
declare function BreadCrumb({ paths, onClick, levelOneName, }: {
    levelOneName: string;
    paths: string[];
    onClick(path?: string): void;
}): JSX.Element;
export { BreadCrumb };
