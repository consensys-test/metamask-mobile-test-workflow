/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useCallback, useState } from 'react';
import { TextInput } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import { DEFAULT_TEXT_VARIANT } from '../../../../Texts/Text/Text.constants';
import { TextVariant } from '../../../../Texts/Text/Text.types';

// Internal dependencies.
import { InputProps } from './Input.types';
import { INPUT_TEST_ID } from './Input.constants';

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      style,
      textVariant = DEFAULT_TEXT_VARIANT,
      isStateStylesDisabled,
      isDisabled = false,
      isReadonly = false,
      onBlur,
      onFocus,
      autoFocus = true,
      ...props
    },
    ref,
  ) => {
    const tw = useTw();
    const [isFocused, setIsFocused] = useState(autoFocus);

    // Modern styling with Tailwind utilities
    const getInputStyles = () => {
      const baseClasses = 'flex-1 p-0 m-0';
      const disabledClasses = isDisabled ? 'opacity-50' : '';

      let textSizeClasses = '';
      switch (textVariant) {
        case TextVariant.DisplayMD:
          textSizeClasses = 'text-5xl';
          break;
        case TextVariant.HeadingLG:
          textSizeClasses = 'text-3xl';
          break;
        case TextVariant.HeadingMD:
          textSizeClasses = 'text-xl';
          break;
        case TextVariant.HeadingSM:
          textSizeClasses = 'text-lg';
          break;
        case TextVariant.BodyLGMedium:
          textSizeClasses = 'text-base';
          break;
        case TextVariant.BodyMD:
          textSizeClasses = 'text-sm';
          break;
        case TextVariant.BodyMDMedium:
          textSizeClasses = 'text-sm';
          break;
        case TextVariant.BodySM:
          textSizeClasses = 'text-xs';
          break;
        case TextVariant.BodySMMedium:
          textSizeClasses = 'text-xs';
          break;
        case TextVariant.BodyXS:
          textSizeClasses = 'text-2xs';
          break;
        default:
          textSizeClasses = 'text-sm';
      }

      // Only apply state styles if not disabled
      const stateClasses =
        !isStateStylesDisabled && isFocused
          ? 'text-primary-default'
          : 'text-text-default';

      return [
        tw`${baseClasses} ${textSizeClasses} ${stateClasses} ${disabledClasses}`,
        style,
      ];
    };

    const onBlurHandler = useCallback(
      // TODO: Replace "any" with type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e: any) => {
        if (!isDisabled) {
          setIsFocused(false);
          onBlur?.(e);
        }
      },
      [isDisabled, setIsFocused, onBlur],
    );

    const onFocusHandler = useCallback(
      // TODO: Replace "any" with type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e: any) => {
        if (!isDisabled) {
          setIsFocused(true);
          onFocus?.(e);
        }
      },
      [isDisabled, setIsFocused, onFocus],
    );

    return (
      <TextInput
        testID={INPUT_TEST_ID}
        {...props}
        style={getInputStyles()}
        editable={!isDisabled && !isReadonly}
        autoFocus={autoFocus}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        ref={ref}
      />
    );
  },
);

export default Input;
