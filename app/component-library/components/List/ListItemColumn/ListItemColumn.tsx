/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { ListItemColumnProps, WidthType } from './ListItemColumn.types';
import {
  DEFAULT_LISTITEMCOLUMN_WIDTHTYPE,
  TESTID_LISTITEMCOLUMN,
} from './ListItemColumn.constants';

const ListItemColumn: React.FC<ListItemColumnProps> = ({
  style,
  children,
  widthType = DEFAULT_LISTITEMCOLUMN_WIDTHTYPE,
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getColumnStyles = () => {
    let widthClasses = '';

    switch (widthType) {
      case WidthType.Auto:
        widthClasses = 'flex-0';
        break;
      case WidthType.Fill:
        widthClasses = 'flex-1';
        break;
      case WidthType.Fixed:
        widthClasses = 'flex-0';
        break;
      default:
        widthClasses = 'flex-0';
    }

    return [tw`${widthClasses}`, style];
  };

  return (
    <View style={getColumnStyles()} testID={TESTID_LISTITEMCOLUMN}>
      {children}
    </View>
  );
};

export default ListItemColumn;
