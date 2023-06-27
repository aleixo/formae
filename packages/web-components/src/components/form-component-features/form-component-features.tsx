import {
  FormProvider,
  TComponent,
  TSchema,
  useForm,
} from "@form-builder/engine";

import { formMapper, formPropsMapping } from "../../common/mappings/mappings";

import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";
import { useCallback, useState } from "react";
import { ECMSActions } from "../../contexts/cms.reducer";

import { schema as validationsSchema } from "./forms/form-component-features.validations";
import { schema as formattersSchema } from "./forms/form-component-features.formatters";
import { schema as errorMessagesSchema } from "./forms/form-component-features.error-messages";
import { schema as filterSchema } from "./forms/form-component-features.filter";
import { schema as apiSchema } from "./forms/form-component-features.api";
import { schema as masksSchema } from "./forms/form-component-features.masks";
import { schema as basicsSchema } from "./forms/form-component-features.basics";

import { schema as formConfigurationsSchema } from "./forms/form-component-features.configurations";

import { FeatureEvents } from "./form-component-events";
import * as S from "./form-component-features.styles";
import { FormComponentFeatureTemplate } from "../form-template/form-template";
import { Button, Divider, Stack } from "@mui/material";

type EFeatures = keyof TComponent | "basic" | "configurations";

function merge(...objects: {}[]) {
  const isObject = (obj: any) => obj && typeof obj === "object";

  return objects.reduce((prev: any, obj: any) => {
    Object.keys(obj).forEach((key: string) => {
      const pVal = prev[key] as any;
      const oVal = obj[key] as any;

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
  feature = "basic",
  events,
  onEventClick,
  showEventSelection,
  allowTemplate = true,
  title,
}: {
  showEventSelection?: boolean;
  feature?: EFeatures;
  events?: string[];
  onEventClick?(event: string): void;
  allowTemplate?: boolean;
  title?: string;
}) => {
  const cms = useCms();
  const schema = useSchema();

  const updateSchemaConfiguration = (formatted) => {
    cms.dispatch({
      type: ECMSActions.SET_BUILDER_SCHEMA,
      payload: {
        schema: {
          ...formatted,
          ...cms.state.schema,
        },
      },
    });
  };

  const handleComponentUpdate = useCallback(
    (data: { formatted: any }) => {
      if (feature === "configurations") {
        return updateSchemaConfiguration(data.formatted);
      }
      const component = merge(
        cms.state.selectedComponent || {},
        data.formatted || {}
      ) as TComponent;
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
    id: "features",
    onSubmit: handleComponentUpdate,
  });
  const [selectedEvent, setSelectedEvent] = useState();

  if (showEventSelection && events) {
    return (
      <FeatureEvents
        events={events}
        onEventClick={(event) => {
          onEventClick && onEventClick(event);
          setSelectedEvent(event as any);
        }}
      />
    );
  }
  console.log("SCHEMA ", cms.state.schema);
  return (
    <FormProvider mapper={formMapper} propsMapping={formPropsMapping}>
      <Stack spacing={3}>
        {allowTemplate && (
          <>
            <Divider>Templates</Divider>

            <FormComponentFeatureTemplate
              onChangeTemplate={(template) => {
                if (selectedEvent) {
                  handleComponentUpdate({
                    formatted: {
                      [feature as string]: {
                        [selectedEvent]: template.configuration,
                      },
                    },
                  });
                }
              }}
              feature={feature as any}
              template={
                selectedEvent
                  ? ((cms.state.selectedComponent || {})[feature as string] ||
                      {})[selectedEvent]
                  : (cms.state.selectedComponent || {})[feature as string]
              }
            />
          </>
        )}

        <Divider>{title}</Divider>

        <Button fullWidth variant="outlined" onClick={() => submitForm()}>
          Save configurations
        </Button>

        <S.FormFullWidth
          key={formKey}
          initialValues={{
            ...cms.state.selectedComponent,
            formattedDataDefaults: cms.state.schema?.formattedDataDefaults,
          }}
          id={"features"}
          schema={{
            basic: basicsSchema,
            configurations: formConfigurationsSchema,
            validations: validationsSchema,
            formatters: formattersSchema,
            errorMessages: errorMessagesSchema,
            filter: filterSchema,
            api: apiSchema,
            masks: masksSchema,
          }[feature]({
            event: selectedEvent,
            component: cms.state.selectedComponent,
          })}
        />
      </Stack>
    </FormProvider>
  );
};

export { FormComponentFeatures };
