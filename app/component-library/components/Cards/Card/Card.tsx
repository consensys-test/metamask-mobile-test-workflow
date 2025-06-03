/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { CardProps } from './Card.types';

const Card: React.FC<CardProps> = ({ style, children, ...props }) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getCardStyles = () => {
    const baseClasses =
      'bg-background-default rounded-lg p-4 shadow-sm border border-border-muted';

    return [tw`${baseClasses}`, style];
  };

  return (
    <TouchableOpacity style={getCardStyles()} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Card;
