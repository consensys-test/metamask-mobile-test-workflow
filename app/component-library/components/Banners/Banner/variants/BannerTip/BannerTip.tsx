/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { Image, View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import BannerBase from '../../foundation/BannerBase';

// Internal dependencies.
import { BannerTipProps } from './BannerTip.types';
import {
  DEFAULT_BANNERTIP_LOGOTYPE,
  IMAGESOURCE_BY_BANNERTIPLOGOTYPE,
  BANNERTIP_TEST_ID,
} from './BannerTip.constants';

const BannerTip: React.FC<BannerTipProps> = ({
  style,
  logoType = DEFAULT_BANNERTIP_LOGOTYPE,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBannerStyles = () => {
    const baseClasses = 'bg-primary-muted border-primary-default';

    return [tw`${baseClasses}`, style];
  };

  const getLogoContainerStyles = () => tw`w-8 h-8 items-center justify-center`;

  const getLogoStyles = () => tw`w-6 h-6`;

  const foxLogo = (
    <View style={getLogoContainerStyles()}>
      <Image
        source={IMAGESOURCE_BY_BANNERTIPLOGOTYPE[logoType]}
        style={getLogoStyles()}
        resizeMode={'contain'}
      />
    </View>
  );

  return (
    <BannerBase
      style={getBannerStyles()}
      startAccessory={foxLogo}
      testID={BANNERTIP_TEST_ID}
      {...props}
    />
  );
};

export default BannerTip;
