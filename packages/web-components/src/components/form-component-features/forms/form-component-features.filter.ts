import { TSchema } from "@form-builder/engine";
import { EBuilderComponentPropsTypes } from "../../../common/types/engine";
import { validations } from "./form-component-features.validations";

export const schema = (): TSchema => ({
  components: [
    {
      component: "",
      name: "",
      children: [
        {
          name: "",
          component: EBuilderComponentPropsTypes.GROUP,
          children: validations(`filter`),
        },
      ],
    },
  ],
});
