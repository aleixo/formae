import { CoreEvents, TComponent, TSchema } from "@form-builder/engine";
import { EBuilderComponentPropsTypes } from "../../../types/engine";

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

const masks = (prefix = ""): TComponent[] => [
  {
    component: EBuilderComponentPropsTypes.BOOLEAN,
    name: prefix + "cleanMask",
    props: {
      label: "Clean mask",
    },
  },
  {
    component: EBuilderComponentPropsTypes.TABLE,
    name: prefix + "generic",
    props: {
      label: "Generic",
      id: "features",
      baseCellName: prefix,
      row: [
        {
          component: EBuilderComponentPropsTypes.STRING,
          name: "to",
          props: {
            label: "To",
            type: "number",
          },
        },
        {
          component: EBuilderComponentPropsTypes.STRING,
          name: "from",
          props: {
            label: "From",
            type: "number",
          },
        },
        {
          component: EBuilderComponentPropsTypes.STRING,
          name: "mask",
          props: {
            label: "Mask value",
          },
        },
      ],
    },
  },
  {
    component: EBuilderComponentPropsTypes.BOOLEAN,
    name: prefix + "feinMask",
    props: {
      label: "Fein mask",
    },
  },
  {
    component: EBuilderComponentPropsTypes.STRING,
    name: prefix + "replaceAll",
    props: {
      label: "Replace All",
    },
  },
];

const schema = ({ event }: { event: string }): TSchema => ({
  components: [
    {
      component: "",
      name: "",
      children: masks("masks." + event + "."),
    },
  ],
});

export { schema };
