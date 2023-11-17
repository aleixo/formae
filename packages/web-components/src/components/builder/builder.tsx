import { useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  FormProvider,
  TComponent,
  TField,
  TFormRefActions,
  TSchema,
} from "@form-builder/engine";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
import { PreviewContainer } from "../form-field-wrapper/form-field-wrapper";
import { Container } from "@mui/material";

interface IProps {
  mode: "BUILDING" | "PREVIEW" | string;
}

const Builder = ({ mode }: IProps) => {
  const [formKey, setFormKey] = useState(new Date().getTime());

  const cms = useCms();
  const schema = useSchema();
  const formRef = useRef<TFormRefActions>(null);
  let draggingElementRef = useRef<TComponent & TField>(null);

  useEffect(() => {
    setFormKey(new Date().getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cms.state.schema)]);

  const resetOveredAndSelected = () => {
    cms.dispatch({
      type: ECMSActions.SET_OVERED_COMPONENT,
      payload: { component: undefined },
    });
    cms.dispatch({
      type: ECMSActions.SET_SELECTED_COMPONENT,
      payload: { component: undefined },
    });
  };

  const handleFieldFocus = useCallback(
    (_: any, component: any) => {
      if (mode === "PREVIEW") return;

      cms.dispatch({
        type: ECMSActions.SET_OVERED_COMPONENT,
        payload: { component },
      });
    },
    [cms, mode]
  );

  const renderFieldWrapper = useCallback(
    (component: TComponent, children: any) => {
      if (mode === "PREVIEW") return <>{children}</>;

      return (
        <PreviewContainer
          onDragStart={() => {
            (draggingElementRef as any).current = {
              ...draggingElementRef.current,
              ...component,
            };
          }}
          onDrop={() => {
            cms.dispatch({
              type: ECMSActions.SET_BUILDER_SCHEMA,
              payload: {
                schema: schema.moveTo<TSchema>(
                  cms.state.schema!,
                  draggingElementRef.current as any,
                  component as any
                ),
              },
            });
            cms.dispatch({
              type: ECMSActions.SET_OVERED_COMPONENT,
              payload: { component: undefined },
            });
          }}
          component={component as TComponent}
        >
          {children}
        </PreviewContainer>
      );
    },
    [cms, mode, schema]
  );

  return (
    <FormProvider mapper={cms.mappings} propsMapping={cms.propsMapping}>
      <Container
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          padding: "2rem",
        }}
        onClick={resetOveredAndSelected}
      >
        {cms.state.schema && (
          <Form
            id="builder_form"
            ref={formRef}
            key={formKey + mode}
            schema={cms.state.schema}
            onFocus={handleFieldFocus}
            renderFieldWrapper={renderFieldWrapper}
          />
        )}
      </Container>
    </FormProvider>
  );
};

export { Builder };
