/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import HeaderBase from '../../HeaderBase';
import ButtonIcon from '../../Buttons/ButtonIcon';
import { IconName, IconColor } from '../../Icons/Icon';

// Internal dependencies.
import { BottomSheetHeaderProps } from './BottomSheetHeader.types';

const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({
  style,
  children,
  onBack,
  onClose,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getHeaderStyles = () => {
    const baseClasses = 'px-4 py-3 border-b border-border-muted';

    return [tw`${baseClasses}`, style];
  };

  const startAccessory = onBack && (
    <ButtonIcon
      iconName={IconName.ArrowLeft}
      iconColor={IconColor.Default}
      onPress={onBack}
    />
  );

  const endAccessory = onClose && (
    <ButtonIcon
      iconName={IconName.Close}
      iconColor={IconColor.Default}
      onPress={onClose}
    />
  );

  return (
    <HeaderBase
      style={getHeaderStyles()}
      startAccessory={startAccessory}
      endAccessory={endAccessory}
      {...props}
    >
      {children}
    </HeaderBase>
  );
};

export default BottomSheetHeader;
