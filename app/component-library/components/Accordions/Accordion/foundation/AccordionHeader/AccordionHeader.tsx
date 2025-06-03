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
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import Icon, { IconSize, IconName } from '../../../../Icons/Icon';
import Text, { TextVariant } from '../../../../Texts/Text';
import { DEFAULT_ACCORDION_EXPANDDURATION } from '../../Accordion.constants';

// Internal dependencies.
import {
  AccordionHeaderProps,
  AccordionHeaderHorizontalAlignment,
} from './AccordionHeader.types';
import {
  TESTID_ACCORDIONHEADER,
  TESTID_ACCORDIONHEADER_TITLE,
  TESTID_ACCORDIONHEADER_ARROWICON,
  TESTID_ACCORDIONHEADER_ARROWICON_ANIMATION,
  DEFAULT_ACCORDIONHEADER_HORIZONTALALIGNMENT,
} from './AccordionHeader.constants';

const AccordionHeader = ({
  style,
  title,
  isExpanded = false,
  onPress,
  horizontalAlignment = DEFAULT_ACCORDIONHEADER_HORIZONTALALIGNMENT,
}: AccordionHeaderProps) => {
  const tw = useTw();
  const rotation = useSharedValue(isExpanded ? 180 : 0);

  // Modern styling with Tailwind utilities
  const getHeaderStyles = () => {
    const baseClasses = 'flex-row items-center p-4 bg-background-default';

    let alignmentClasses = '';
    switch (horizontalAlignment) {
      case AccordionHeaderHorizontalAlignment.Start:
        alignmentClasses = 'justify-start';
        break;
      case AccordionHeaderHorizontalAlignment.Center:
        alignmentClasses = 'justify-center';
        break;
      case AccordionHeaderHorizontalAlignment.End:
        alignmentClasses = 'justify-end';
        break;
      default:
        alignmentClasses = 'justify-between';
    }

    return [tw`${baseClasses} ${alignmentClasses}`, style];
  };

  const getTitleStyles = () => tw`flex-1 text-text-default font-medium`;

  const getArrowContainerStyles = () => tw`ml-3 items-center justify-center`;

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    }),
    [rotation.value],
  );

  const onHeaderPressed = () => {
    rotation.value = withTiming(rotation.value + 180, {
      duration: DEFAULT_ACCORDION_EXPANDDURATION,
      easing: Easing.linear,
    });
    onPress?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onHeaderPressed}
      style={getHeaderStyles()}
      testID={TESTID_ACCORDIONHEADER}
    >
      <Text
        variant={TextVariant.BodyMD}
        style={getTitleStyles()}
        testID={TESTID_ACCORDIONHEADER_TITLE}
      >
        {title}
      </Text>
      <Animated.View
        style={[getArrowContainerStyles(), animatedStyles]}
        testID={TESTID_ACCORDIONHEADER_ARROWICON_ANIMATION}
      >
        <Icon
          name={IconName.ArrowDown}
          size={IconSize.Sm}
          color={tw.color('text-default')}
          testID={TESTID_ACCORDIONHEADER_ARROWICON}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AccordionHeader;
