/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';

// External dependencies.
import { useComponentSize } from '../../hooks';
import { useTw } from '../../../hooks/useTwrncTheme';
import Text from '../../components/Texts/Text';
import ListItem from '../../components/List/ListItem';

// Internal dependencies.
import { TagBaseProps, TagSeverity, TagShape } from './TagBase.types';
import {
  DEFAULT_TAGBASE_SHAPE,
  DEFAULT_TAGBASE_GAP,
  TAGBASE_TESTID,
  TAGBASE_TEXT_TESTID,
} from './TagBase.constants';

const TagBase: React.FC<TagBaseProps> = ({
  style,
  startAccessory,
  children,
  textProps,
  endAccessory,
  shape = DEFAULT_TAGBASE_SHAPE,
  severity,
  includesBorder = false,
  gap = DEFAULT_TAGBASE_GAP,
  ...props
}) => {
  const tw = useTw();
  const { size: containerSize, onLayout: onLayoutContainerSize } =
    useComponentSize();

  // Modern styling with Tailwind utilities
  const getTagStyles = () => {
    const baseClasses = 'self-start px-2 py-0.5';
    let severityClasses = '';
    let shapeClasses = '';

    // Apply severity-based styling
    switch (severity) {
      case TagSeverity.Success:
        severityClasses =
          'bg-success-muted text-success-default border-success-default';
        break;
      case TagSeverity.Info:
        severityClasses = 'bg-info-muted text-info-default border-info-default';
        break;
      case TagSeverity.Danger:
        severityClasses =
          'bg-error-muted text-error-default border-error-default';
        break;
      case TagSeverity.Warning:
        severityClasses =
          'bg-warning-muted text-warning-default border-warning-default';
        break;
      case TagSeverity.Neutral:
        severityClasses =
          'bg-background-alternative text-text-alternative border-border-default';
        break;
      default:
        severityClasses =
          'bg-background-default text-text-default border-border-default';
    }

    // Apply shape-based styling
    if (shape === TagShape.Pill) {
      shapeClasses = 'rounded-full';
    } else {
      shapeClasses = 'rounded';
    }

    const borderClasses = includesBorder ? 'border' : '';

    return [
      tw`${baseClasses} ${severityClasses} ${shapeClasses} ${borderClasses}`,
      style,
    ];
  };

  return (
    <ListItem
      style={getTagStyles()}
      gap={gap}
      onLayout={onLayoutContainerSize}
      testID={TAGBASE_TESTID}
      {...props}
    >
      {startAccessory}
      {typeof children === 'string' ? (
        <Text testID={TAGBASE_TEXT_TESTID} {...textProps}>
          {children}
        </Text>
      ) : (
        children
      )}
      {endAccessory}
    </ListItem>
  );
};

export default TagBase;
