import { TComponent, TSchema } from "@form-builder/engine";
import {
  ArrowDownward,
  ArrowUpward,
  ControlPoint,
  Delete,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";

interface IProps {
  children: any;
  onDragStart(): void;
  onDrop(): void;
  component: TComponent & { id?: string };
}

const PreviewContainer = ({
  children,
  onDragStart,
  onDrop,
  component,
}: IProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const cms = useCms();
  const schema = useSchema();

  const isOvering =
    cms.state.overedComponent && cms.state.overedComponent.id === component.id;
  const color = isOvering ? "green" : "red";
  const isSelected =
    cms.state.selectedComponent &&
    cms.state.selectedComponent.id === component.id;

  return (
    <div
      draggable
      style={{
        position: "relative",
        opacity: isSelected || isDraggingOver ? 0.9 : 1,
        outlineStyle: "dashed",
        outlineWidth: isSelected || isOvering || isDraggingOver ? "1px" : 0,
        outlineColor: color,
        minHeight: "20px",
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onMouseMove={(e) => {
        e.stopPropagation();
        e.preventDefault();
        cms.dispatch({
          type: ECMSActions.SET_OVERED_COMPONENT,
          payload: { component },
        });
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDraggingOver(true);
        cms.dispatch({
          type: ECMSActions.SET_OVERED_COMPONENT,
          payload: { component },
        });
      }}
      onDragStart={(event) => {
        event.stopPropagation();
        onDragStart && onDragStart();
      }}
      onDrop={(event) => {
        event.stopPropagation();
        onDrop && onDrop();
      }}
      onClick={(e) => {
        e.stopPropagation();
        cms.dispatch({
          type: ECMSActions.SET_SELECTED_COMPONENT,
          payload: { component },
        });
      }}
      onMouseOver={() => {
        cms.dispatch({
          type: ECMSActions.SET_OVERED_COMPONENT,
          payload: { component },
        });
      }}
      onMouseLeave={() => {
        cms.dispatch({
          type: ECMSActions.SET_OVERED_COMPONENT,
          payload: { component: undefined },
        });
      }}
    >
      {(isSelected || isOvering) && (
        <div>
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              zIndex: 20,
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              textAlign: "center",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                padding: "6px",
                backgroundColor: color,
              }}
            >
              {component.component}
            </p>
            <Box sx={{ backgroundColor: color }}>
              <IconButton
                onClick={(e) => {
                  console.log("DELETE");
                  e.stopPropagation();
                  e.preventDefault();
                  cms.dispatch({
                    type: ECMSActions.SET_BUILDER_SCHEMA,
                    payload: {
                      schema: schema.remove<TSchema>(
                        cms.state.schema!,
                        0,
                        component as any
                      ),
                    },
                  });
                }}
              >
                <Delete />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  cms.dispatch({
                    type: ECMSActions.SET_BUILDER_SCHEMA,
                    payload: {
                      schema: schema.moveUp<TSchema>(
                        cms.state.schema!,
                        component as any
                      ),
                    },
                  });
                }}
              >
                <ArrowUpward />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  cms.dispatch({
                    type: ECMSActions.SET_BUILDER_SCHEMA,
                    payload: {
                      schema: schema.moveDown<TSchema>(
                        cms.state.schema!,
                        component as any
                      ),
                    },
                  });
                }}
              >
                <ArrowDownward />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  cms.dispatch({
                    type: ECMSActions.SET_BUILDER_SCHEMA,
                    payload: {
                      schema: schema.addToFormStep(
                        cms.state.schema!,
                        schema.cloneComponent(component as TComponent)
                      ),
                    },
                  });
                }}
              >
                <ControlPoint />
              </IconButton>
            </Box>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export { PreviewContainer };
