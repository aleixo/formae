import { CoreEvents, TSchema } from "@form-builder/engine";
import { EBuilderComponentPropsTypes } from "../../../types/engine";

export type TFeatureConfigurationsPossibleEvents = keyof typeof CoreEvents;
export type TFeatureConfigurationsEvent = {
  label: string;
  event?: TFeatureConfigurationsPossibleEvents;
};

const schema = ({ event }: { event: string }): TSchema => ({
  components: [
    {
      component: "",
      name: "",
      children: [
        {
          component: EBuilderComponentPropsTypes.TABLE,
          name: "api." + event,
          props: {
            id: "features",
            baseCellName: "api." + event,
            row: [
              {
                component: EBuilderComponentPropsTypes.STRING,
                name: "method",
                props: {
                  label: "Method",
                },
                validations: {
                  ON_FIELD_BLUR: {
                    isInTheList: ["GET", "POST"],
                  },
                },
              },
              {
                component: EBuilderComponentPropsTypes.STRING,
                name: "url",
                props: {
                  label: "Url",
                },
              },
              {
                component: EBuilderComponentPropsTypes.BOOLEAN,
                name: "body",
                props: {
                  label: "Body",
                },
              },
              {
                component: EBuilderComponentPropsTypes.STRING,
                name: "debounce",
                props: {
                  label: "Debounce time",
                },
              },
              {
                component: EBuilderComponentPropsTypes.TABLE,
                name: "headers",
                props: {
                  id: "features",
                  baseCellName: "headers",
                  label: "Headers",
                  row: [
                    {
                      component: EBuilderComponentPropsTypes.STRING,
                      name: "method",
                      props: {
                        label: "Method",
                      },
                      validations: {
                        ON_FIELD_BLUR: {
                          isInTheList: ["GET", "POST"],
                        },
                      },
                    },
                  ],
                },
              },
              {
                component: EBuilderComponentPropsTypes.STRING,
                name: "scope",
                props: {
                  label: "Scope",
                },
              },
            ],
          },
        },
      ],
    },
  ],
});

export { schema };
