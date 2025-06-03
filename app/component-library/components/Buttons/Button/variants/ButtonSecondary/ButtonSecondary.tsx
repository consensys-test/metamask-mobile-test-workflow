/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, GestureResponderEvent } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import Button from '../../foundation/ButtonBase';
import Text from '../../../../Texts/Text/Text';

// Internal dependencies.
import { ButtonSecondaryProps } from './ButtonSecondary.types';
import {
  DEFAULT_BUTTONSECONDARY_LABEL_TEXTVARIANT,
  DEFAULT_BUTTONSECONDARY_LABEL_COLOR,
  DEFAULT_BUTTONSECONDARY_LABEL_COLOR_PRESSED,
  DEFAULT_BUTTONSECONDARY_LABEL_COLOR_ERROR,
  DEFAULT_BUTTONSECONDARY_LABEL_COLOR_ERROR_PRESSED,
} from './ButtonSecondary.constants';

const ButtonSecondary = ({
  style,
  onPressIn,
  onPressOut,
  isDanger = false,
  label,
  ...props
}: ButtonSecondaryProps) => {
  const tw = useTw();
  const [pressed, setPressed] = useState(false);

  // Modern styling with Tailwind utilities
  const getButtonStyles = () => {
    const baseClasses = 'border border-primary-default bg-transparent';
    const dangerClasses = isDanger ? 'border-error-default' : '';
    const pressedClasses = pressed ? 'opacity-80' : '';

    return [tw`${baseClasses} ${dangerClasses} ${pressedClasses}`, style];
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

  const getLabelColor = () =>
    isDanger
      ? pressed
        ? DEFAULT_BUTTONSECONDARY_LABEL_COLOR_ERROR_PRESSED
        : DEFAULT_BUTTONSECONDARY_LABEL_COLOR_ERROR
      : pressed
      ? DEFAULT_BUTTONSECONDARY_LABEL_COLOR_PRESSED
      : DEFAULT_BUTTONSECONDARY_LABEL_COLOR;

  const renderLabel = () =>
    typeof label === 'string' ? (
      <Text
        variant={DEFAULT_BUTTONSECONDARY_LABEL_TEXTVARIANT}
        color={getLabelColor()}
      >
        {label}
      </Text>
    ) : (
      label
    );

  const renderLoading = () => (
    <ActivityIndicator
      size="small"
      color={DEFAULT_BUTTONSECONDARY_LABEL_TEXTVARIANT}
    />
  );

  return (
    <Button
      style={getButtonStyles()}
      label={!props.loading ? renderLabel() : renderLoading()}
      labelColor={getLabelColor()}
      onPressIn={triggerOnPressedIn}
      onPressOut={triggerOnPressedOut}
      {...props}
    />
  );
};

export default ButtonSecondary;
