import { useEffect } from "react";
import { useCms } from "../contexts/cms.context";
import { ECMSActions } from "../contexts/cms.reducer";
import { useSchema } from "./useSchema";

const useKeyboardSensor = () => {
  const cms = useCms();
  const { moveUp, moveDown, remove, getTopSchemaComponent } = useSchema();

  useEffect(() => {
    const keyPressHandler = (e) => {
      if (e.key === "ArrowUp" && cms.state.selectedComponent) {
        cms.dispatch({
          type: ECMSActions.SET_BUILDER_SCHEMA,
          payload: {
            schema: moveUp(cms.state.schema, cms.state.selectedComponent),
          },
        });
        e.preventDefault();
      }
      if (e.key === "ArrowDown" && cms.state.selectedComponent) {
        cms.dispatch({
          type: ECMSActions.SET_BUILDER_SCHEMA,
          payload: {
            schema: moveDown(cms.state.schema, cms.state.selectedComponent),
          },
        });
        e.preventDefault();
      }

      if (e.key === "Backspace" && cms.state.selectedComponent) {
        cms.dispatch({
          type: ECMSActions.SET_BUILDER_SCHEMA,
          payload: {
            schema: remove(cms.state.schema, 0, cms.state.selectedComponent),
          },
        });
        cms.dispatch({
          type: ECMSActions.SET_SELECTED_COMPONENT,
          payload: {
            component: getTopSchemaComponent(cms.state.schema),
          },
        });
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", keyPressHandler);

    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [cms, getTopSchemaComponent, moveDown, moveUp, remove]);
};

export { useKeyboardSensor };
