import { EBuilderComponentPropsTypes } from "../types/engine";

import { Select } from "../../components/select/select";
import { Checkbox } from "../../components/checkbox/checkbox";
import { FormGroup } from "../../components/formGroup/formGroup";
import { Table } from "../../components/table/table";
import { TextField } from "../../components/textfield/textfield";
import { Button } from "@mui/material";

const formMapper = {
  [EBuilderComponentPropsTypes.GROUP]: {
    component: FormGroup,
  },
  [EBuilderComponentPropsTypes.STRING]: {
    component: TextField,
  },
  [EBuilderComponentPropsTypes.SELECT]: {
    component: Select,
  },
  [EBuilderComponentPropsTypes.BOOLEAN]: {
    component: Checkbox,
  },
  [EBuilderComponentPropsTypes.TABLE]: {
    component: Table,
  },
};

const formPropsMapping = {
  [EBuilderComponentPropsTypes.STRING]: {
    getValue: "onChange",
    setValue: "value",
  },
  [EBuilderComponentPropsTypes.BOOLEAN]: {
    getValue: "onChange",
    setValue: "checked",
  },
  [EBuilderComponentPropsTypes.TABLE]: {
    setValue: "value",
    getValue: "onChange",
  },
  [EBuilderComponentPropsTypes.SELECT]: {
    setValue: "value",
    getValue: "onChange",
  },
};

export { formMapper, formPropsMapping };
