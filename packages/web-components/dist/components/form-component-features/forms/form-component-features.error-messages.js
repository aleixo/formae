import { EFormComponent } from "../../../types/engine";
export const schema = ({ component }) => ({
    components: [
        {
            component: "",
            name: "",
            children: [
                {
                    name: "",
                    component: EFormComponent.FORM_GROUP,
                    children: [
                        {
                            component: EFormComponent.INPUT,
                            name: "default",
                            props: {
                                label: "Default",
                                placeholder: "Message as default for all validations",
                                fullWidth: true,
                            },
                        },
                        ...[
                            ...new Set(Object.keys(component.validations || {}).reduce((acc, key) => {
                                if (!component.validations || !component.validations[key])
                                    return acc;
                                return [...acc, ...Object.keys(component.validations[key])];
                            }, [])),
                        ].map((key) => ({
                            name: "errorMessages." + key,
                            component: EFormComponent.INPUT,
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