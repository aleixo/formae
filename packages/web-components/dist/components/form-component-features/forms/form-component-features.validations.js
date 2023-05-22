import { EBuilderComponentPropsTypes, EFormComponent, } from "../../../types/engine";
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
                id: "features",
                baseCellName: prefix + "isInTheList",
                row: [
                    {
                        component: EBuilderComponentPropsTypes.STRING,
                        props: {
                            label: "Item",
                            fullWidth: true,
                        },
                    },
                ],
            },
        },
        {
            component: EBuilderComponentPropsTypes.TABLE,
            name: prefix + "conditions TODO",
            props: {
                title: "Conditions",
                id: "features",
                baseCellName: prefix + "conditions",
                row: [
                    {
                        component: EBuilderComponentPropsTypes.STRING,
                        props: {
                            label: "Item",
                            fullWidth: true,
                        },
                    },
                ],
            },
        },
        {
            component: EFormComponent.FORM_GROUP,
            name: prefix + "date TODO",
            props: {
                title: "Date",
            },
            children: [
                {
                    component: EBuilderComponentPropsTypes.BOOLEAN,
                    name: prefix + "onlyValidDate",
                    props: {
                        label: "Only valid date",
                        fullWidth: true,
                    },
                },
                {
                    component: EBuilderComponentPropsTypes.STRING,
                    name: prefix + "operator",
                    props: {
                        label: "Operator",
                        fullWidth: true,
                    },
                    validations: {
                        ON_FIELD_CHANGE: {
                            isInTheList: ["<", ">", "===", ">=", "<=", "!=="],
                        },
                    },
                    errorMessages: {
                        isInTheList: "Should be one of < > === >= <= !==",
                    },
                },
                {
                    component: EBuilderComponentPropsTypes.OBJECT,
                    name: prefix + "origin",
                    children: [
                        {
                            component: EBuilderComponentPropsTypes.STRING,
                            name: prefix + "value",
                            props: {
                                label: "Value",
                                fullWidth: true,
                            },
                        },
                        {
                            component: EBuilderComponentPropsTypes.STRING,
                            name: prefix + "format",
                            props: {
                                label: "Format",
                                fullWidth: true,
                            },
                            validations: {
                                ON_FIELD_CHANGE: {
                                    isInTheList: [
                                        "MMDDYYYY",
                                        "DDMMYYYY",
                                        "YYYYMMDD",
                                        "YYYYDDMM",
                                        "timestamp",
                                    ],
                                },
                            },
                            errorMessages: {
                                isInTheList: "Should be one of MMDDYYYY | DDMMYYYY | YYYYMMDD | YYYYDDMM | timestamp",
                            },
                        },
                        {
                            component: EBuilderComponentPropsTypes.OBJECT,
                            name: prefix + "intervals",
                            children: [
                                {
                                    component: EBuilderComponentPropsTypes.STRING,
                                    name: prefix + "intervals.years",
                                    props: {
                                        label: "Years",
                                        fullWidth: true,
                                    },
                                },
                                {
                                    component: EBuilderComponentPropsTypes.STRING,
                                    name: prefix + "intervals.months",
                                    props: {
                                        label: "Months",
                                        fullWidth: true,
                                    },
                                },
                                {
                                    component: EBuilderComponentPropsTypes.STRING,
                                    name: prefix + "intervals.days",
                                    props: {
                                        label: "Days",
                                        fullWidth: true,
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    component: EBuilderComponentPropsTypes.OBJECT,
                    name: prefix + "origin",
                    props: {
                        title: "222",
                    },
                    children: [
                        {
                            component: EBuilderComponentPropsTypes.STRING,
                            name: prefix + "target.value",
                            props: {
                                label: "Value",
                                fullWidth: true,
                            },
                        },
                        {
                            component: EBuilderComponentPropsTypes.STRING,
                            name: prefix + "target.format",
                            props: {
                                label: "Format",
                                fullWidth: true,
                            },
                            validations: {
                                ON_FIELD_CHANGE: {
                                    isInTheList: [
                                        "MMDDYYYY",
                                        "DDMMYYYY",
                                        "YYYYMMDD",
                                        "YYYYDDMM",
                                        "timestamp",
                                    ],
                                },
                            },
                            errorMessages: {
                                isInTheList: "Should be one of MMDDYYYY | DDMMYYYY | YYYYMMDD | YYYYDDMM | timestamp",
                            },
                        },
                    ],
                },
                {
                    component: EBuilderComponentPropsTypes.TABLE,
                    name: prefix + "fields",
                    props: {
                        title: "Fields",
                        id: "features",
                        baseCellName: prefix + "fields",
                        row: [
                            {
                                component: EBuilderComponentPropsTypes.STRING,
                                props: {
                                    label: "bind",
                                    fullWidth: true,
                                },
                            },
                            {
                                component: EBuilderComponentPropsTypes.STRING,
                                props: {
                                    label: "FieldName",
                                    fullWidth: true,
                                },
                            },
                            {
                                component: EFormComponent.FORM_GROUP,
                                props: {
                                    label: "Field validations todo",
                                    fullWidth: true,
                                },
                            },
                        ],
                    },
                },
            ],
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