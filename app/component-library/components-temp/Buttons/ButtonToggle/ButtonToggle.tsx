/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../hooks/useTwrncTheme';
import Button from '../../../components/Buttons/Button/foundation/ButtonBase';
import TextComponent from '../../../components/Texts/Text/Text';
import { ButtonSize } from '../../../components/Buttons/Button';

// Internal dependencies.
import { ButtonToggleProps } from './ButtonToggle.types';
import {
  DEFAULT_BUTTONTOGGLE_LABEL_TEXTVARIANT,
  DEFAULT_BUTTONTOGGLE_LABEL_COLOR,
  DEFAULT_BUTTONTOGGLE_LABEL_COLOR_ACTIVE,
} from './ButtonToggle.constants';

const ButtonToggle = ({
  style,
  isActive = false,
  size = ButtonSize.Md,
  label,
  ...props
}: ButtonToggleProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    let sizeClasses = '';
    let activeClasses = '';

    switch (size) {
      case ButtonSize.Sm:
        sizeClasses = 'px-3 py-1.5';
        break;
      case ButtonSize.Lg:
        sizeClasses = 'px-6 py-3';
        break;
      default:
        sizeClasses = 'px-4 py-2';
    }

    if (isActive) {
      activeClasses = 'bg-primary-default border-primary-default';
    } else {
      activeClasses = 'bg-background-alternative border-border-muted';
    }

    const baseClasses = `rounded-lg border ${sizeClasses} ${activeClasses}`;

    return [tw`${baseClasses}`, style];
  };

  const getLabelColor = () =>
    isActive
      ? DEFAULT_BUTTONTOGGLE_LABEL_COLOR_ACTIVE
      : DEFAULT_BUTTONTOGGLE_LABEL_COLOR;

  const renderLabel = () =>
    typeof label === 'string' ? (
      <TextComponent
        variant={DEFAULT_BUTTONTOGGLE_LABEL_TEXTVARIANT}
        color={getLabelColor()}
      >
        {label}
      </TextComponent>
    ) : (
      label
    );

  return (
    <Button
      style={getBaseStyles()}
      label={renderLabel()}
      labelColor={getLabelColor()}
      {...props}
    />
  );
};

export default ButtonToggle;
