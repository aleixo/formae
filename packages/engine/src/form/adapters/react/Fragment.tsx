import React, { useMemo, useContext } from 'react';
import { getFormInstance } from 'core';

import { TComponent } from './types';
import ChildWrapper from './Field';
import { FormContext } from './context';
import { EEVents } from 'core/events';

const Fragment = ({ id, components, onMount, onRehydrate, onData, onBlur, onFocus, onComponent }) => {
  const { mapper: Mapper, propsMapping: PropsMapping } = useContext(FormContext);
  const formInstance = useMemo(() => getFormInstance(id), []);

  const Children = useMemo(() => {
    const generateComponentChildren = (components: TComponent[], componentLevel = 0): any => {
      return components.map((component: TComponent, i: number) => {
        const Component = Mapper[component.component]?.component as new () => React.Component;

        if (!Component) return <p>NOT MAPPED</p>;

        const modComponent = onComponent ? onComponent(component) : component;

        return (
          <ChildWrapper
            key={`fragment_${formInstance.step.index}_${componentLevel}_${modComponent.name}_${modComponent.component}_${i}`}
            component={modComponent}
            wrapper={Component}
            propsMapping={PropsMapping[modComponent.component]}
            formId={id}
            onMount={(data) => {
              onMount && onMount(formInstance.formData, modComponent, data);
            }}
            onRehydrate={(data) => {
              onRehydrate && onRehydrate(formInstance.formData, modComponent, data);
            }}
            onChange={(data) => {
              onData && onData(formInstance.formData, modComponent, data);
              formInstance.publish(EEVents.ON_FRAGMENT_FIELD_CHANGE, { component, field: data });
            }}
            onBlur={(data) => {
              onBlur && onBlur(formInstance.formData, modComponent, data);
            }}
            onFocus={(data) => {
              onFocus && onFocus(formInstance.formData, modComponent, data);
            }}
          >
            {Array.isArray(modComponent.children)
              ? generateComponentChildren(modComponent.children, componentLevel + 1)
              : modComponent}
          </ChildWrapper>
        );
      });
    };
    if (!Array.isArray(components)) return <>Fragment components must be array</>;
    return generateComponentChildren(components);
  }, []);

  if (!Children) return <p>No Children built</p>;

  return <>{Children}</>;
};

export { Fragment };
