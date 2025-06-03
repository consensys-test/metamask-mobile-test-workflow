/* eslint-disable react/prop-types */

// Third library dependencies.
import React from 'react';

// External dependencies.
import { useComponentSize } from '../../../../../hooks';
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import BadgeBase from '../../foundation/BadgeBase';
import Avatar, { AvatarVariant } from '../../../../Avatars/Avatar';

// Internal dependencies
import { BadgeNetworkProps } from './BadgeNetwork.types';
import {
  BADGENETWORK_TEST_ID,
  DEFAULT_BADGENETWORK_NETWORKICON_SIZE,
} from './BadgeNetwork.constants';

const BadgeNetwork = ({
  style,
  name,
  imageSource,
  size = DEFAULT_BADGENETWORK_NETWORKICON_SIZE,
  isScaled = true,
}: BadgeNetworkProps) => {
  const tw = useTw();
  const { size: containerSize, onLayout: onLayoutContainerSize } =
    useComponentSize();

  // Modern styling with Tailwind utilities
  const getBadgeStyles = () => {
    const baseClasses = 'relative';
    const scaledClasses = isScaled && containerSize ? 'transform scale-75' : '';

    return [tw`${baseClasses} ${scaledClasses}`, style];
  };

  const getNetworkIconStyles = () => tw``;

  return (
    <BadgeBase
      style={getBadgeStyles()}
      testID={BADGENETWORK_TEST_ID}
      onLayout={onLayoutContainerSize}
    >
      <Avatar
        variant={AvatarVariant.Network}
        size={size}
        name={name}
        imageSource={imageSource}
        style={getNetworkIconStyles()}
      />
    </BadgeBase>
  );
};

export default BadgeNetwork;
