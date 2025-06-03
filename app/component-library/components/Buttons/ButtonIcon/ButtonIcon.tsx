/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useCallback, useState } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

// External dependencies.
import Icon from '../../Icons/Icon';
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { ButtonIconProps, ButtonIconSizes } from './ButtonIcon.types';
import {
  DEFAULT_BUTTONICON_SIZE,
  DEFAULT_BUTTONICON_ICONCOLOR,
  ICONSIZE_BY_BUTTONICONSIZE,
} from './ButtonIcon.constants';

const ButtonIcon = ({
  iconName,
  onPress,
  onPressIn,
  onPressOut,
  style,
  size = DEFAULT_BUTTONICON_SIZE,
  iconColor = DEFAULT_BUTTONICON_ICONCOLOR,
  isDisabled = false,
  ...props
}: ButtonIconProps) => {
  const tw = useTw();
  const [pressed, setPressed] = useState(false);

  // Modern styling with Tailwind utilities
  const getButtonStyles = () => {
    const baseClasses = 'items-center justify-center rounded-lg';
    const disabledClasses = isDisabled ? 'opacity-50' : '';
    const pressedClasses = pressed ? 'opacity-80' : '';

    let sizeClasses = '';
    switch (size) {
      case ButtonIconSizes.Sm:
        sizeClasses = 'w-8 h-8';
        break;
      case ButtonIconSizes.Md:
        sizeClasses = 'w-10 h-10';
        break;
      case ButtonIconSizes.Lg:
        sizeClasses = 'w-12 h-12';
        break;
      default:
        sizeClasses = 'w-10 h-10';
    }

    return [
      tw`${baseClasses} ${sizeClasses} ${disabledClasses} ${pressedClasses}`,
      style,
    ];
  };

  const triggerOnPressedIn = useCallback(
    (e: GestureResponderEvent) => {
      setPressed(true);
      onPressIn?.(e);
    },
    [setPressed, onPressIn],
  );

  const triggerOnPressedOut = useCallback(
    (e: GestureResponderEvent) => {
      setPressed(false);
      onPressOut?.(e);
    },
    [setPressed, onPressOut],
  );

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={!isDisabled ? onPress : undefined}
      onPressIn={!isDisabled ? triggerOnPressedIn : undefined}
      onPressOut={!isDisabled ? triggerOnPressedOut : undefined}
      accessible
      activeOpacity={1}
      disabled={isDisabled}
      {...props}
    >
      <Icon
        name={iconName}
        size={ICONSIZE_BY_BUTTONICONSIZE[size]}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
