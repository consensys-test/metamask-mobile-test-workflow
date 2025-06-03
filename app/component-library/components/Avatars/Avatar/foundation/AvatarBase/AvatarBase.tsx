/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { AvatarBaseProps, AvatarSize } from './AvatarBase.types';
import { DEFAULT_AVATARBASE_SIZE } from './AvatarBase.constants';

const AvatarBase: React.FC<AvatarBaseProps> = ({
  size = DEFAULT_AVATARBASE_SIZE,
  style,
  children,
  includesBorder = false,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getAvatarStyles = () => {
    const baseClasses = 'overflow-hidden items-center justify-center';
    const borderClasses = includesBorder
      ? 'border-2 border-border-default'
      : '';

    let sizeClasses = '';
    let radiusClasses = '';

    switch (size) {
      case AvatarSize.Xs:
        sizeClasses = 'w-4 h-4';
        radiusClasses = 'rounded';
        break;
      case AvatarSize.Sm:
        sizeClasses = 'w-6 h-6';
        radiusClasses = 'rounded-lg';
        break;
      case AvatarSize.Md:
        sizeClasses = 'w-8 h-8';
        radiusClasses = 'rounded-lg';
        break;
      case AvatarSize.Lg:
        sizeClasses = 'w-10 h-10';
        radiusClasses = 'rounded-xl';
        break;
      case AvatarSize.Xl:
        sizeClasses = 'w-12 h-12';
        radiusClasses = 'rounded-xl';
        break;
      default:
        sizeClasses = 'w-8 h-8';
        radiusClasses = 'rounded-lg';
    }

    return [
      tw`${baseClasses} ${sizeClasses} ${radiusClasses} ${borderClasses}`,
      style,
    ];
  };

  return (
    <View style={getAvatarStyles()} {...props}>
      {children}
    </View>
  );
};

export default AvatarBase;
