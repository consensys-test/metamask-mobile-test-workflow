import { useTw } from '../../../hooks/useTwrncTheme';
import React from 'react';
import { View } from 'react-native';
import { KeyValueRowRootProps } from '../KeyValueRow.types';

/**
 * The main container for the KeyValueRow component.
 * When creating custom KeyValueRow components, this must be the outermost component wrapping the two <KeyValueSection/> components.
 *
 * e.g.
 * ```
 * <KeyValueRowRoot>
 *  <KeyValueSection></KeyValueSection>
 *  <KeyValueSection></KeyValueSection>
 * </KeyValueRowRoot>
 * ```
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<ReactNode>} props.children - The two <KeyValueSection> children.
 * @param {ViewProps} [props.style] - Optional styling
 *
 * @returns {JSX.Element} The rendered Root component.
 */
const KeyValueRowRoot = ({
  children,
  style: customStyles,
}: KeyValueRowRootProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getRootContainerStyles = () => {
    const baseClasses =
      'flex-row justify-between items-start p-4 bg-background-default';

    return [tw`${baseClasses}`, customStyles];
  };

  return <View style={getRootContainerStyles()}>{children}</View>;
};

export default KeyValueRowRoot;
