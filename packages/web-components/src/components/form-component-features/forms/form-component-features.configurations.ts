import { TSchema } from "@form-builder/engine";
import { EBuilderComponentPropsTypes } from "../../../common/types/engine";

export const schema = (): TSchema => ({
  components: [
    {
      component: "",
      name: "",
      children: [
        {
          component: EBuilderComponentPropsTypes.GROUP,
          name: "",
          children: [
            {
              component: EBuilderComponentPropsTypes.STRING,
              name: "action",
              props: {
                label: "action",
                fullWidth: true,
              },
            },
            {
              component: EBuilderComponentPropsTypes.STRING,
              name: "method",
              props: {
                label: "Method",
                fullWidth: true,
              },
            },
            {
              component: EBuilderComponentPropsTypes.TABLE,
              name: "formattedDataDefaults",
              props: {
                title: "Formatted data defaults",
                id: "features",
                baseCellName: "formattedDataDefaults",
                label: "Form Data defaults",
                fullWidth: true,
                keyValuePair: true,
                row: [
                  {
                    component: EBuilderComponentPropsTypes.GROUP,
                    children: [
                      {
                        component: EBuilderComponentPropsTypes.STRING,
                        name: "key",
                        props: {
                          label: "Key",
                          placeholder: "Data default key",
                        },
                      },
                      {
                        component: EBuilderComponentPropsTypes.STRING,
                        name: "value",
                        props: {
                          label: "Value",
                          placeholder: "Data default value",
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              component: EBuilderComponentPropsTypes.GROUP,
              name: "filteredFields",
              props: {
                label: "Form filtered fields",
                fullWidth: true,
              },
            },
            {
              component: EBuilderComponentPropsTypes.GROUP,
              name: "iVars",
              props: {
                label: "Scope",
                fullWidth: true,
              },
            },
          ],
        },
      ],
    },
  ],
});
