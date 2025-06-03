/* eslint-disable react/prop-types */
// Third library dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useComponentSize } from '../../../hooks';
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies
import { BadgeWrapperProps, BadgePosition } from './BadgeWrapper.types';
import {
  DEFAULT_BADGEWRAPPER_BADGEANCHORELEMENTSHAPE,
  DEFAULT_BADGEWRAPPER_BADGEPOSITION,
  BADGE_WRAPPER_BADGE_TEST_ID,
} from './BadgeWrapper.constants';

const BadgeWrapper: React.FC<BadgeWrapperProps> = ({
  anchorElementShape = DEFAULT_BADGEWRAPPER_BADGEANCHORELEMENTSHAPE,
  badgePosition = DEFAULT_BADGEWRAPPER_BADGEPOSITION,
  children,
  badgeElement,
  style,
}) => {
  const tw = useTw();
  const { onLayout: onLayoutContainerSize } = useComponentSize();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    const baseClasses = 'relative';

    return [tw`${baseClasses}`, style];
  };

  const getBadgeStyles = () => {
    let positionClasses = '';

    switch (badgePosition) {
      case BadgePosition.TopRight:
        positionClasses = 'absolute -top-1 -right-1';
        break;
      case BadgePosition.TopLeft:
        positionClasses = 'absolute -top-1 -left-1';
        break;
      case BadgePosition.BottomRight:
        positionClasses = 'absolute -bottom-1 -right-1';
        break;
      case BadgePosition.BottomLeft:
        positionClasses = 'absolute -bottom-1 -left-1';
        break;
      default:
        positionClasses = 'absolute -top-1 -right-1';
    }

    return tw`${positionClasses} z-10`;
  };

  return (
    <View
      style={getBaseStyles()}
      onLayout={onLayoutContainerSize}
      testID={BADGE_WRAPPER_BADGE_TEST_ID}
    >
      <View>{children}</View>
      <View style={getBadgeStyles()}>{badgeElement}</View>
    </View>
  );
};

export default BadgeWrapper;
