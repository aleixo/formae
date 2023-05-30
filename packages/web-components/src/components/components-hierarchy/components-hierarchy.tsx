import { ReactElement } from "react";
import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";

import * as S from "./components-hierarchy.styles";
import { PreviewContainer } from "../form-field-wrapper/form-field-wrapper";

const ComponentsHierarchy = () => {
  const schema = useSchema();
  const cms = useCms();
  const render = () => {
    const components: ReactElement[] = [];
    schema.transverseSchema(
      cms.state.schema,
      0,
      (component, index, currDepth) => {
        components.push(
          <PreviewContainer component={component[index]}>
            <S.Item
              padding={currDepth.toString()}
              selected={
                (cms.state.selectedComponent?.component as any)?.id ===
                component[index].id
              }
              overed={cms.state.overedComponent?.id === component[index].id}
            >
              <p>
                - {component[index].component}/{component[index].name}
              </p>
            </S.Item>
          </PreviewContainer>
        );
      }
    );
    return components;
  };
  return render().map((comp, i) => (
    <div key={i}>{comp}</div>
  )) as unknown as JSX.Element;
};

export { ComponentsHierarchy };
