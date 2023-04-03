import { TSchema } from "@form-builder/engine";
import { EBuilderComponentPropsTypes } from "../../../types/engine";
import { validations } from "./form-component-features.validations";

export const schema = (): TSchema => ({
  components: [
    {
      component: "",
      name: "",
      children: [
        {
          name: "",
          component: EBuilderComponentPropsTypes.OBJECT,
          children: validations(`filter`),
        },
      ],
    },
  ],
});
