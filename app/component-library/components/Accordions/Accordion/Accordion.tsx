/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useState } from 'react';
import Animated from 'react-native-reanimated';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import AccordionHeader from './foundation/AccordionHeader';

// Internal dependencies.
import { AccordionProps } from './Accordion.types';
import {
  TESTID_ACCORDION,
  TESTID_ACCORDION_CONTENT,
  // DEFAULT_ACCORDION_EXPANDDURATION,
} from './Accordion.constants';

const Accordion: React.FC<AccordionProps> = ({
  style,
  children,
  isExpanded = false,
  title,
  onPress,
  ...props
}) => {
  const tw = useTw();
  const [expanded, setExpanded] = useState(isExpanded);

  // Modern styling with Tailwind utilities
  const getAccordionStyles = () => {
    const baseClasses = 'bg-background-default rounded-lg';

    return [tw`${baseClasses}`, style];
  };

  // const ref = useRef<TransitioningView>(null);
  // const transition = (
  //   <Transition.Together>
  //     <Transition.In
  //       type="fade"
  //       durationMs={DEFAULT_ACCORDION_EXPANDDURATION}
  //     />
  //     <Transition.Out
  //       type="fade"
  //       durationMs={DEFAULT_ACCORDION_EXPANDDURATION}
  //     />
  //   </Transition.Together>
  // );
  const onHeaderPressed = () => {
    // if (ref.current) {
    //   ref.current.animateNextTransition();
    // }
    setExpanded(!expanded);
    onPress?.();
  };

  return (
    <>
      <AccordionHeader
        title={title}
        isExpanded={expanded}
        onPress={onHeaderPressed}
        style={getAccordionStyles()}
        testID={TESTID_ACCORDION}
        {...props}
      />
      {expanded && (
        <Animated.View
          // TODO - Reintroduce layout animations to accordion
          testID={TESTID_ACCORDION_CONTENT}
        >
          {children}
        </Animated.View>
      )}
    </>
  );
};

export default Accordion;
