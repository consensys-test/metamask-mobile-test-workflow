/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// External dependencies.
import { useComponentSize } from '../../hooks';
import { useTw } from '../../../hooks/useTwrncTheme';
import Text from '../Texts/Text';

// Internal dependencies.
import { HeaderBaseProps } from './HeaderBase.types';
import {
  DEFAULT_HEADERBASE_TITLE_TEXTVARIANT,
  HEADERBASE_TEST_ID,
  HEADERBASE_TITLE_TEST_ID,
} from './HeaderBase.constants';

const HeaderBase: React.FC<HeaderBaseProps> = ({
  style,
  children,
  startAccessory,
  endAccessory,
  includesTopInset = false,
}) => {
  const tw = useTw();
  const { size: startAccessorySize, onLayout: startAccessoryOnLayout } =
    useComponentSize();
  const { size: endAccessorySize, onLayout: endAccessoryOnLayout } =
    useComponentSize();
  const insets = useSafeAreaInsets();

  // Modern styling with Tailwind utilities
  const getHeaderStyles = () => {
    const baseClasses =
      'flex-row items-center justify-between px-4 py-3 bg-background-default';

    return [
      tw`${baseClasses}`,
      includesTopInset && { marginTop: insets.top },
      style,
    ];
  };

  const getAccessoryWrapperStyles = () => tw`w-16 items-center`;

  const getTitleWrapperStyles = () => {
    const flexClasses = 'flex-1 items-center mx-4';

    return tw`${flexClasses}`;
  };

  const getTitleStyles = () => tw`text-center font-medium text-text-default`;

  return (
    <View style={getHeaderStyles()} testID={HEADERBASE_TEST_ID}>
      <View style={getAccessoryWrapperStyles()}>
        <View onLayout={startAccessoryOnLayout}>{startAccessory}</View>
      </View>
      <View style={getTitleWrapperStyles()}>
        {typeof children === 'string' ? (
          <Text
            variant={DEFAULT_HEADERBASE_TITLE_TEXTVARIANT}
            style={getTitleStyles()}
            testID={HEADERBASE_TITLE_TEST_ID}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      <View style={getAccessoryWrapperStyles()}>
        <View onLayout={endAccessoryOnLayout}>{endAccessory}</View>
      </View>
    </View>
  );
};

export default HeaderBase;
