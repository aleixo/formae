import { Builder, Provider } from "@form-builder/web-components";
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
        <Builder mode="PREVIEW" />
      </BolttechThemeProvider>
    </Provider>
  );
}
