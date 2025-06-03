/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { SkeletonProps } from './Skeleton.types';

const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width,
  children,
  hideChildren = false,
  style,
  childrenWrapperProps = {},
  animatedViewProps = {},
  ...props
}) => {
  const tw = useTw();
  const opacityAnim = useRef(new Animated.Value(0.2)).current;

  // Modern styling with Tailwind utilities
  const getSkeletonStyles = () => {
    const baseClasses = 'relative bg-background-alternative rounded-md';

    return [tw`${baseClasses}`, { height, width }, style];
  };

  const getBackgroundStyles = () =>
    tw`absolute inset-0 bg-text-muted rounded-md`;

  const getChildrenContainerStyles = () => tw`relative z-10`;

  const getHideChildrenStyles = () => tw`opacity-0`;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0.1,
        duration: 700,
        useNativeDriver: true,
        isInteraction: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.2,
        duration: 700,
        useNativeDriver: true,
        isInteraction: false,
      }),
    ]).start((finished) => {
      if (finished) {
        startAnimation();
      }
    });
  };

  useEffect(() => {
    // Only start animation if no children are present or if children should be hidden
    if (!children || hideChildren) {
      startAnimation();
    }

    return () => {
      // Cleanup animation when component unmounts
      opacityAnim.stopAnimation();
    };
  }, [children, hideChildren]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={getSkeletonStyles()} {...props}>
      {/* Animated background always present */}
      <Animated.View
        style={[getBackgroundStyles(), { opacity: opacityAnim }]}
        pointerEvents="none"
        {...animatedViewProps}
      />

      {children && (
        <View
          style={[
            getChildrenContainerStyles(),
            hideChildren ? getHideChildrenStyles() : undefined,
          ]}
          {...childrenWrapperProps}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default Skeleton;
