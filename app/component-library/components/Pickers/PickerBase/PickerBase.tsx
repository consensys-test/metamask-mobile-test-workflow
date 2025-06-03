/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import Icon, { IconName, IconSize } from '../../Icons/Icon';

// Internal dependencies.
import { PickerBaseProps } from './PickerBase.types';

const PickerBase: React.ForwardRefRenderFunction<View, PickerBaseProps> = (
  { iconSize = IconSize.Md, style, dropdownIconStyle, children, ...props },
  ref,
) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getPickerStyles = () => {
    const baseClasses =
      'flex-row items-center justify-between p-4 bg-background-default border border-border-default rounded-lg';

    return [tw`${baseClasses}`, style];
  };

  const getDropdownIconStyles = () => [tw`ml-2`, dropdownIconStyle];

  return (
    <TouchableOpacity style={getPickerStyles()} {...props} ref={ref}>
      {children}
      <Icon
        size={iconSize}
        color={tw.color('icon-default')}
        name={IconName.ArrowDown}
        style={getDropdownIconStyles()}
      />
    </TouchableOpacity>
  );
};

export default forwardRef(PickerBase);
