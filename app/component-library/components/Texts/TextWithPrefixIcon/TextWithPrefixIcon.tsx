/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import Icon from '../../Icons/Icon';
import Text from '../Text/Text';

// Internal dependencies.
import { TextWithPrefixIconProps } from './TextWithPrefixIcon.types';
import {
  DEFAULT_TEXTWITHPREFIXICON_COLOR,
  TEXT_WITH_PREFIX_ICON_TEST_ID,
  TEXT_WITH_PREFIX_ICON_ICON_TEST_ID,
  TEXT_WITH_PREFIX_ICON_TEXT_TEST_ID,
} from './TextWithPrefixIcon.constants';

const TextWithPrefixIcon: React.FC<TextWithPrefixIconProps> = ({
  iconProps,
  style,
  children,
  color = DEFAULT_TEXTWITHPREFIXICON_COLOR,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getContainerStyles = () => {
    const baseClasses = 'flex-row items-center';

    return [tw`${baseClasses}`, style];
  };

  const getIconColor = () =>
    color === DEFAULT_TEXTWITHPREFIXICON_COLOR
      ? tw.color('text-default')
      : color;

  return (
    <View style={getContainerStyles()} testID={TEXT_WITH_PREFIX_ICON_TEST_ID}>
      <Icon
        color={getIconColor()}
        testID={TEXT_WITH_PREFIX_ICON_ICON_TEST_ID}
        {...iconProps}
      />
      <Text
        testID={TEXT_WITH_PREFIX_ICON_TEXT_TEST_ID}
        color={color}
        style={tw`ml-2`}
        {...props}
      >
        {children}
      </Text>
    </View>
  );
};

export default TextWithPrefixIcon;
