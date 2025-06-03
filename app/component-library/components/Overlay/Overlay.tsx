/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// External dependencies.
import { useTw } from '../../../hooks/useTwrncTheme';

// Internal dependencies.
import { OverlayProps } from './Overlay.types';
import { DEFAULT_OVERLAY_ANIMATION_DURATION } from './Overlay.constants';

const Overlay: React.FC<OverlayProps> = ({ style, onPress, color }) => {
  const tw = useTw();
  const opacityVal = useSharedValue(0);

  // Modern styling with Tailwind utilities
  const getOverlayStyles = () => {
    const baseClasses = 'absolute inset-0 bg-overlay-default';

    return [tw`${baseClasses}`, color ? { backgroundColor: color } : {}, style];
  };

  const getFillStyles = () => tw`absolute inset-0`;

  const animatedStyles = useAnimatedStyle(
    () => ({
      opacity: opacityVal.value,
    }),
    [opacityVal.value],
  );

  opacityVal.value = withTiming(1, {
    duration: DEFAULT_OVERLAY_ANIMATION_DURATION,
    easing: Easing.linear,
  });

  return (
    <Animated.View style={[getOverlayStyles(), animatedStyles]}>
      {onPress && (
        <TouchableOpacity onPress={onPress} style={getFillStyles()} />
      )}
    </Animated.View>
  );
};

export default Overlay;
