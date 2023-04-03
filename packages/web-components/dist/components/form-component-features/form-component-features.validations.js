import { EBuilderComponentPropsTypes, EFormComponent, } from "../../types/engine";
export const validations = (prefix = "") => {
    return [
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "required",
            props: {
                label: "Required",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "length",
            props: {
                label: "length",
                type: "number",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "greaterThan",
            props: {
                label: "Greater than",
                type: "number",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "regex",
            props: {
                label: "Regex",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "maxLength",
            props: {
                label: "Max Length",
                type: "number",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "minLength",
            props: {
                label: "Min Length",
                type: "number",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "onlyLetters",
            props: {
                label: "Only letters",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "value",
            props: {
                label: "Specific value",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "notEmpty",
            props: {
                label: "Value not empty",
                fullWidth: true,
            },
        },
        {
            component: EFormComponent.FORM_GROUP,
            name: prefix + "numericRange",
            props: {
                title: "Numeric range",
            },
            children: [
                {
                    component: EBuilderComponentPropsTypes.STRING,
                    name: prefix + "numericRange.start",
                    props: {
                        label: "Start",
                        type: "number",
                        fullWidth: true,
                    },
                },
                {
                    component: EBuilderComponentPropsTypes.STRING,
                    name: prefix + "numericRange.end",
                    props: {
                        label: "End",
                        type: "number",
                        fullWidth: true,
                    },
                },
            ],
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "isNumber",
            props: {
                label: "Is number",
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "hasNoExtraSpaces",
            props: {
                label: "Has no extra spaces",
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "email",
            props: {
                label: "E-mail",
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "lessThan",
            props: {
                label: "Less than",
                type: "number",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "sequentialNumber",
            props: {
                label: "Sequential Numbers",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "repeatedNumbers",
            props: {
                label: "Repeated Numbers",
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "url",
            props: {
                label: "Repeated Numbers",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "notAllowSpaces",
            props: {
                label: "Not allow spaces",
                fullWidth: true,
            },
        },
        {
            component: EBuilderComponentPropsTypes.TABLE,
            name: prefix + "isInTheList",
            props: {
                title: "Is in the list",
                id: "featured",
                baseCellName: prefix + "isInTheList",
                row: [
                    {
                        component: EBuilderComponentPropsTypes.STRING,
                        name: "",
                        props: {
                            label: "Item",
                            fullWidth: true,
                        },
                    },
                ],
            },
        },
    ];
};
export const schema = ({ event }) => ({
    components: [
        {
            component: "",
            name: "",
            children: [
                {
                    name: "",
                    component: EBuilderComponentPropsTypes.OBJECT,
                    children: validations(`validations.${event}.`),
                },
            ],
        },
    ],
});
//# sourceMappingURL=form-component-features.validations.js.map