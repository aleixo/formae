import { TSchema } from "@form-builder/engine";
import {
  EBuilderComponentPropsTypes,
  EFormComponent,
} from "../../../types/engine";

export const schema = (): TSchema => ({
  components: [
    {
      component: "",
      name: "",
      children: [
        {
          component: EFormComponent.FORM_GROUP,
          name: "",
          children: [
            {
              component: EBuilderComponentPropsTypes.STRING,
              name: "name",
              props: {
                label: "Required",
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
