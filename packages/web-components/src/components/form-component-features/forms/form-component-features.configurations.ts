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
              component: EBuilderComponentPropsTypes.STRING,
              name: "formattedDataDefaults",
              props: {
                label: "Form Data defaults",
                fullWidth: true,
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
