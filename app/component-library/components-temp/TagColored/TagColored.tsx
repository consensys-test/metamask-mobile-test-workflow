/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../hooks/useTwrncTheme';
import TextComponent from '../../../component-library/components/Texts/Text';

// Internal dependencies.
import { TagColoredProps, TagColor } from './TagColored.types';
import {
  DEFAULT_TAGCOLORED_COLOR,
  DEFAULT_TAGCOLORED_TEXTVARIANT,
  TAGCOLORED_TESTID,
  TAGCOLORED_TEXT_TESTID,
} from './TagColored.constants';

const TagColored: React.FC<TagColoredProps> = ({
  style,
  color = DEFAULT_TAGCOLORED_COLOR,
  children,
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    let colorClasses = '';

    switch (color) {
      case TagColor.Primary:
        colorClasses = 'bg-primary-muted border-primary-default';
        break;
      case TagColor.Info:
        colorClasses = 'bg-info-muted border-info-default';
        break;
      case TagColor.Warning:
        colorClasses = 'bg-warning-muted border-warning-default';
        break;
      case TagColor.Danger:
        colorClasses = 'bg-error-muted border-error-default';
        break;
      case TagColor.Success:
        colorClasses = 'bg-success-muted border-success-default';
        break;
      default:
        colorClasses = 'bg-background-alternative border-border-muted';
    }

    const baseClasses = `px-3 py-1 rounded-full border ${colorClasses}`;

    return [tw`${baseClasses}`, style];
  };

  const getTextStyles = () => {
    let textColorClass = '';

    switch (color) {
      case TagColor.Primary:
        textColorClass = 'text-primary-default';
        break;
      case TagColor.Info:
        textColorClass = 'text-info-default';
        break;
      case TagColor.Warning:
        textColorClass = 'text-warning-default';
        break;
      case TagColor.Danger:
        textColorClass = 'text-error-default';
        break;
      case TagColor.Success:
        textColorClass = 'text-success-default';
        break;
      default:
        textColorClass = 'text-text-default';
    }

    return tw`font-medium ${textColorClass}`;
  };

  return (
    <View style={getBaseStyles()} testID={TAGCOLORED_TESTID}>
      {typeof children === 'string' ? (
        <TextComponent
          variant={DEFAULT_TAGCOLORED_TEXTVARIANT}
          style={getTextStyles()}
          testID={TAGCOLORED_TEXT_TESTID}
        >
          {children}
        </TextComponent>
      ) : (
        children
      )}
    </View>
  );
};

export default TagColored;
