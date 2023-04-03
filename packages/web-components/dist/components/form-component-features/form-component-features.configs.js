import { CoreEvents } from "@form-builder/engine";
import { EBuilderComponentPropsTypes, EFormComponent, } from "../../types/engine";
import { FormSelect } from "../select/select";
import { Checkbox } from "../checkbox/checkbox";
import { FormGroup } from "../formGroup/formGroup";
import { Accordion } from "../accordion/accordion";
import { Table } from "../table/table";
import { TextField } from "../textfield/textfield";
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
            id: "featured",
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
            id: "featured",
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
const validations = (prefix = "") => {
    return [
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "required",
            props: {
                label: "Required",
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "length",
            props: {
                label: "length",
                type: "number",
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "greaterThan",
            props: {
                label: "Greater than",
                type: "number",
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "regex",
            props: {
                label: "Regex",
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "maxLength",
            props: {
                label: "Max Length",
                type: "number",
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "minLength",
            props: {
                label: "Min Length",
                type: "number",
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "onlyLetters",
            props: {
                label: "Only letters",
            },
        },
        {
            component: EBuilderComponentPropsTypes.STRING,
            name: prefix + "value",
            props: {
                label: "Specific value",
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "notEmpty",
            props: {
                label: "Value not empty",
            },
        },
        {
            component: EFormComponent.ACCORDION,
            name: prefix + "numericRange",
            props: {
                title: "Numeric range",
                label: "Numeric range",
            },
            children: [
                {
                    component: EBuilderComponentPropsTypes.STRING,
                    name: prefix + "numericRange.start",
                    props: {
                        label: "Start",
                        type: "number",
                    },
                },
                {
                    component: EBuilderComponentPropsTypes.STRING,
                    name: prefix + "numericRange.end",
                    props: {
                        label: "End",
                        type: "number",
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
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "sequentialNumber",
            props: {
                label: "Sequential Numbers",
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
            },
        },
        {
            component: EBuilderComponentPropsTypes.BOOLEAN,
            name: prefix + "notAllowSpaces",
            props: {
                label: "Not allow spaces",
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
                        },
                    },
                ],
            },
        },
    ];
};
const features = {
    components: [
        {
            component: "",
            name: "",
            children: [
                {
                    component: EBuilderComponentPropsTypes.OBJECT,
                    name: "",
                    props: {
                        title: "Field Name",
                    },
                    children: [
                        {
                            component: EBuilderComponentPropsTypes.STRING,
                            name: "name",
                            props: {
                                label: "Name",
                            },
                        },
                    ],
                },
                {
                    component: EBuilderComponentPropsTypes.OBJECT,
                    name: "",
                    props: {
                        title: "Form group name",
                    },
                    children: [
                        {
                            component: EBuilderComponentPropsTypes.STRING,
                            name: "group",
                            props: {
                                label: "Group",
                            },
                        },
                    ],
                },
                {
                    component: EFormComponent.ACCORDION,
                    name: "",
                    props: {
                        title: "Validations & Error messages",
                    },
                    children: [
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "On Mount",
                            },
                            children: [
                                {
                                    name: "",
                                    component: EBuilderComponentPropsTypes.OBJECT,
                                    children: validations("validations." + CoreEvents.ON_FORM_MOUNT + "."),
                                },
                            ],
                        },
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "On Blur",
                            },
                            children: [
                                {
                                    name: "",
                                    component: EBuilderComponentPropsTypes.OBJECT,
                                    children: validations("validations." + CoreEvents.ON_FIELD_BLUR + "."),
                                },
                            ],
                        },
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "On change",
                            },
                            children: [
                                {
                                    name: "",
                                    component: EBuilderComponentPropsTypes.OBJECT,
                                    children: validations("validations." + CoreEvents.ON_FIELD_CHANGE + "."),
                                },
                            ],
                        },
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "On focus",
                                description: "Fires on field focus",
                            },
                            children: [
                                {
                                    name: "",
                                    component: EBuilderComponentPropsTypes.OBJECT,
                                    children: validations("validations." + CoreEvents.ON_FIELD_FOCUS + "."),
                                },
                            ],
                        },
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "Error messages",
                            },
                            children: validations("errorMessages.").map((comp) => (Object.assign(Object.assign({}, comp), { component: EBuilderComponentPropsTypes.STRING }))),
                        },
                    ],
                },
                {
                    component: EFormComponent.ACCORDION,
                    name: "",
                    props: {
                        title: "Masks",
                        description: "Mask your input. This will not the submitting value and the mask can be cleared",
                    },
                    children: [
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "On focus",
                            },
                            children: masks("masks." + CoreEvents.ON_FIELD_FOCUS + "."),
                        },
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "On Blur",
                            },
                            children: masks("masks." + CoreEvents.ON_FIELD_BLUR + "."),
                        },
                    ],
                },
                {
                    component: EFormComponent.ACCORDION,
                    name: "",
                    props: {
                        title: "Formatters",
                    },
                    children: [
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "Formatters - On change",
                            },
                            children: formatters("formatters." + CoreEvents.ON_FIELD_CHANGE + "."),
                        },
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "On blur",
                            },
                            children: formatters("formatters." + CoreEvents.ON_FIELD_BLUR + "."),
                        },
                    ],
                },
                {
                    component: EFormComponent.ACCORDION,
                    name: "",
                    props: {
                        title: "API",
                    },
                    children: [
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "API - On blur",
                            },
                            children: [
                                {
                                    component: EBuilderComponentPropsTypes.BOOLEAN,
                                    name: "api." + CoreEvents.ON_FIELD_BLUR + ".api",
                                    props: {
                                        label: "Capitalize",
                                    },
                                },
                            ],
                        },
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "API - On change",
                            },
                            children: [
                                {
                                    component: EBuilderComponentPropsTypes.BOOLEAN,
                                    name: CoreEvents.ON_FIELD_CHANGE + ".api",
                                    props: {
                                        label: "Capitalize",
                                    },
                                },
                            ],
                        },
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "API - On mount",
                            },
                            children: [
                                {
                                    component: EBuilderComponentPropsTypes.TABLE,
                                    name: "api." + CoreEvents.ON_FIELD_MOUNT,
                                    props: {
                                        id: "featured",
                                        baseCellName: "api." + CoreEvents.ON_FIELD_MOUNT,
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
                                                component: EBuilderComponentPropsTypes.STRING,
                                                name: "headers",
                                                props: {
                                                    label: "Headers",
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
                        {
                            component: EFormComponent.ACCORDION,
                            name: "",
                            props: {
                                title: "API - On focus",
                                description: " Call api on focus",
                            },
                            children: [
                                {
                                    component: EBuilderComponentPropsTypes.BOOLEAN,
                                    name: "api." + CoreEvents.ON_FIELD_FOCUS,
                                    props: {
                                        label: "Capitalize",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    component: EFormComponent.ACCORDION,
                    name: "",
                    props: {
                        title: "Filters",
                    },
                    children: validations("filter."),
                },
                {
                    component: EFormComponent.ACCORDION,
                    name: "",
                    props: {
                        title: "State",
                    },
                    children: [
                        {
                            component: EBuilderComponentPropsTypes.BOOLEAN,
                            name: "state.hidden",
                            props: {
                                label: "Hidden",
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
const formMapper = {
    [EFormComponent.ACCORDION]: {
        component: Accordion,
    },
    [EFormComponent.FORM_GROUP]: {
        component: FormGroup,
    },
    [EBuilderComponentPropsTypes.STRING]: {
        component: TextField,
    },
    [EBuilderComponentPropsTypes.ARRAY]: {
        component: FormSelect,
    },
    [EBuilderComponentPropsTypes.OBJECT]: {
        component: FormGroup,
    },
    [EBuilderComponentPropsTypes.BOOLEAN]: {
        component: Checkbox,
    },
    [EBuilderComponentPropsTypes.TABLE]: {
        component: Table,
    },
};
const formPropsMapping = {
    [EBuilderComponentPropsTypes.STRING]: {
        getValue: "onChange",
        setValue: "value",
    },
    [EBuilderComponentPropsTypes.ARRAY]: {
        getValue: "onChange",
        setValue: "value",
    },
    [EBuilderComponentPropsTypes.BOOLEAN]: {
        getValue: "onChange",
        setValue: "checked",
    },
    [EBuilderComponentPropsTypes.TABLE]: {
        setValue: "value",
    },
};
export { features, formMapper, formPropsMapping };
//# sourceMappingURL=form-component-features.configs.js.map