/// <reference types="react" />
interface IProps {
    mode: "BUILDING" | "PREVIEW";
}
declare const Builder: ({ mode }: IProps) => JSX.Element;
export { Builder };
