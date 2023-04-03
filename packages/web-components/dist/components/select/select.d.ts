/// <reference types="react" />
import { Select } from "@mui/material";
declare const FormSelect: (props: React.ComponentProps<typeof Select> & {
    options: {
        value: string;
        label: string;
        selected?: boolean;
    }[];
}) => JSX.Element;
export { FormSelect };
