/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';

// External dependencies.
import AvatarBase from '../../foundation/AvatarBase';
import Icon from '../../../../Icons/Icon';
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import { ICONSIZE_BY_AVATARSIZE } from '../../Avatar.constants';

// Internal dependencies.
import { AvatarIconProps } from './AvatarIcon.types';
import { DEFAULT_AVATARICON_SIZE } from './AvatarIcon.constants';

const AvatarIcon = ({
  size = DEFAULT_AVATARICON_SIZE,
  name,
  style,
  iconColor: iconColorProp,
  backgroundColor,
  ...props
}: AvatarIconProps) => {
  const tw = useTw();
  const iconSize = ICONSIZE_BY_AVATARSIZE[size];

  // Modern styling with Tailwind utilities
  const getAvatarStyles = () => {
    let backgroundClasses = '';

    if (backgroundColor) {
      // Use provided background color
      backgroundClasses = '';
    } else {
      // Default background styling
      backgroundClasses = 'bg-background-alternative';
    }

    const baseStyle = [
      tw`${backgroundClasses}`,
      backgroundColor ? { backgroundColor } : {},
      style,
    ];

    return baseStyle;
  };

  const iconColor = iconColorProp || tw.color('icon-default');

  return (
    <AvatarBase size={size} style={getAvatarStyles()} {...props}>
      <Icon name={name} size={iconSize} color={iconColor} />
    </AvatarBase>
  );
};

export default AvatarIcon;
