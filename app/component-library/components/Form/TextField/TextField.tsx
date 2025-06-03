/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import Input from './foundation/Input';

// Internal dependencies.
import { TextFieldProps, TextFieldSize } from './TextField.types';
import {
  DEFAULT_TEXTFIELD_SIZE,
  TOKEN_TEXTFIELD_INPUT_TEXT_VARIANT,
  TEXTFIELD_TEST_ID,
  TEXTFIELD_STARTACCESSORY_TEST_ID,
  TEXTFIELD_ENDACCESSORY_TEST_ID,
} from './TextField.constants';

const TextField = React.forwardRef<TextInput, TextFieldProps>(
  (
    {
      style,
      size = DEFAULT_TEXTFIELD_SIZE,
      startAccessory,
      endAccessory,
      isError = false,
      inputElement,
      isDisabled = false,
      autoFocus = false,
      onBlur,
      onFocus,
      testID,
      ...props
    },
    ref,
  ) => {
    const tw = useTw();
    const [isFocused, setIsFocused] = useState(autoFocus);

    // Modern styling with Tailwind utilities
    const getTextFieldStyles = () => {
      const baseClasses = 'flex-row items-center border rounded-lg px-3';
      const errorClasses = isError
        ? 'border-error-default'
        : 'border-border-default';
      const focusClasses = isFocused ? 'border-primary-default' : '';
      const disabledClasses = isDisabled
        ? 'opacity-50 bg-background-alternative'
        : 'bg-background-default';

      let sizeClasses = '';
      switch (size) {
        case TextFieldSize.SM:
          sizeClasses = 'h-8';
          break;
        case TextFieldSize.MD:
          sizeClasses = 'h-10';
          break;
        case TextFieldSize.LG:
          sizeClasses = 'h-12';
          break;
        default:
          sizeClasses = 'h-10';
      }

      return [
        tw`${baseClasses} ${sizeClasses} ${errorClasses} ${focusClasses} ${disabledClasses}`,
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
      <View style={getTextFieldStyles()} testID={TEXTFIELD_TEST_ID}>
        {startAccessory && (
          <View style={tw`mr-2`} testID={TEXTFIELD_STARTACCESSORY_TEST_ID}>
            {startAccessory}
          </View>
        )}
        <View style={tw`flex-1`}>
          {inputElement ?? (
            <Input
              textVariant={TOKEN_TEXTFIELD_INPUT_TEXT_VARIANT}
              isDisabled={isDisabled}
              autoFocus={autoFocus}
              onBlur={onBlurHandler}
              onFocus={onFocusHandler}
              testID={testID}
              {...props}
              ref={ref}
              isStateStylesDisabled
            />
          )}
        </View>
        {endAccessory && (
          <View style={tw`ml-2`} testID={TEXTFIELD_ENDACCESSORY_TEST_ID}>
            {endAccessory}
          </View>
        )}
      </View>
    );
  },
);

export default TextField;
