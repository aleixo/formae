import Input from "@bit/bolttech.components.ui.input";
import Checkbox from "@bit/bolttech.components.ui.checkbox";
import FormGroup from "@bit/bolttech.components.common.form-group";
import Dropdown from "@bit/bolttech.components.ui.dropdown";
import SwitchGroup from "@bit/bolttech.components.ui.switch-group";

const mappings = {
  input: {
    component: Input,
    label: "Input",
    description: "Input bla bla",
  },
  checkbox: { component: Checkbox, label: "Checkbox" },
  formGroup: { component: FormGroup, label: "Form Group", isContainer: true },
  dropdown: { component: Dropdown, label: "Dropdown" },
  switchGroup: { component: SwitchGroup, label: "Switch group" },
};

const formBuilderPropsMapping = {
  input: {
    getValue: "onChange",
    setValue: "value",
    setErrorMessage: "errorMessage",
    onBlur: "onBlur",
    onFocus: "onFocus",
  },
  checkbox: {
    getValue: "onChange",
    setValue: "checked",
  },
  dropdown: {
    getValue: "onSelect",
    setValue: "value",
  },
  switchGroup: {
    getValue: "onChange",
    setValue: "value",
  },
};

enum EBuilderComponentPropsTypes {
  STRING = "string",
  BOOLEAN = "boolean",
}

const examples = {
  formGroup: {
    title: "Title test",
  },
  checkbox: {
    label: "example label",
  },
  dropdown: {
    label: "Example label",
    placeholder: "example placeholder",
    options: [
      {
        id: "example1",
        label: "example1",
      },
      {
        id: "example2",
        label: "example2",
      },
    ],
    useFilter: true,
  },
  switchGroup: {
    options: [
      {
        value: "example1",
        label: "example1",
        selected: true,
      },
      {
        value: "example2",
        label: "example1",
      },
      {
        value: "example3",
        label: "example1",
      },
    ],
  },
};

const props: Record<string, any[]> = {
  dropdown: [
    {
      name: "label",
      component: EBuilderComponentPropsTypes.STRING,
    },
    {
      name: "placeholder",
      component: EBuilderComponentPropsTypes.STRING,
    },
    {
      name: "useFilter",
      component: EBuilderComponentPropsTypes.BOOLEAN,
    },
  ],
  checkbox: [
    {
      name: "label",
      component: EBuilderComponentPropsTypes.STRING,
    },
  ],
  input: [
    {
      name: "label",
      component: EBuilderComponentPropsTypes.STRING,
      props: {
        label: "Label",
      },
    },
    {
      name: "placeholder",
      component: EBuilderComponentPropsTypes.STRING,
    },
  ],
  formGroup: [
    {
      name: "title",
      component: EBuilderComponentPropsTypes.STRING,
    },
    {
      name: "fullWidth",
      component: EBuilderComponentPropsTypes.BOOLEAN,
    },
    {
      name: "horizontal",
      component: EBuilderComponentPropsTypes.BOOLEAN,
    },
  ],
};

export { mappings, formBuilderPropsMapping, props, examples };
