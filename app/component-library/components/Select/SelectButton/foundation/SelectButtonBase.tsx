/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../hooks/useTwrncTheme';
import SelectValue from '../../SelectValue/SelectValue';

// Internal dependencies.
import { SelectButtonBaseProps } from './SelectButtonBase.types';

const SelectButtonBase: React.FC<SelectButtonBaseProps> = ({
  style,
  iconEl,
  iconProps,
  label,
  description,
  startAccessory,
  children,
  endAccessory,
  gap,
  verticalAlignment,
  caretIconEl,
  isDisabled,
  ...touchableOpacityProps
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getButtonStyles = () => {
    const baseClasses =
      'flex-row items-center justify-between p-4 bg-background-default border border-border-default rounded-lg';
    const disabledClasses = isDisabled ? 'opacity-50' : '';

    return [tw`${baseClasses} ${disabledClasses}`, style];
  };

  const getValueStyles = () => tw`flex-1`;

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      activeOpacity={1}
      {...touchableOpacityProps}
      disabled={isDisabled}
      accessibilityRole="button"
    >
      <SelectValue
        style={getValueStyles()}
        iconEl={iconEl}
        iconProps={iconProps}
        label={label}
        description={description}
        startAccessory={startAccessory}
        endAccessory={endAccessory}
        gap={gap}
        verticalAlignment={verticalAlignment}
      >
        {children}
      </SelectValue>
      <View>{caretIconEl}</View>
    </TouchableOpacity>
  );
};

export default SelectButtonBase;
