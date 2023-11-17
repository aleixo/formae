import { v4 } from "uuid";
import { useCms } from "../contexts/cms.context";
const useSchema = () => {
    const { mappings } = useCms();
    const transverseSchema = (schema, targetStep, cb, id) => {
        let count = 0;
        let foundElement = false;
        const transverse = (traversable, currDepth = 0, prev) => {
            var _a;
            for (let localIndex = 0; localIndex < traversable.length; localIndex++) {
                foundElement = id === traversable[localIndex].id;
                if (foundElement || !id) {
                    const res = cb(traversable, localIndex, currDepth, traversable.length, prev, count);
                    // Nothing more to do
                    if (res)
                        break;
                }
                count++;
                //We are entering in a container
                if ((_a = traversable[localIndex]) === null || _a === void 0 ? void 0 : _a.children)
                    transverse(traversable[localIndex].children, currDepth + 1, traversable[localIndex]);
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
        return true;
    };
    const moveUp = (schema, targetComponent) => {
        return transverseSchema(schema, 0, (component, localIndex) => {
            var _a, _b;
            if (component[localIndex].id === targetComponent.id) {
                if (!component[localIndex - 1]) {
                    return moveTo(schema, targetComponent, component[localIndex + 1]);
                }
                if ((_b = mappings[(_a = component[localIndex - 1]) === null || _a === void 0 ? void 0 : _a.component]) === null || _b === void 0 ? void 0 : _b.isContainer) {
                    return moveTo(schema, targetComponent, component[localIndex - 1]);
                }
                return arraymove(component, localIndex, localIndex - 1);
            }
        }, targetComponent.id);
    };
    const moveDown = (schema, targetComponent) => {
        return transverseSchema(schema, 0, (component, localIndex, currDepth, length, prev, count) => {
            var _a, _b;
            console.log(component);
            if (prev && localIndex + 1 === length) {
                prev.children = prev.children.filter((_, i) => i !== localIndex);
                return true;
                prev = [...prev.splice(0, count), targetComponent, ...prev.slice(1)];
                component.splice(localIndex, 1);
                return true;
            }
            if ((_b = mappings[(_a = component[localIndex + 1]) === null || _a === void 0 ? void 0 : _a.component]) === null || _b === void 0 ? void 0 : _b.isContainer) {
                component[localIndex + 1].children = [
                    targetComponent,
                    ...(component[localIndex + 1].children || []),
                ];
                component.splice(localIndex, 1);
                return true;
            }
            if (component[localIndex].id === targetComponent.id) {
                console.log("NORMAL");
                return arraymove(component, localIndex, localIndex + 1);
            }
        }, targetComponent.id);
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
                if (mappings[to.component].isContainer || Array.isArray(to.children)) {
                    componentSet[localIndex].children = [
                        from,
                        ...(componentSet[localIndex].children || []),
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
    const getTopSchemaComponent = (schema) => {
        let comp = null;
        transverseSchema(schema, 0, (componentSet, index) => {
            if (!componentSet[index].children && !comp) {
                comp = componentSet[index];
            }
        });
        return comp;
    };
    return {
        getComponentWithPattern,
        getTopSchemaComponent,
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
        extractComponentFormConfigurations,
        createTemplate,
    };
};
export { useSchema };
//# sourceMappingURL=useSchema.js.map