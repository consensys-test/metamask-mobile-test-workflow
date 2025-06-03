// Third party dependencies.
import React, { useCallback, useState } from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

// External dependencies.
import { useTw } from '../../../hooks/useTwrncTheme';

/**
 * ButtonPill component props.
 */
export interface ButtonPillProps extends TouchableOpacityProps {
  /**
   * Optional param to disable the button.
   */
  isDisabled?: boolean;
}

const ButtonPill = ({
  onPress,
  onPressIn,
  onPressOut,
  style,
  isDisabled = false,
  children,
  ...props
}: ButtonPillProps) => {
  const tw = useTw();
  const [isPressed, setIsPressed] = useState(false);

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    let stateClasses = '';

    if (isDisabled) {
      stateClasses = 'opacity-50 bg-background-alternative';
    } else if (isPressed) {
      stateClasses = 'opacity-80 bg-primary-muted';
    } else {
      stateClasses = 'bg-primary-default';
    }

    const baseClasses = `px-4 py-2 rounded-full items-center justify-center ${stateClasses}`;

    return [tw`${baseClasses}`, style];
  };

  const triggerOnPressedIn = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(true);
      onPressIn?.(e);
    },
    [setIsPressed, onPressIn],
  );

  const triggerOnPressedOut = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(false);
      onPressOut?.(e);
    },
    [setIsPressed, onPressOut],
  );

  return (
    <TouchableOpacity
      style={getBaseStyles()}
      onPress={!isDisabled ? onPress : undefined}
      onPressIn={!isDisabled ? triggerOnPressedIn : undefined}
      onPressOut={!isDisabled ? triggerOnPressedOut : undefined}
      accessible
      activeOpacity={1}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ButtonPill;
