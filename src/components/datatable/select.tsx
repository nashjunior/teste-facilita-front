import React from 'react';
import { Select as SelectChakra, type SelectProps } from '@chakra-ui/react';

interface IOption {
  value: number | string;
  label: string;
}

interface ISelectProps extends SelectProps {
  optionsSelect: IOption[];
  defaultValue?: number | string;
}

const Select: React.FC<ISelectProps> = ({
  optionsSelect,
  onChange,
  defaultValue,
}) => {
  return (
    <SelectChakra onChange={onChange} defaultValue={defaultValue}>
      {optionsSelect.map((currentOption) => {
        return (
          <option value={currentOption.value} key={currentOption.value}>
            {currentOption.label}
          </option>
        );
      })}
    </SelectChakra>
  );
};

export default Select;
