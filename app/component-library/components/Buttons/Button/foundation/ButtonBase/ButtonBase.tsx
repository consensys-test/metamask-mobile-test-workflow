/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity } from 'react-native';

// External dependencies.
import Text from '../../../../Texts/Text';
import Icon from '../../../../Icons/Icon';
import { useTw } from '../../../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { ButtonBaseProps } from './ButtonBase.types';
import {
  DEFAULT_BUTTONBASE_LABEL_COLOR,
  DEFAULT_BUTTONBASE_SIZE,
  DEFAULT_BUTTONBASE_WIDTH,
  DEFAULT_BUTTONBASE_ICON_SIZE,
  DEFAULT_BUTTONBASE_LABEL_TEXTVARIANT,
} from './ButtonBase.constants';
import { ButtonSize, ButtonWidthTypes } from '../../Button.types';

const ButtonBase = ({
  label,
  labelColor = DEFAULT_BUTTONBASE_LABEL_COLOR,
  labelTextVariant = DEFAULT_BUTTONBASE_LABEL_TEXTVARIANT,
  startIconName,
  endIconName,
  size = DEFAULT_BUTTONBASE_SIZE,
  onPress,
  style,
  width = DEFAULT_BUTTONBASE_WIDTH,
  isDisabled,
  ...props
}: ButtonBaseProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getButtonStyles = () => {
    const baseClasses = 'flex-row items-center justify-center rounded-xl px-4';
    const disabledClasses = isDisabled ? 'opacity-50' : '';

    // Size-based styling
    let sizeClasses = '';
    if (size !== ButtonSize.Auto) {
      sizeClasses = `h-[${size}px]`;
    }

    // Width-based styling
    let widthClasses = '';
    switch (width) {
      case ButtonWidthTypes.Auto:
        widthClasses = 'self-start';
        break;
      case ButtonWidthTypes.Full:
        widthClasses = 'self-stretch';
        break;
      default:
        widthClasses = `w-[${width}px]`;
    }

    return [
      tw`${baseClasses} ${sizeClasses} ${widthClasses} ${disabledClasses}`,
      style,
    ];
  };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={1}
      onPress={onPress}
      style={getButtonStyles()}
      accessibilityRole="button"
      accessible
      {...props}
    >
      {startIconName && (
        <Icon
          color={labelColor.toString()}
          name={startIconName}
          size={DEFAULT_BUTTONBASE_ICON_SIZE}
          style={tw`mr-2`}
        />
      )}
      {typeof label === 'string' ? (
        <Text
          variant={labelTextVariant}
          style={tw`text-text-default`}
          accessibilityRole="none"
        >
          {label}
        </Text>
      ) : (
        label
      )}
      {endIconName && (
        <Icon
          color={labelColor.toString()}
          name={endIconName}
          size={DEFAULT_BUTTONBASE_ICON_SIZE}
          style={tw`ml-2`}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonBase;
