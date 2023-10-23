import { TComponent, TSchema } from "@form-builder/engine";
import { v4 } from "uuid";
import { IComponent } from "../common/types/engine";
import { useCms } from "../contexts/cms.context";

const useSchema = () => {
  const { mappings } = useCms();
  const transverseSchema = <T>(
    schema: T,
    targetStep: number,
    cb: (
      component: IComponent[],
      index: number,
      currDepth: number,
      len: number,
      prev: IComponent[],
      count
    ) => any,
    id?: number
  ): T => {
    let count = 0;
    let foundElement = false;
    const transverse = (
      traversable: IComponent[],
      currDepth = 0,
      prev?: IComponent[]
    ): any => {
      for (let localIndex = 0; localIndex < traversable.length; localIndex++) {
        foundElement = id === traversable[localIndex].id;

        if (foundElement || !id) {
          const res = cb(
            traversable,
            localIndex,
            currDepth,
            traversable.length,
            prev,
            count
          );

          // Nothing more to do
          if (res) break;
        }

        count++;

        //We are entering in a container
        if (traversable[localIndex]?.children)
          transverse(
            traversable[localIndex].children as any,
            currDepth + 1,
            traversable[localIndex] as any
          );
      }
      return traversable;
    };

    // IF its a form component
    if ((schema as any).components as any[]) {
      return {
        ...schema,
        components: (schema as any).components.map((item, i) => {
          if (i !== targetStep) {
            return item;
          }

          return {
            ...item,
            children: transverse(item.children),
          };
        }),
      };
    }
    return transverse(schema as any);
  };

  const buildComponentName = (component: string) => {
    return mappings[component].isContainer
      ? `__isContainer_${Math.random().toString(36).slice(2, 7)}`
      : Math.random().toString(36).slice(2, 7);
  };

  const init = ({ configs }): { configs: unknown; page: TComponent[] } => ({
    configs,
    page: [],
  });

  const initForm = (): TSchema => ({
    components: [
      {
        component: "",
        name: "",
        children: [],
      },
    ],
  });

  const add = (schema: TComponent[], component: IComponent): TComponent[] => [
    ...schema,
    component,
  ];

  const addToFormStep = (
    schema: TSchema,
    component: TComponent,
    step = 0
  ): TSchema => ({
    ...schema,
    components: schema.components.map((comp, index) => {
      if (index !== step) return comp;
      return {
        ...comp,
        children: [...comp.children, component],
      };
    }),
  });

  const edit = <T>(schema: T, targetComponent: IComponent): T => {
    return transverseSchema<T>(schema, 0, (component, localIndex) => {
      if (component[localIndex].id === targetComponent.id) {
        component[localIndex] = {
          ...component[localIndex],
          ...targetComponent,
        };
      }
    });
  };

  const buildComponent = ({ component = "", props = {} }): IComponent => ({
    component,
    id: v4(),
    name: buildComponentName(component),
    props,
  });

  const buildTemplateComponent = (template): IComponent => ({
    id: v4(),
    name: Math.random().toString(36).slice(2, 7),
    ...template,
  });

  const cloneComponent = (component: TComponent): IComponent => {
    if (Array.isArray(component.children)) {
      return {
        ...component,
        children: component.children.map((child) => {
          return cloneComponent(child);
        }),
        id: v4(),
        name: Math.random().toString(36).slice(2, 7),
      };
    }
    return {
      ...component,
      id: v4(),
      name: Math.random().toString(36).slice(2, 7),
    };
  };

  const remove = <T>(schema: T, step: number, component: IComponent): T => {
    return transverseSchema(schema, step, (componentSet, localIndex) => {
      if (componentSet[localIndex].id === component.id) {
        componentSet.splice(localIndex, 1);
      }
    });
  };

  const arraymove = (arr: IComponent[], fromIndex: number, toIndex: number) => {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return true;
  };

  const moveUp = <T>(schema: T, targetComponent: IComponent): T => {
    return transverseSchema<T>(
      schema,
      0,
      (component, localIndex) => {
        if (component[localIndex].id === targetComponent.id) {
          if (!component[localIndex - 1]) {
            return moveTo(schema, targetComponent, component[localIndex + 1]);
          }

          if (mappings[component[localIndex - 1]?.component]?.isContainer) {
            return moveTo(schema, targetComponent, component[localIndex - 1]);
          }

          return arraymove(component, localIndex, localIndex - 1);
        }
      },
      targetComponent.id
    );
  };

  const moveDown = <T>(schema: T, targetComponent: IComponent): T => {
    return transverseSchema<T>(
      schema,
      0,
      (component, localIndex, currDepth, length, prev, count) => {
        console.log(component);
        if (prev && localIndex + 1 === length) {
          prev.children = prev.children.filter((_, i) => i !== localIndex);
          return true;
          prev = [...prev.splice(0, count), targetComponent, ...prev.slice(1)];
          component.splice(localIndex, 1);
          return true;
        }

        if (mappings[component[localIndex + 1]?.component]?.isContainer) {
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
      },
      targetComponent.id
    );
  };

  const moveTo = <T>(schema: T, from: IComponent, to?: IComponent): T => {
    if (from.id === to?.id) return schema;
    remove(schema, 0, from);

    if (!to) {
      return transverseSchema(
        schema,
        0,
        (componentSet, localIndex, currDepth) => {
          if (localIndex === 0 && currDepth === 0) {
            componentSet.push(from);
          }
        }
      );
    }
    return transverseSchema(schema, 0, (componentSet, localIndex) => {
      if (componentSet[localIndex].id === to.id) {
        if (mappings[to.component].isContainer || Array.isArray(to.children)) {
          componentSet[localIndex].children = [
            from,
            ...(componentSet[localIndex].children || []),
          ];
        } else {
          componentSet.splice(localIndex + 1, 0, from);
        }
      }
    });
  };

  const getComponentWithPattern = <T>(
    schema: T,
    pattern: string
  ): TComponent[] => {
    const foundComponents: TComponent[] = [];

    transverseSchema(schema, 0, (componentSet, index) => {
      if (componentSet[index].children) return;

      if (JSON.stringify(componentSet[index]).includes(pattern)) {
        foundComponents.push(componentSet[index]);
      }
    });

    return foundComponents;
  };

  const createTemplate = (
    component: TComponent,
    isReference: boolean,
    name: string
  ) => ({
    ...component,
    __isTemplate: true,
    __isReference: isReference,
    label: name,
  });

  const extractComponentFormConfigurations = (
    component: TComponent
  ): Pick<
    TComponent,
    | "api"
    | "formatters"
    | "clearFields"
    | "masks"
    | "validations"
    | "visibilityConditions"
  > => ({
    api: component.api,
    formatters: component.formatters,
    clearFields: component.clearFields,
    masks: component.masks,
    validations: component.validations,
    visibilityConditions: component.visibilityConditions,
  });

  const getTopSchemaComponent = (schema: TSchema) => {
    let comp: any = null;
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
