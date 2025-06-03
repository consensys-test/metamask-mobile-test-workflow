/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';

// External dependencies.
import AvatarBase from '../../foundation/AvatarBase';
import Text from '../../../../Texts/Text';
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import { TEXTVARIANT_BY_AVATARSIZE } from '../../Avatar.constants';

// Internal dependencies.
import { AvatarNetworkProps } from './AvatarNetwork.types';
import {
  DEFAULT_AVATARNETWORK_SIZE,
  DEFAULT_AVATARNETWORK_ERROR_TEXT,
  AVATARNETWORK_IMAGE_TESTID,
} from './AvatarNetwork.constants';

const AvatarNetwork = ({
  size = DEFAULT_AVATARNETWORK_SIZE,
  style,
  name,
  imageSource,
  ...props
}: AvatarNetworkProps) => {
  const tw = useTw();
  const [showFallback, setShowFallback] = useState(!imageSource);
  const chainNameFirstLetter = name?.[0] ?? DEFAULT_AVATARNETWORK_ERROR_TEXT;

  // Modern styling with Tailwind utilities
  const getAvatarStyles = () => {
    const baseClasses = showFallback
      ? 'bg-background-alternative'
      : 'bg-transparent';

    return [tw`${baseClasses}`, style];
  };

  const getLabelStyles = () => tw`text-text-default text-center font-medium`;

  const getImageStyles = () => tw`w-full h-full`;

  const onError = useCallback(() => setShowFallback(true), [setShowFallback]);

  useEffect(() => {
    setShowFallback(!imageSource);
  }, [imageSource]);

  return (
    <AvatarBase size={size} style={getAvatarStyles()} {...props}>
      {showFallback ? (
        <Text
          style={getLabelStyles()}
          variant={TEXTVARIANT_BY_AVATARSIZE[size]}
        >
          {chainNameFirstLetter}
        </Text>
      ) : (
        <Image
          source={imageSource as ImageSourcePropType}
          style={getImageStyles()}
          onError={onError}
          testID={AVATARNETWORK_IMAGE_TESTID}
          resizeMode={'contain'}
        />
      )}
    </AvatarBase>
  );
};

export default AvatarNetwork;
