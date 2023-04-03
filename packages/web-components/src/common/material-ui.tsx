import { TMapper } from "@form-builder/engine/dist/adapters/react";
import { TextField, Input } from "@mui/material";

const mappings: TMapper = {
  input: { component: Input, label: "Input" },
  textField: { component: TextField, label: "Text Field" },
};

export { mappings };
