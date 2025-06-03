/* eslint-disable react/prop-types */
// Third library dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';

// Internal dependencies
import { BADGE_BASE_TEST_ID } from './BadgeBase.constants';
import { BadgeBaseProps } from './BadgeBase.types';

const BadgeBase: React.FC<BadgeBaseProps> = ({ children, style, ...props }) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBadgeStyles = () => {
    const baseClasses =
      'items-center justify-center rounded-full px-2 py-1 min-w-[16px] min-h-[16px]';

    return [tw`${baseClasses}`, style];
  };

  return (
    <View style={getBadgeStyles()} testID={BADGE_BASE_TEST_ID} {...props}>
      {children}
    </View>
  );
};

export default BadgeBase;
