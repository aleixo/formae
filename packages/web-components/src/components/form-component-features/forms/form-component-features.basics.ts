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
              name: "name",
              props: {
                label: "Field name",
                fullWidth: true,
              },
            },
            {
              component: EBuilderComponentPropsTypes.STRING,
              name: "group",
              props: {
                label: "Group",
                fullWidth: true,
              },
            },
          ],
        },
      ],
    },
  ],
});
