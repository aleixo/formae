import { BuilderPage, Provider } from "@form-builder/web-components";
import {
  examples,
  formBuilderPropsMapping as propsMapping,
  mappings,
  props,
} from "../mappings";

import {
  bolttechTheme,
  BolttechThemeProvider,
} from "@edirect/frontend-foundations";

export default function Home() {
  return (
    <Provider
      onSave={() => {
        console.log("save it");
      }}
      mappings={
        {
          examples,
          mappings,
          props,
          propsMapping,
        } as any
      }
    >
      <BolttechThemeProvider
        theme={
          {
            ...bolttechTheme,
            colors: {
              ...bolttechTheme.colors,
              text: {},
            },
          } as any
        }
      >
        <BuilderPage />
      </BolttechThemeProvider>
    </Provider>
  );
}
