// Third library dependencies.
import React from 'react';

// External dependencies.
import BadgeBase from '../../foundation/BadgeBase';
import { useComponentSize } from '../../../../../hooks';
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import Icon, { IconSize, IconColor } from '../../../../Icons/Icon';

// Internal dependencies
import { BadgeNotificationsProps } from './BadgeNotifications.types';

const BadgeNotifications = ({
  style,
  iconName,
  testID,
}: BadgeNotificationsProps) => {
  const tw = useTw();
  const { size: containerSize, onLayout: onLayoutContainerSize } =
    useComponentSize();

  // Modern styling with Tailwind utilities
  const getBadgeStyles = () => {
    const baseClasses =
      'bg-error-default rounded-full min-w-4 min-h-4 items-center justify-center';
    const scaledClasses = containerSize ? 'transform scale-75' : '';

    return [tw`${baseClasses} ${scaledClasses}`, style];
  };

  return (
    <BadgeBase
      style={getBadgeStyles()}
      testID={testID}
      onLayout={onLayoutContainerSize}
    >
      <Icon name={iconName} size={IconSize.Xss} color={IconColor.Inverse} />
    </BadgeBase>
  );
};

export default BadgeNotifications;
