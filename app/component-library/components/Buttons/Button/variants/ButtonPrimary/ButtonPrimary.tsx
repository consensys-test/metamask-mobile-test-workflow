/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, GestureResponderEvent } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import Button from '../../foundation/ButtonBase';
import Text from '../../../../Texts/Text/Text';

// Internal dependencies.
import { ButtonPrimaryProps } from './ButtonPrimary.types';
import {
  DEFAULT_BUTTONPRIMARY_LABEL_TEXTVARIANT,
  DEFAULT_BUTTONPRIMARY_LABEL_COLOR,
} from './ButtonPrimary.constants';

const ButtonPrimary = ({
  style,
  onPressIn,
  onPressOut,
  isDanger = false,
  label,
  ...props
}: ButtonPrimaryProps) => {
  const tw = useTw();
  const [pressed, setPressed] = useState(false);

  // Modern styling with Tailwind utilities
  const getButtonStyles = () => {
    const baseClasses = 'bg-primary-default';
    const dangerClasses = isDanger ? 'bg-error-default' : '';
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

  const renderLabel = () =>
    typeof label === 'string' ? (
      <Text
        variant={DEFAULT_BUTTONPRIMARY_LABEL_TEXTVARIANT}
        color={DEFAULT_BUTTONPRIMARY_LABEL_COLOR}
      >
        {label}
      </Text>
    ) : (
      label
    );

  const renderLoading = () => (
    <ActivityIndicator size="small" color={DEFAULT_BUTTONPRIMARY_LABEL_COLOR} />
  );

  return (
    <Button
      style={getButtonStyles()}
      label={!props.loading ? renderLabel() : renderLoading()}
      labelColor={DEFAULT_BUTTONPRIMARY_LABEL_COLOR}
      onPressIn={triggerOnPressedIn}
      onPressOut={triggerOnPressedOut}
      {...props}
    />
  );
};

export default ButtonPrimary;
