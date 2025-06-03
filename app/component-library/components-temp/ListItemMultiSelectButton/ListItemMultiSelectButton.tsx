/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// External dependencies.
import { useTw } from '../../../hooks/useTwrncTheme';
import ListItem from '../../../component-library/components/List/ListItem/ListItem';

// Internal dependencies.
import { ListItemMultiSelectButtonProps } from './ListItemMultiSelectButton.types';
import {
  BUTTON_TEST_ID,
  DEFAULT_LISTITEMMULTISELECT_GAP,
} from './ListItemMultiSelectButton.constants';
import ButtonIcon from '../../../component-library/components/Buttons/ButtonIcon';
import {
  IconColor,
  IconName,
} from '../../../component-library/components/Icons/Icon';
import Button, {
  ButtonSize,
  ButtonVariants,
  ButtonWidthTypes,
} from '../../../component-library/components/Buttons/Button';
import { TextVariant } from '../../../component-library/components/Texts/Text';

const ListItemMultiSelectButton: React.FC<ListItemMultiSelectButtonProps> = ({
  style,
  isSelected = false,
  isDisabled = false,
  children,
  gap = DEFAULT_LISTITEMMULTISELECT_GAP,
  showButtonIcon = true,
  buttonIcon = IconName.MoreVertical,
  buttonProps,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getContainerStyles = () =>
    tw`flex-row items-center bg-background-default`;

  const getBaseStyles = () => {
    let stateClasses = '';

    if (isDisabled) {
      stateClasses = 'opacity-50';
    } else if (isSelected) {
      stateClasses = 'bg-background-alternative';
    }

    const baseClasses = `flex-1 relative ${stateClasses}`;

    return [tw`${baseClasses}`, style];
  };

  const getContainerColumnStyles = () => tw`flex-1`;

  const getUnderlayStyles = () =>
    tw`absolute inset-0 bg-primary-muted opacity-20`;

  const getUnderlayBarStyles = () =>
    tw`absolute left-0 top-0 bottom-0 w-1 bg-primary-default`;

  const getButtonIconStyles = () => tw`ml-2 p-2`;

  return (
    <View style={getContainerStyles()}>
      <TouchableOpacity
        style={getBaseStyles()}
        disabled={isDisabled}
        onPress={props.onPress}
        onLongPress={props.onPress}
        {...props}
      >
        <ListItem gap={gap} style={getContainerColumnStyles()}>
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
      {showButtonIcon ? (
        <View style={getButtonIconStyles()}>
          <ButtonIcon
            iconName={buttonIcon}
            iconColor={IconColor.Default}
            testID={buttonProps?.buttonTestId || BUTTON_TEST_ID}
            onPress={buttonProps?.onButtonClick}
            accessibilityRole="button"
          />
        </View>
      ) : null}
      {buttonProps?.textButton ? (
        <View>
          <Button
            variant={ButtonVariants.Link}
            onPress={buttonProps?.onButtonClick as () => void}
            labelTextVariant={TextVariant.BodyMD}
            size={ButtonSize.Lg}
            width={ButtonWidthTypes.Auto}
            label={buttonProps?.textButton}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ListItemMultiSelectButton;
