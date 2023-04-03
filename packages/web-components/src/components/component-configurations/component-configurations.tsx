import React from "react";
import { TComponent, TField } from "@form-builder/engine";

import { FormComponentFeatures } from "../form-component-features/form-component-features";
import { ComponentPropsForm } from "../component-props-form/component-props-form";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import { FormTextField } from "../textfield/textfield";
import { Accordion } from "../accordion/accordion";
import { FormCheckbox } from "../checkbox/checkbox";

interface IProps {
  component?: TComponent & TField;
  propsMapping: any;
}

const RawComponentConfigurations = ({ component }: IProps) => {
  if (!component) return <></>;

  return (
    <>
      <Accordion title="Templates" description="All the configured templates">
        <Accordion
          disabled={!component.children}
          title="Configured templates"
          description="Templates that can contain several fields and their configurations"
        >
          <Stack>
            <FormCheckbox
              name="isReference"
              formId="new_template"
              label="Is Reference"
            />
            <FormTextField
              name="templateName"
              variant="outlined"
              formId="new_template"
              placeholder="name"
            />
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              Create
            </Button>
          </Stack>
        </Accordion>
      </Accordion>
      <ComponentPropsForm />
      <FormComponentFeatures feature="validations" />
    </>
  );
};
const ComponentConfigurations = React.memo(
  RawComponentConfigurations,
  (prev, next) => {
    if (prev.component?.name === next.component?.name) return true;
    return false;
  }
);
export { ComponentConfigurations };
