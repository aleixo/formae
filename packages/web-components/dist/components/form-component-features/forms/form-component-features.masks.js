import { EBuilderComponentPropsTypes } from "../../../common/types/engine";
const masks = (prefix = "") => [
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
const schema = ({ event }) => ({
    components: [
        {
            component: "",
            name: "",
            children: masks("masks." + event + "."),
        },
    ],
});
export { schema };
//# sourceMappingURL=form-component-features.masks.js.map