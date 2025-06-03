/* eslint-disable react/prop-types */

// Third library dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import ListItemMultiSelect from '../../../../List/ListItemMultiSelect';
import CellBase from '../../foundation/CellBase';
import { CellComponentSelectorsIDs } from '../../../../../../../e2e/selectors/wallet/CellComponent.selectors';

// Internal dependencies.
import { CellMultiSelectProps } from './CellMultiSelect.types';

const CellMultiSelect = ({
  style,
  avatarProps,
  title,
  secondaryText,
  tertiaryText,
  tagLabel,
  isSelected = false,
  children,
  ...props
}: CellMultiSelectProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    const baseClasses = 'bg-background-default';

    return [tw`${baseClasses}`, style];
  };

  const getCellStyles = () => tw`flex-1`;

  return (
    <ListItemMultiSelect
      isSelected={isSelected}
      style={getBaseStyles()}
      testID={CellComponentSelectorsIDs.MULTISELECT}
      {...props}
    >
      <CellBase
        avatarProps={avatarProps}
        title={title}
        secondaryText={secondaryText}
        tertiaryText={tertiaryText}
        tagLabel={tagLabel}
        style={getCellStyles()}
      >
        {children}
      </CellBase>
    </ListItemMultiSelect>
  );
};

export default CellMultiSelect;
