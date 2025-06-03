/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import Icon from '../../Icons/Icon/Icon';
import Avatar from '../../Avatars/Avatar/Avatar';

// Internal dependencies.
import { SelectButtonProps } from './SelectButton.types';
import SelectButtonBase from './foundation/SelectButtonBase';
import {
  DEFAULT_SELECTBUTTON_GAP,
  DEFAULT_SELECTBUTTON_VERTICALALIGNMENT,
  DEFAULT_SELECTBUTTON_SIZE,
  DEFAULT_SELECTBUTTON_CARETICON_ICONNAME,
  DEFAULT_SELECTBUTTON_CARETICON_ICONCOLOR,
  CARETICON_ICONSIZE_BY_SELECTBUTTONSIZE,
  STARTICON_ICONSIZE_BY_SELECTBUTTONSIZE,
  SELECTBUTTON_TESTID,
} from './SelectButton.constants';

const SelectButton: React.FC<SelectButtonProps> = ({
  style,
  size = DEFAULT_SELECTBUTTON_SIZE,
  gap = DEFAULT_SELECTBUTTON_GAP,
  verticalAlignment = DEFAULT_SELECTBUTTON_VERTICALALIGNMENT,
  isDisabled = false,
  isDanger = false,
  startAccessory,
  iconEl,
  iconProps,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getSelectButtonStyles = () => {
    const baseClasses = 'flex-row items-center';
    const disabledClasses = isDisabled ? 'opacity-50' : '';
    const dangerClasses = isDanger
      ? 'border-error-default'
      : 'border-border-default';

    return [tw`${baseClasses} ${disabledClasses} ${dangerClasses}`, style];
  };

  const renderStartAccessory = () => {
    let accessory;
    if (startAccessory) {
      accessory = startAccessory;
    } else if (iconEl) {
      accessory = React.cloneElement(iconEl, {
        size: STARTICON_ICONSIZE_BY_SELECTBUTTONSIZE[size],
      });
    } else if (iconProps) {
      accessory = (
        <Avatar
          size={STARTICON_ICONSIZE_BY_SELECTBUTTONSIZE[size]}
          {...iconProps}
        />
      );
    }
    return accessory;
  };

  return (
    <SelectButtonBase
      style={getSelectButtonStyles()}
      gap={gap}
      verticalAlignment={verticalAlignment}
      caretIconEl={
        <Icon
          name={DEFAULT_SELECTBUTTON_CARETICON_ICONNAME}
          color={DEFAULT_SELECTBUTTON_CARETICON_ICONCOLOR}
          size={CARETICON_ICONSIZE_BY_SELECTBUTTONSIZE[size]}
        />
      }
      disabled={isDisabled}
      startAccessory={renderStartAccessory()}
      testID={SELECTBUTTON_TESTID}
      {...props}
    />
  );
};

export default SelectButton;
