import { EBuilderComponentPropsTypes } from "../../../types/engine";
const formatters = (prefix = "") => [
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
export const schema = ({ event }) => ({
    components: [
        {
            component: "",
            name: "",
            children: [
                {
                    component: EBuilderComponentPropsTypes.OBJECT,
                    name: "",
                    children: formatters(`formatters.${event}.`),
                },
            ],
        },
    ],
});
//# sourceMappingURL=form-component-features.formatters.js.map