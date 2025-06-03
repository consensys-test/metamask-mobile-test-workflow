/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// External dependencies.
import { useTw } from '../../../hooks/useTwrncTheme';
import Text from '../Texts/Text/Text';

// Internal dependencies.
import { RadioButtonProps } from './RadioButton.types';
import {
  RADIOBUTTON_ICON_TESTID,
  DEFAULT_RADIOBUTTON_LABEL_TEXTVARIANT,
  DEFAULT_RADIOBUTTON_LABEL_TEXTCOLOR,
} from './RadioButton.constants';

const RadioButton = ({
  style,
  label,
  isChecked = false,
  isDisabled = false,
  isReadOnly = false,
  isDanger = false,
  ...props
}: RadioButtonProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getContainerStyles = () => {
    const baseClasses = 'flex-row items-center';
    const disabledClasses = isDisabled ? 'opacity-50' : '';

    return [tw`${baseClasses} ${disabledClasses}`, style];
  };

  const getRadioButtonStyles = () => {
    const baseClasses =
      'w-5 h-5 rounded-full border-2 mr-3 items-center justify-center';
    const checkedClasses = isChecked
      ? 'border-primary-default'
      : 'border-border-default';
    const dangerClasses = isDanger ? 'border-error-default' : '';

    return tw`${baseClasses} ${checkedClasses} ${dangerClasses}`;
  };

  const getIconStyles = () => {
    const baseClasses = 'w-2 h-2 rounded-full';
    const colorClasses = isDanger ? 'bg-error-default' : 'bg-primary-default';

    return tw`${baseClasses} ${colorClasses}`;
  };

  const getLabelStyles = () => tw`flex-1`;

  return (
    <TouchableOpacity
      style={getContainerStyles()}
      {...props}
      disabled={isDisabled || isReadOnly}
    >
      <View style={getRadioButtonStyles()} accessibilityRole="radio">
        {isChecked && (
          <View style={getIconStyles()} testID={RADIOBUTTON_ICON_TESTID} />
        )}
      </View>
      {label && (
        <View style={getLabelStyles()}>
          {typeof label === 'string' ? (
            <Text
              variant={DEFAULT_RADIOBUTTON_LABEL_TEXTVARIANT}
              color={DEFAULT_RADIOBUTTON_LABEL_TEXTCOLOR}
            >
              {label}
            </Text>
          ) : (
            label
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RadioButton;
