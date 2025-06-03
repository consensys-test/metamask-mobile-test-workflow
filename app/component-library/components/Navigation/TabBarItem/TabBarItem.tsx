/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies
import { TabBarItemProps } from './TabBarItem.types';
import Avatar, { AvatarVariant } from '../../Avatars/Avatar';

const TabBarItem = ({
  style,
  icon,
  iconSize,
  iconColor,
  iconBackgroundColor,
  ...props
}: TabBarItemProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getTabBarItemStyles = () => {
    const baseClasses = 'items-center justify-center p-2';

    return [tw`${baseClasses}`, style];
  };

  return (
    <TouchableOpacity {...props} style={getTabBarItemStyles()}>
      <Avatar
        variant={AvatarVariant.Icon}
        name={icon}
        size={iconSize}
        backgroundColor={iconBackgroundColor}
        iconColor={iconColor}
      />
    </TouchableOpacity>
  );
};

export default TabBarItem;
