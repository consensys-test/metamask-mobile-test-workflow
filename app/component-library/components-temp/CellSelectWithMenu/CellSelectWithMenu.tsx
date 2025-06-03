/* eslint-disable react/prop-types */

// Third library dependencies.
import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

// External dependencies.
import { useTw } from '../../hooks/useTwrncTheme';
import Tag from '../../../component-library/components/Tags/Tag';

// Internal dependencies.
import { CellSelectWithMenuProps } from './CellSelectWithMenu.types';
import { CellComponentSelectorsIDs } from '../../../../e2e/selectors/wallet/CellComponent.selectors';
import ListItemMultiSelectButton from '../ListItemMultiSelectButton/ListItemMultiSelectButton';
import Avatar from '../../../component-library/components/Avatars/Avatar';
import TextComponent from '../../../component-library/components/Texts/Text';
import {
  DEFAULT_CELLBASE_AVATAR_SECONDARYTEXT_TEXTVARIANT,
  DEFAULT_CELLBASE_AVATAR_SIZE,
  DEFAULT_CELLBASE_AVATAR_TITLE_TEXTVARIANT,
} from '../../../component-library/components/Cells/Cell/foundation/CellBase/CellBase.constants';
import Icon, {
  IconName,
  IconSize,
} from '../../../component-library/components/Icons/Icon';

const CellSelectWithMenu = ({
  style,
  avatarProps,
  title,
  secondaryText,
  tertiaryText,
  tagLabel,
  isSelected = false,
  children,
  withAvatar = true,
  showSecondaryTextIcon = true,
  ...props
}: CellSelectWithMenuProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    const baseClasses = 'bg-background-default';

    return [tw`${baseClasses}`, style];
  };

  const getCellBaseStyles = () => tw`flex-row items-center p-4`;

  const getAvatarStyles = () => tw`mr-3`;

  const getCellBaseInfoStyles = () => tw`flex-1`;

  const getContainerRowStyles = () => tw`flex-row items-center`;

  const getSecondaryTextStyles = () => tw`flex-1 text-text-alternative`;

  const getArrowStyles = () => tw`ml-1 text-icon-alternative`;

  const getTagLabelStyles = () => tw`mt-1`;

  const getSelectedTagStyles = () =>
    tw`bg-primary-muted border-primary-default`;

  const getOptionalAccessoryStyles = () => tw`ml-2`;

  return (
    <ListItemMultiSelectButton
      isSelected={isSelected}
      style={getBaseStyles()}
      testID={CellComponentSelectorsIDs.MULTISELECT}
      {...props}
    >
      <View style={getCellBaseStyles()}>
        {/* DEV Note: Account Avatar should be replaced with Avatar with Badge whenever available */}
        {withAvatar ? (
          <Avatar
            style={getAvatarStyles()}
            testID={CellComponentSelectorsIDs.BASE_AVATAR}
            size={DEFAULT_CELLBASE_AVATAR_SIZE}
            {...avatarProps}
          />
        ) : null}

        <View style={getCellBaseInfoStyles()}>
          {title === undefined || typeof title === 'string' ? (
            <TextComponent
              numberOfLines={1}
              variant={DEFAULT_CELLBASE_AVATAR_TITLE_TEXTVARIANT}
              testID={CellComponentSelectorsIDs.BASE_TITLE}
            >
              {title}
            </TextComponent>
          ) : (
            title
          )}
          {!!secondaryText && (
            <TouchableWithoutFeedback>
              <TouchableOpacity
                style={getContainerRowStyles()}
                onPress={props.onTextClick}
              >
                <TextComponent
                  numberOfLines={1}
                  variant={DEFAULT_CELLBASE_AVATAR_SECONDARYTEXT_TEXTVARIANT}
                  style={getSecondaryTextStyles()}
                >
                  {secondaryText}
                </TextComponent>
                {showSecondaryTextIcon && (
                  <Icon
                    name={IconName.ArrowDown}
                    size={IconSize.Xss}
                    style={getArrowStyles()}
                  />
                )}
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          )}
          {!!tagLabel && (
            <Tag
              testID={CellComponentSelectorsIDs.TAG_LABEL}
              label={tagLabel}
              style={
                isSelected
                  ? [getTagLabelStyles(), getSelectedTagStyles()]
                  : getTagLabelStyles()
              }
            />
          )}
        </View>
        {children && (
          <View style={getOptionalAccessoryStyles()}>{children}</View>
        )}
      </View>
    </ListItemMultiSelectButton>
  );
};

export default CellSelectWithMenu;
