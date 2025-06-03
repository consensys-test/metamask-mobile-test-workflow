/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import Text, { TextVariant } from '../../Texts/Text';
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { TagProps } from './Tag.types';

const Tag = ({ label, style, ...props }: TagProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getTagStyles = () => {
    const baseClasses = 'bg-background-alternative px-2 py-1 rounded-full';

    return [tw`${baseClasses}`, style];
  };

  return (
    <View style={getTagStyles()} {...props}>
      <Text variant={TextVariant.BodyMD}>{label}</Text>
    </View>
  );
};

export default Tag;
