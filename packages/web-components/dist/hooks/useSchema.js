import { v4 } from "uuid";
import { useCms } from "../contexts/cms.context";
const useSchema = () => {
    const { mappings } = useCms();
    const transverseSchema = (schema, targetStep, cb) => {
        const transverse = (traversable, currDepth = 0) => {
            var _a;
            for (let localIndex = 0; localIndex < traversable.length; localIndex++) {
                cb(traversable, localIndex, currDepth);
                if ((_a = traversable[localIndex]) === null || _a === void 0 ? void 0 : _a.children)
                    transverse(traversable[localIndex].children, currDepth + 1);
            }
            return traversable;
        };
        // IF its a form component
        if (schema.components) {
            return Object.assign(Object.assign({}, schema), { components: schema.components.map((item, i) => {
                    if (i !== targetStep) {
                        return item;
                    }
                    return Object.assign(Object.assign({}, item), { children: transverse(item.children) });
                }) });
        }
        return transverse(schema);
    };
    const buildComponentName = (component) => {
        return mappings[component].isContainer
            ? `__isContainer_${Math.random().toString(36).slice(2, 7)}`
            : Math.random().toString(36).slice(2, 7);
    };
    const init = ({ configs }) => ({
        configs,
        page: [],
    });
    const initForm = () => ({
        components: [
            {
                component: "",
                name: "",
                children: [],
            },
        ],
    });
    const add = (schema, component) => [
        ...schema,
        component,
    ];
    const addToFormStep = (schema, component, step = 0) => (Object.assign(Object.assign({}, schema), { components: schema.components.map((comp, index) => {
            if (index !== step)
                return comp;
            return Object.assign(Object.assign({}, comp), { children: [...comp.children, component] });
        }) }));
    const buildPage = ({ configs, page, }) => ({
        configs,
        page,
    });
    const edit = (schema, targetComponent) => {
        return transverseSchema(schema, 0, (component, localIndex) => {
            if (component[localIndex].id === targetComponent.id) {
                component[localIndex] = Object.assign(Object.assign({}, component[localIndex]), targetComponent);
            }
        });
    };
    const buildComponent = ({ component = "", props = {} }) => ({
        component,
        id: v4(),
        name: buildComponentName(component),
        props,
    });
    const buildTemplateComponent = (template) => (Object.assign({ id: v4(), name: Math.random().toString(36).slice(2, 7) }, template));
    const cloneComponent = (component) => {
        if (Array.isArray(component.children)) {
            return Object.assign(Object.assign({}, component), { children: component.children.map((child) => {
                    return cloneComponent(child);
                }), id: v4(), name: Math.random().toString(36).slice(2, 7) });
        }
        return Object.assign(Object.assign({}, component), { id: v4(), name: Math.random().toString(36).slice(2, 7) });
    };
    const remove = (schema, step, component) => {
        return transverseSchema(schema, step, (componentSet, localIndex) => {
            if (componentSet[localIndex].id === component.id) {
                componentSet.splice(localIndex, 1);
            }
        });
    };
    const arraymove = (arr, fromIndex, toIndex) => {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    };
    const moveUp = (schema, targetComponent) => {
        return transverseSchema(schema, 0, (component, localIndex) => {
            if (component[localIndex].id === targetComponent.id) {
                arraymove(component, localIndex, localIndex - 1);
            }
        });
    };
    const moveDown = (schema, targetComponent) => {
        return transverseSchema(schema, 0, (component, localIndex) => {
            if (component[localIndex].id === targetComponent.id) {
                arraymove(component, localIndex, localIndex + 1);
            }
        });
    };
    const moveTo = (schema, from, to) => {
        if (from.id === (to === null || to === void 0 ? void 0 : to.id))
            return schema;
        remove(schema, 0, from);
        if (!to) {
            return transverseSchema(schema, 0, (componentSet, localIndex, currDepth) => {
                if (localIndex === 0 && currDepth === 0) {
                    componentSet.push(from);
                }
            });
        }
        return transverseSchema(schema, 0, (componentSet, localIndex) => {
            if (componentSet[localIndex].id === to.id) {
                if (to.component === "__FORM__CONTAINER__" ||
                    mappings[to.component].isContainer ||
                    Array.isArray(to.children)) {
                    componentSet[localIndex].children = [
                        ...(componentSet[localIndex].children || []),
                        from,
                    ];
                }
                else {
                    componentSet.splice(localIndex + 1, 0, from);
                }
            }
        });
    };
    const getComponentWithPattern = (schema, pattern) => {
        const foundComponents = [];
        transverseSchema(schema, 0, (componentSet, index) => {
            if (componentSet[index].children)
                return;
            if (JSON.stringify(componentSet[index]).includes(pattern)) {
                foundComponents.push(componentSet[index]);
            }
        });
        return foundComponents;
    };
    const createTemplate = (component, isReference, name) => (Object.assign(Object.assign({}, component), { __isTemplate: true, __isReference: isReference, label: name }));
    const extractComponentFormConfigurations = (component) => ({
        api: component.api,
        formatters: component.formatters,
        clearFields: component.clearFields,
        masks: component.masks,
        validations: component.validations,
        visibilityConditions: component.visibilityConditions,
    });
    return {
        getComponentWithPattern,
        init,
        initForm,
        add,
        addToFormStep,
        buildComponent,
        buildTemplateComponent,
        edit,
        moveTo,
        remove,
        moveUp,
        moveDown,
        transverseSchema,
        cloneComponent,
        buildPage,
        extractComponentFormConfigurations,
        createTemplate,
    };
};
export { useSchema };
//# sourceMappingURL=useSchema.js.map