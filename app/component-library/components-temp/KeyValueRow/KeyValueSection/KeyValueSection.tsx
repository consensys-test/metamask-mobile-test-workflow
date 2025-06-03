import React from 'react';
import { useTw } from '../../../hooks/useTwrncTheme';
import { View } from 'react-native';
import {
  KeyValueRowSectionAlignments,
  KeyValueSectionProps,
} from '../KeyValueRow.types';

/**
 * A container representing either the left or right side of the KeyValueRow.
 * For desired results, use only two <KeyValueSection> components within the <KeyValueRowRoot>.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The child components.
 * @param {KeyValueRowSectionAlignments} [props.align] - The alignment of the KeyValueSection. Defaults to KeyValueRowSectionAlignments.RIGHT
 *
 * @returns {JSX.Element} The rendered KeyValueSection component.
 */
const KeyValueSection = ({
  children,
  align = KeyValueRowSectionAlignments.LEFT,
}: KeyValueSectionProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getContainerStyles = () => {
    let alignClasses = '';

    switch (align) {
      case KeyValueRowSectionAlignments.RIGHT:
        alignClasses = 'items-end';
        break;
      case KeyValueRowSectionAlignments.CENTER:
        alignClasses = 'items-center';
        break;
      default:
        alignClasses = 'items-start';
    }

    const baseClasses = `flex-1 ${alignClasses}`;

    return tw`${baseClasses}`;
  };

  return <View style={getContainerStyles()}>{children}</View>;
};

export default KeyValueSection;
