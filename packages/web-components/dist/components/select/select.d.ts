/// <reference types="react" />
import { Select as MUISelect } from "@mui/material";
declare const Select: (props: React.ComponentProps<typeof MUISelect> & {
    options: {
        value: string;
        label: string;
        selected?: boolean;
    }[];
}) => JSX.Element;
export { Select };
