import { EBuilderComponentPropsTypes } from "../../../common/types/engine";
export const schema = ({ component }) => ({
    components: [
        {
            component: "",
            name: "",
            children: [
                {
                    name: "",
                    component: EBuilderComponentPropsTypes.GROUP,
                    children: [
                        {
                            component: EBuilderComponentPropsTypes.STRING,
                            name: "default",
                            props: {
                                label: "Default",
                                placeholder: "Message as default for all validations",
                                fullWidth: true,
                            },
                        },
                        ...[
                            ...new Set(Object.keys((component === null || component === void 0 ? void 0 : component.validations) || {}).reduce((acc, key) => {
                                if (!component.validations || !component.validations[key])
                                    return acc;
                                return [...acc, ...Object.keys(component.validations[key])];
                            }, [])),
                        ].map((key) => ({
                            name: "errorMessages." + key,
                            component: EBuilderComponentPropsTypes.STRING,
                            props: {
                                label: key,
                                placeholder: "Message for this validation",
                                fullWidth: true,
                            },
                        })),
                    ],
                },
            ],
        },
    ],
});
/**
 * {
                      
                    }
 */
//# sourceMappingURL=form-component-features.error-messages.js.map