/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { Text as RNText } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { TextProps, TextVariant, TextColor } from './Text.types';
import { DEFAULT_TEXT_COLOR, DEFAULT_TEXT_VARIANT } from './Text.constants';

const Text: React.FC<TextProps> = ({
  variant = DEFAULT_TEXT_VARIANT,
  color = DEFAULT_TEXT_COLOR,
  style,
  children,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getTextStyles = () => {
    let variantClasses = '';
    let colorClasses = '';

    // Apply variant-based styling
    switch (variant) {
      case TextVariant.DisplayMD:
        variantClasses = 'text-5xl font-medium leading-tight';
        break;
      case TextVariant.HeadingLG:
        variantClasses = 'text-3xl font-medium leading-tight';
        break;
      case TextVariant.HeadingMD:
        variantClasses = 'text-xl font-medium leading-tight';
        break;
      case TextVariant.HeadingSM:
        variantClasses = 'text-lg font-medium leading-tight';
        break;
      case TextVariant.BodyLGMedium:
        variantClasses = 'text-base font-medium leading-relaxed';
        break;
      case TextVariant.BodyMD:
        variantClasses = 'text-sm font-normal leading-relaxed';
        break;
      case TextVariant.BodyMDMedium:
        variantClasses = 'text-sm font-medium leading-relaxed';
        break;
      case TextVariant.BodySM:
        variantClasses = 'text-xs font-normal leading-normal';
        break;
      case TextVariant.BodySMMedium:
        variantClasses = 'text-xs font-medium leading-normal';
        break;
      case TextVariant.BodyXS:
        variantClasses = 'text-2xs font-normal leading-tight';
        break;
      default:
        variantClasses = 'text-sm font-normal leading-relaxed';
    }

    // Apply color-based styling
    switch (color) {
      case TextColor.Default:
        colorClasses = 'text-text-default';
        break;
      case TextColor.Alternative:
        colorClasses = 'text-text-alternative';
        break;
      case TextColor.Muted:
        colorClasses = 'text-text-muted';
        break;
      case TextColor.Primary:
        colorClasses = 'text-primary-default';
        break;
      case TextColor.Success:
        colorClasses = 'text-success-default';
        break;
      case TextColor.Error:
        colorClasses = 'text-error-default';
        break;
      case TextColor.Warning:
        colorClasses = 'text-warning-default';
        break;
      case TextColor.Info:
        colorClasses = 'text-info-default';
        break;
      case TextColor.Inverse:
        colorClasses = 'text-primary-inverse';
        break;
      default:
        colorClasses = 'text-text-default';
    }

    return [tw`${variantClasses} ${colorClasses}`, style];
  };

  return (
    <RNText accessibilityRole="text" {...props} style={getTextStyles()}>
      {children}
    </RNText>
  );
};

export default Text;
