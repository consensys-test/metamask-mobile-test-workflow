/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import ListItem from '../../List/ListItem/ListItem';

// Internal dependencies.
import { ListItemSelectProps } from './ListItemSelect.types';
import { DEFAULT_SELECTITEM_GAP } from './ListItemSelect.constants';

const ListItemSelect: React.FC<ListItemSelectProps> = ({
  style,
  isSelected = false,
  isDisabled = false,
  children,
  onPress,
  onLongPress,
  gap = DEFAULT_SELECTITEM_GAP,
  verticalAlignment,
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

  const getUnderlayStyles = () => tw`absolute inset-0 rounded-lg`;

  const getUnderlayBarStyles = () =>
    tw`absolute left-0 top-0 bottom-0 w-1 bg-primary-default rounded-l-lg`;

  return (
    <TouchableOpacity
      style={getContainerStyles()}
      disabled={isDisabled}
      onPress={onPress}
      onLongPress={onLongPress}
      {...props}
    >
      <ListItem gap={gap} style={getListItemStyles()}>
        {children}
      </ListItem>
      {isSelected && (
        <View
          style={getUnderlayStyles()}
          accessibilityRole="checkbox"
          accessible
        >
          <View style={getUnderlayBarStyles()} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ListItemSelect;
