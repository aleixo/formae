import {
  FormProvider,
  TComponent,
  TSchema,
  useForm,
} from "@form-builder/engine";

import {
  formMapper,
  formPropsMapping,
} from "./form-component-features.mappings";

import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";
import { useCallback, useMemo, useState } from "react";
import { ECMSActions } from "../../contexts/cms.reducer";

import { schema as validationsSchema } from "./forms/form-component-features.validations";
import { schema as formattersSchema } from "./forms/form-component-features.formatters";
import { schema as errorMessagesSchema } from "./forms/form-component-features.error-messages";
import { schema as filterSchema } from "./forms/form-component-features.filter";
import { schema as apiSchema } from "./forms/form-component-features.api";
import { schema as masksSchema } from "./forms/form-component-features.masks";
import { schema as basicsSchema } from "./forms/form-component-features.basics";

import { FeatureEvents } from "./form-component-events";
import * as S from "./form-component-features.styles";
import { FormComponentFeatureTemplate } from "../form-template/form-template";
import { Box, Button, Divider, Stack } from "@mui/material";
type EFeatures = keyof TComponent;

function merge(...objects) {
  const isObject = (obj) => obj && typeof obj === "object";

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = merge(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

const FormComponentFeatures = ({
  feature,
  events,
  onEventClick,
  showEventSelection,
}: {
  showEventSelection?: boolean;
  feature?: EFeatures;
  events?: string[];
  onEventClick?(event: string): void;
}) => {
  const cms = useCms();
  const schema = useSchema();
  const handleComponentUpdate = useCallback(
    (data) => {
      const component = merge(
        cms.state.selectedComponent || {},
        data.formatted || {}
      );
      cms.dispatch({
        type: ECMSActions.SET_SELECTED_COMPONENT,
        payload: {
          component,
        },
      });
      cms.dispatch({
        type: ECMSActions.SET_BUILDER_SCHEMA,
        payload: {
          schema: schema.edit<TSchema>(cms.state.schema!, component),
        },
      });
      setFormKey(new Date().getTime());
    },

    [cms, schema]
  );

  const [formKey, setFormKey] = useState(new Date().getTime());
  const { submitForm } = useForm({
    formId: "features",
    onSubmit: handleComponentUpdate,
  });
  const [selectedEvent, setSelectedEvent] = useState();

  const featureSchema = useMemo<
    ({
      event,
      component,
    }: {
      event?: string;
      component?: TComponent;
    }) => TSchema
  >(
    () =>
      feature
        ? {
            validations: validationsSchema,
            formatters: formattersSchema,
            errorMessages: errorMessagesSchema,
            filter: filterSchema,
            api: apiSchema,
            masks: masksSchema,
          }[feature]
        : basicsSchema,
    [feature]
  );

  if (showEventSelection && events) {
    return (
      <FeatureEvents
        events={events}
        onEventClick={(event) => {
          onEventClick(event);
          setSelectedEvent(event);
        }}
      />
    );
  }
  return (
    <FormProvider mapper={formMapper} propsMapping={formPropsMapping}>
      <Stack spacing={3}>
        <Divider>Templates</Divider>

        <FormComponentFeatureTemplate
          onChangeTemplate={(template) => {
            if (selectedEvent) {
              handleComponentUpdate({
                formatted: {
                  [feature]: { [selectedEvent]: template.configuration },
                },
              });
            }
          }}
          feature={feature}
          template={
            selectedEvent
              ? ((cms.state.selectedComponent || {})[feature] || {})[
                  selectedEvent
                ]
              : (cms.state.selectedComponent || {})[feature]
          }
        />
        <Divider>Features</Divider>

        <Button fullWidth variant="outlined" onClick={() => submitForm()}>
          Save
        </Button>
        <S.FormFullWidth
          key={formKey}
          initialValues={cms.state.selectedComponent}
          id={"features"}
          schema={featureSchema({
            event: selectedEvent,
            component: cms.state.selectedComponent,
          })}
        />
      </Stack>
    </FormProvider>
  );
};

export { FormComponentFeatures };
