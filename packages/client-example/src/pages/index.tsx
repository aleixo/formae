import { BuilderPage, Provider } from "@form-builder/web-components";
import {
  examples,
  formBuilderPropsMapping as propsMapping,
  mappings,
  props,
} from "../mappings";

export default function Home() {
  return (
    <Provider
      onSave={() => {}}
      mappings={
        {
          examples,
          mappings,
          props,
          propsMapping,
        } as any
      }
    >
      {<div id="t"></div>}
      <BuilderPage />
    </Provider>
  );
}
