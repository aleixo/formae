import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { EBuilderComponentPropsTypes } from "@form-builder/web-components";
import {
  Checkbox,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
} from "@mui/material";

const mappings = {
  rating: {
    component: Rating,
    label: "Rating",
  },
  textField: {
    component: TextField,
    label: "Text Field",
    description: "Input bla bla",
  },
  checkbox: {
    component: Checkbox,
    label: "Checkbox",
  },
  autocomplete: {
    component: (props: any) => (
      <Autocomplete
        disablePortal
        {...props}
        renderInput={(params) => <TextField {...params} {...props} />}
      />
    ),
    label: "Autocomplete",
  },
  inputLabel: {
    component: InputLabel,
    label: "Input Label",
  },
  fromGroup: {
    component: FormGroup,
    isContainer: true,
    label: "Form Group",
  },
  formControl: {
    component: FormControl,
    isContainer: true,
    label: "Form control",
  },
  select: {
    component: Select,
    label: "Select",
    isContainer: false,
  },
  menuItem: {
    component: MenuItem,
    label: "Menu Item",
  },
  stack: {
    component: Stack,
    label: "Stack",
    isContainer: true,
    description: "Stack components",
  },
};

const formBuilderPropsMapping = {
  select: {
    getValue: "onChange",
    setValue: "value",
    setErrorState: "error",
  },
  rating: {
    getValue: "onChange",
    setValue: "value",
    setErrorState: "error",
  },
  checkbox: {
    getValue: "onChange",
    setValue: "value",
    setErrorState: "error",
  },
  textField: {
    getValue: "onChange",
    setValue: "value",
    setErrorMessage: "helperText",
    onBlur: "onBlur",
    onFocus: "onFocus",
    setErrorState: "error",
  },
  autocomplete: {
    getValue: "onChange",
    setValue: "value",
    setErrorMessage: "errorMessage",
    onBlur: "onBlur",
    onFocus: "onFocus",
  },
};

const examples = {
  textField: {
    label: "Example",
    variant: "filled",
  },
  stack: {
    direction: "row",
  },
};

const props: Record<string, any[]> = {
  select: [
    {
      name: "label",
      component: EBuilderComponentPropsTypes.STRING,
    },
    {
      name: "labelId",
      component: EBuilderComponentPropsTypes.STRING,
    },
  ],
  menuItem: [
    {
      name: "value",
      component: EBuilderComponentPropsTypes.STRING,
    },
    {
      name: "children",
      component: EBuilderComponentPropsTypes.STRING,
    },
  ],
  rating: [
    {
      name: "defaultValue",
      component: EBuilderComponentPropsTypes.STRING,
    },
    {
      name: "disabled",
      component: EBuilderComponentPropsTypes.BOOLEAN,
    },
    {
      name: "highlightSelectedOnly",
      component: EBuilderComponentPropsTypes.BOOLEAN,
    },
    {
      name: "max",
      component: EBuilderComponentPropsTypes.STRING,
    },
  ],
  checkbox: [
    {
      name: "color",
      component: EBuilderComponentPropsTypes.SELECT,
      props: {
        label: "Color",
        options: [
          {
            label: "Default",
            value: "default",
          },
          {
            label: "Primary",
            value: "primary",
          },
          {
            label: "Secondary",
            value: "secondary",
          },
          {
            label: "Error",
            value: "error",
          },
          {
            label: "Info",
            value: "info",
          },
          {
            label: "Success",
            value: "success",
          },
          {
            label: "Warning",
            value: "warning",
          },
        ],
      },
    },
    {
      name: "defaultChecked",
      component: EBuilderComponentPropsTypes.BOOLEAN,
      props: {
        label: "Default checked",
      },
    },
    {
      name: "disabled",
      component: EBuilderComponentPropsTypes.BOOLEAN,
      props: {
        label: "Disabled",
      },
    },
    {
      name: "disableRipple",
      component: EBuilderComponentPropsTypes.BOOLEAN,
      props: {
        label: "Disable Ripple",
      },
    },
    {
      name: "id",
      component: EBuilderComponentPropsTypes.STRING,
      props: {
        label: "Id",
      },
    },
    {
      name: "size",
      component: EBuilderComponentPropsTypes.SELECT,
      props: {
        label: "Disabled",
        options: [
          {
            label: "Medium",
            value: "medium",
          },
          {
            label: "Small",
            value: "small",
          },
        ],
      },
    },
  ],
  textField: [
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
      props: {
        label: "Placeholder",
      },
    },
    {
      name: "id",
      component: EBuilderComponentPropsTypes.STRING,
      props: {
        label: "Id  ",
      },
    },
    {
      name: "hiddenLabel",
      component: EBuilderComponentPropsTypes.STRING,
      props: {
        label: "Hidden Label",
      },
    },
    {
      name: "defaultValue",
      component: EBuilderComponentPropsTypes.STRING,
      props: {
        label: "Default value",
      },
    },
    {
      name: "fullWidth",
      component: EBuilderComponentPropsTypes.BOOLEAN,
      props: {
        label: "Full Width",
      },
    },
    {
      name: "variant",
      component: EBuilderComponentPropsTypes.SELECT,
      props: {
        label: "Variant",
        options: [
          {
            value: "filled",
            label: "Filled",
            selected: true,
          },
          {
            value: "outlined",
            label: "Outlined",
          },
          {
            value: "standard",
            label: "Standard",
          },
        ],
      },
    },
  ],
  autocomplete: [
    {
      name: "label",
      component: EBuilderComponentPropsTypes.STRING,
      props: {
        label: "Label",
      },
    },
    {
      name: "disabled",
      component: EBuilderComponentPropsTypes.BOOLEAN,
      props: {
        label: "Disabled",
      },
    },
    {
      name: "clearText",
      component: EBuilderComponentPropsTypes.STRING,
      props: {
        label: "Clear text",
      },
    },
    {
      name: "fullWidth",
      component: EBuilderComponentPropsTypes.BOOLEAN,
      props: {
        label: "Full Width",
      },
    },
    {
      name: "multiple",
      component: EBuilderComponentPropsTypes.BOOLEAN,
      props: {
        label: "Multiple",
      },
    },
  ],
  stack: [
    {
      name: "spacing",
      component: EBuilderComponentPropsTypes.STRING,
      props: {
        type: "number",
      },
    },
    {
      name: "direction",
      component: EBuilderComponentPropsTypes.SELECT,
      props: {
        label: "Direction",
        options: [
          {
            label: "Row",
            value: "row",
            selected: true,
          },
          {
            label: "Row Reverse",
            value: "row-reverse",
          },
          {
            label: "Column",
            value: "column",
          },
          {
            label: "Column Reverse",
            value: "column-reverse",
          },
        ],
      },
    },
  ],
};

export { mappings, formBuilderPropsMapping, props, examples };
