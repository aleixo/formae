/// <reference types="react" />
interface IProps {
    mode: "BUILDING" | "PREVIEW" | string;
}
declare const Builder: ({ mode }: IProps) => JSX.Element;
export { Builder };
