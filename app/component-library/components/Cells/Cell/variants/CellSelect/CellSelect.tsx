/* eslint-disable react/prop-types */

// Third library dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import ListItemSelect from '../../../../List/ListItemSelect';
import CellBase from '../../foundation/CellBase';

// Internal dependencies.
import { CellSelectProps } from './CellSelect.types';
import { CellComponentSelectorsIDs } from '../../../../../../../e2e/selectors/wallet/CellComponent.selectors';

const CellSelect = ({
  style,
  avatarProps,
  title,
  secondaryText,
  tertiaryText,
  tagLabel,
  isSelected = false,
  children,
  ...props
}: CellSelectProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getCellStyles = () => [tw``, style];

  return (
    <ListItemSelect
      isSelected={isSelected}
      style={getCellStyles()}
      testID={CellComponentSelectorsIDs.SELECT}
      {...props}
    >
      <CellBase
        avatarProps={avatarProps}
        title={title}
        secondaryText={secondaryText}
        tertiaryText={tertiaryText}
        tagLabel={tagLabel}
        style={style}
      >
        {children}
      </CellBase>
    </ListItemSelect>
  );
};

export default CellSelect;
