import { TComponent, TSchema } from "@form-builder/engine";
import {
  EBuilderComponentPropsTypes,
  EFormComponent,
} from "../../../types/engine";

export const schema = ({ component }: { component: TComponent }): TSchema => ({
  components: [
    {
      component: "",
      name: "",
      children: [
        {
          name: "",
          component: EFormComponent.FORM_GROUP,
          props: {
            title: "Error messages",
          },
          children:
            component.validations &&
            [
              ...new Set(
                Object.keys(component.validations).reduce((acc, key) => {
                  if (!component.validations || !component.validations[key])
                    return acc;
                  return [...acc, ...Object.keys(component.validations[key])];
                }, [])
              ),
            ].map((key) => ({
              name: "errorMessages." + key,
              component: EBuilderComponentPropsTypes.STRING,
              props: {
                label: key,
                placeholder: "Message for this validation",
                fullWidth: true,
              },
            })),
        },
      ],
    },
  ],
});
