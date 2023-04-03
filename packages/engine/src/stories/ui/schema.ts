import { TComponent, TSchema } from 'core';

const init = (): TSchema => ({
  components: [
    {
      component: '',
      name: '',
      children: [],
    },
  ],
});

const add = (schema: TSchema, component: TComponent, atStep = 0): TSchema => ({
  ...schema,
  components: schema.components.map((existingComponents, i) => {
    if (i === atStep) {
      return { ...existingComponents, children: [...schema.components[atStep].children, component] };
    }
    return existingComponents;
  }),
});

const editAtIndex = (
  component: TComponent,
  targetComponent: TComponent,
  atIndex = 0,
  atDepth = 0,
  recursionLevel = 0,
): TComponent => ({
  ...component,
  children: component?.children?.map((childComponent, index) => {
    if (childComponent.children) {
      return editAtIndex(childComponent, targetComponent, atIndex, atDepth, recursionLevel + 1);
    }

    if (recursionLevel === atDepth && index === atIndex) {
      return {
        ...targetComponent,
      };
    }
    return childComponent;
  }),
});

const edit = (schema: TSchema, targetComponent: TComponent, atStep = 0, atIndex = 0, atDepth = 0): TSchema => {
  return {
    ...schema,
    components: schema.components.map((existingComponents, i) => {
      if (i === atStep) {
        return editAtIndex(schema.components[atStep], targetComponent, atIndex);
      }
      return existingComponents;
    }),
  };
};

const buildComponent = ({ name = Math.random().toString(), component = '' }): TComponent => ({
  component,
  name,
  props: {},
});

export { init, add, buildComponent, edit };
