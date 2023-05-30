import { EBuilderComponentPropsTypes } from "../../types/engine";
import { Checkbox } from "../checkbox/checkbox";
import { FormGroup } from "../formGroup/formGroup";
import { TextField } from "../textfield/textfield";
import { Select } from "../select/select";

const mapper = {
  [EBuilderComponentPropsTypes.STRING]: {
    component: TextField,
  },
  [EBuilderComponentPropsTypes.BOOLEAN]: {
    component: Checkbox,
  },
  [EBuilderComponentPropsTypes.OBJECT]: {
    component: FormGroup,
  },
  [EBuilderComponentPropsTypes.SELECT]: {
    component: Select,
  },
};

const propsMapping = {
  [EBuilderComponentPropsTypes.STRING]: {
    getValue: "onChange",
    setValue: "value",
  },
  [EBuilderComponentPropsTypes.BOOLEAN]: {
    getValue: "onChange",
    setValue: "checked",
  },
  [EBuilderComponentPropsTypes.SELECT]: {
    getValue: "onChange",
    setValue: "value",
  },
};

export { mapper, propsMapping };
