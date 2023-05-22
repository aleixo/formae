import { EBuilderComponentPropsTypes, EFormComponent, } from "../../types/engine";
import { FormSelect } from "../select/select";
import { Checkbox } from "../checkbox/checkbox";
import { FormGroup } from "../formGroup/formGroup";
import { Accordion } from "../accordion/accordion";
import { Table } from "../table/table";
import { TextField } from "../textfield/textfield";
const formMapper = {
    [EFormComponent.ACCORDION]: {
        component: Accordion,
    },
    [EFormComponent.FORM_GROUP]: {
        component: FormGroup,
    },
    [EFormComponent.INPUT]: {
        component: TextField,
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
export { formMapper, formPropsMapping };
//# sourceMappingURL=form-component-features.mappings.js.map