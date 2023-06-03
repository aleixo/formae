import { CoreEvents, TComponent } from "@form-builder/engine";
import { EBuilderComponentPropsTypes } from "../../../common/types/engine";

export type TFeatureConfigurationsPossibleEvents = keyof typeof CoreEvents;
export type TFeatureConfigurationsEvent = {
  label: string;
  event?: TFeatureConfigurationsPossibleEvents;
};

export interface IFormFeature {
  label: string;
  key: string;
  type: EBuilderComponentPropsTypes;
  configurations?: {
    fields?: Record<string, { type: EBuilderComponentPropsTypes }>;
    events?: TFeatureConfigurationsEvent[];
  };
}

const formatters = (prefix = ""): TComponent[] => [
  {
    component: EBuilderComponentPropsTypes.BOOLEAN,
    name: prefix + "capitalize",
    props: {
      label: "Capitalize",
    },
  },
  {
    component: EBuilderComponentPropsTypes.TABLE,
    name: prefix + "splitter",
    props: {
      title: "Splitter",
      id: "features",
      baseCellName: prefix + "splitter",
      row: [
        {
          component: EBuilderComponentPropsTypes.STRING,
          name: "value",
          props: {
            label: "value",
          },
        },
        {
          component: EBuilderComponentPropsTypes.STRING,
          name: "position",
          props: {
            label: "Position",
            type: "number",
          },
        },
      ],
    },
  },
];

export const schema = ({ event }: { event: string }) => ({
  components: [
    {
      component: "",
      name: "",
      children: [
        {
          component: EBuilderComponentPropsTypes.GROUP,
          name: "",
          children: formatters(`formatters.${event}.`),
        },
      ],
    },
  ],
});
