import React from 'react';
import Input from '@bit/bolttech.components.ui.input';

const ErrorStateInput = ({ isErrored, ...otherProps }) => (
  <>
    <p>Is errored - {isErrored.toString()}</p>
    <Input {...otherProps} />
  </>
);

export { ErrorStateInput };
