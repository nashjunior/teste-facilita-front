import React from 'react';

interface IProps {
  name: string;
  children: React.ReactNode;
}

export const Fieldset: React.FC<IProps> = ({ children, name }) => {
  return (
    <fieldset style={{ border: 'none' }}>
      <legend>{name}</legend>
      {children}
    </fieldset>
  );
};
