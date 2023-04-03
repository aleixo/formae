import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { UI } from '.';

export default {
  title: 'UI',
};

export const Builder: Story = (): React.ReactElement => {
  return <UI />;
};
