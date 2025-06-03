/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import ListItemSelect from '../../List/ListItemSelect/ListItemSelect';
import SelectValue from '../SelectValue/SelectValue';

// Internal dependencies.
import { SelectOptionProps } from './SelectOption.types';

const SelectOption: React.FC<SelectOptionProps> = ({
  style,
  isSelected,
  isDisabled,
  gap = 12,
  verticalAlignment,
  hitSlop,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getSelectOptionStyles = () => {
    const baseClasses = 'bg-background-default';

    return [tw`${baseClasses}`, style];
  };

  return (
    <ListItemSelect
      style={getSelectOptionStyles()}
      gap={gap}
      verticalAlignment={verticalAlignment}
      isSelected={isSelected}
      isDisabled={isDisabled}
      accessibilityRole="menuitem"
    >
      <SelectValue {...props} />
    </ListItemSelect>
  );
};

export default SelectOption;
