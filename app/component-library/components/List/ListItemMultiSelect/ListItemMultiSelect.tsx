/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// External dependencies.
import Checkbox from '../../Checkbox';
import { useTw } from '../../../../hooks/useTwrncTheme';
import ListItem from '../../List/ListItem/ListItem';

// Internal dependencies.
import { ListItemMultiSelectProps } from './ListItemMultiSelect.types';
import { DEFAULT_LISTITEMMULTISELECT_GAP } from './ListItemMultiSelect.constants';

const ListItemMultiSelect: React.FC<ListItemMultiSelectProps> = ({
  style,
  isSelected = false,
  isDisabled = false,
  children,
  gap = DEFAULT_LISTITEMMULTISELECT_GAP,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getContainerStyles = () => {
    const baseClasses = 'relative';
    const disabledClasses = isDisabled ? 'opacity-50' : '';

    return [tw`${baseClasses} ${disabledClasses}`, style];
  };

  const getListItemStyles = () => tw``;

  const getCheckboxStyles = () => tw`mr-3`;

  const getUnderlayStyles = () =>
    tw`absolute inset-0 bg-primary-muted rounded-lg opacity-20`;

  return (
    <TouchableOpacity
      style={getContainerStyles()}
      disabled={isDisabled}
      {...props}
    >
      <ListItem gap={gap} style={getListItemStyles()}>
        <Checkbox
          style={getCheckboxStyles()}
          isChecked={isSelected}
          onPressIn={props.onPress}
        />
        {children}
      </ListItem>
      {isSelected && (
        <View
          style={getUnderlayStyles()}
          accessibilityRole="checkbox"
          accessible
        />
      )}
    </TouchableOpacity>
  );
};

export default ListItemMultiSelect;
