// Third party dependencies.
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// External dependencies.
import { useTw } from '../../hooks/useTwrncTheme';

// Internal dependencies.
import { LoaderProps } from './Loader.types';

const Loader = ({ size = 'large', color }: LoaderProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => tw`flex-1 items-center justify-center p-4`;

  const getIndicatorColor = () => color || tw.color('primary-default');

  return (
    <View style={getBaseStyles()}>
      <ActivityIndicator size={size} color={getIndicatorColor()} />
    </View>
  );
};

export default Loader;
