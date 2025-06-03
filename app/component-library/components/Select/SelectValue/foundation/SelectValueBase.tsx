/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../../hooks/useTwrncTheme';
import ListItem from '../../../List/ListItem';
import ListItemColumn, { WidthType } from '../../../List/ListItemColumn';

// Internal dependencies.
import { SelectValueBaseProps } from './SelectValueBase.types';

const SelectValueBase: React.FC<SelectValueBaseProps> = ({
  startAccessory,
  children,
  endAccessory,
  gap,
  verticalAlignment,
  style,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getSelectValueStyles = () => {
    const baseClasses = 'flex-row items-center p-3';

    return [tw`${baseClasses}`, style];
  };

  return (
    <ListItem
      style={getSelectValueStyles()}
      gap={gap}
      verticalAlignment={verticalAlignment}
      {...props}
    >
      {startAccessory && <ListItemColumn>{startAccessory}</ListItemColumn>}
      {children && (
        <ListItemColumn widthType={WidthType.Fill}>{children}</ListItemColumn>
      )}
      {endAccessory && <ListItemColumn>{endAccessory}</ListItemColumn>}
    </ListItem>
  );
};

export default SelectValueBase;
