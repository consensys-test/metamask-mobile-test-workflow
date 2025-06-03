/* eslint-disable react/prop-types */

// Third library dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import CellBase from '../../foundation/CellBase';
import Card from '../../../../Cards/Card';
import { CellComponentSelectorsIDs } from '../../../../../../../e2e/selectors/wallet/CellComponent.selectors';

// Internal dependencies.
import { CellDisplayProps } from './CellDisplay.types';

const CellDisplay = ({ style, ...props }: CellDisplayProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getCellStyles = () => [tw``, style];

  return (
    <Card
      style={getCellStyles()}
      testID={CellComponentSelectorsIDs.DISPLAY}
      {...props}
    >
      <CellBase {...props} />
    </Card>
  );
};

export default CellDisplay;
