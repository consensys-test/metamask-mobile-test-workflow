/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { DimensionValue, View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { ListItemProps, VerticalAlignment } from './ListItem.types';
import {
  DEFAULT_LISTITEM_GAP,
  DEFAULT_LISTITEM_VERTICALALIGNMENT,
  TESTID_LISTITEM_GAP,
} from './ListItem.constants';

const ListItem: React.FC<ListItemProps> = ({
  style,
  children,
  topAccessory,
  bottomAccessory,
  topAccessoryGap,
  bottomAccessoryGap,
  gap = DEFAULT_LISTITEM_GAP,
  verticalAlignment = DEFAULT_LISTITEM_VERTICALALIGNMENT,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getListItemStyles = () => {
    const baseClasses = 'flex';

    let alignmentClasses = '';
    switch (verticalAlignment) {
      case VerticalAlignment.Top:
        alignmentClasses = 'items-start';
        break;
      case VerticalAlignment.Center:
        alignmentClasses = 'items-center';
        break;
      case VerticalAlignment.Bottom:
        alignmentClasses = 'items-end';
        break;
      default:
        alignmentClasses = 'items-center';
    }

    return [tw`${baseClasses} ${alignmentClasses}`, style];
  };

  const getItemContainerStyles = () => tw`flex-row flex-1 items-center`;

  const getAccessoryStyles = (accessoryGap?: number) => {
    const marginStyle = accessoryGap ? { marginVertical: accessoryGap } : {};
    return [tw``, marginStyle];
  };

  return (
    <View
      style={getListItemStyles()}
      accessible
      accessibilityRole="none"
      {...props}
    >
      {topAccessory && (
        <View style={getAccessoryStyles(topAccessoryGap)}>{topAccessory}</View>
      )}
      <View style={getItemContainerStyles()}>
        {React.Children.toArray(children)
          .filter((child) => !!child)
          .map((child, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <View
                  style={{ width: gap as DimensionValue }}
                  testID={TESTID_LISTITEM_GAP}
                  accessible={false}
                />
              )}
              {child}
            </React.Fragment>
          ))}
      </View>
      {bottomAccessory && (
        <View style={getAccessoryStyles(bottomAccessoryGap)}>
          {bottomAccessory}
        </View>
      )}
    </View>
  );
};

export default ListItem;
