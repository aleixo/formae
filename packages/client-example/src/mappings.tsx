import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { EBuilderComponentPropsTypes } from "@form-builder/web-components";
import { FormControl, FormGroup, InputLabel, Stack } from "@mui/material";

const mappings = {
  textField: {
    component: TextField,
    label: "Text Field",
    description: "Input bla bla",
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
  stack: {
    component: Stack,
    label: "Stack",
    isContainer: true,
    description: "Stack components",
  },
};

const formBuilderPropsMapping = {
  textField: {
    getValue: "onChange",
    setValue: "value",
    setErrorMessage: "errorMessage",
    onBlur: "onBlur",
    onFocus: "onFocus",
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
