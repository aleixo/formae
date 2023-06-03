import { EBuilderComponentPropsTypes } from "../../../common/types/engine";
const schema = ({ event }) => ({
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
//# sourceMappingURL=form-component-features.api.js.map