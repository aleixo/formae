import React, { ReactElement } from 'react';
import * as S from './ComponentsPanel.styles';

type TComponentItem = { label: string };

interface Props {
  components: Record<string, TComponentItem>;
  onComponentClick(component: string): void;
}

const ComponentsPanel = ({ components, onComponentClick }: Props): ReactElement => {
  return (
    <S.Container>
      {Object.keys(components).map((key) => (
        <S.Row onClick={() => onComponentClick(key)}>{components[key].label}</S.Row>
      ))}
    </S.Container>
  );
};

export { ComponentsPanel };
