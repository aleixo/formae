import { EBuilderComponentPropsTypes } from "../../../common/types/engine";
import { validations } from "./form-component-features.validations";
export const schema = () => ({
    components: [
        {
            component: "",
            name: "",
            children: [
                {
                    name: "",
                    component: EBuilderComponentPropsTypes.GROUP,
                    children: validations(`filter.`),
                },
            ],
        },
    ],
});
//# sourceMappingURL=form-component-features.filter.js.map