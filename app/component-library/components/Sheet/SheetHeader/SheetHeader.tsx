/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import TextComponent, { TextVariant } from '../../Texts/Text';
import Button, { ButtonVariants } from '../../Buttons/Button';
import ButtonIcon from '../../Buttons/ButtonIcon';
import { IconName, IconColor } from '../../Icons/Icon';
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { SheetHeaderProps } from './SheetHeader.types';
import {
  SHEET_HEADER_ACTION_BUTTON_ID,
  SHEET_HEADER_BACK_BUTTON_ID,
} from './SheetHeader.constants';

const SheetHeader = ({
  title,
  onBack,
  actionButtonOptions,
  ...props
}: SheetHeaderProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () =>
    tw`flex-row items-center justify-between p-4 bg-background-default`;

  const getLeftAccessoryStyles = () => tw`w-16 items-start`;

  const getRightAccessoryStyles = () => tw`w-16 items-end`;

  return (
    <View style={getBaseStyles()} {...props}>
      <View style={getLeftAccessoryStyles()}>
        {onBack && (
          <ButtonIcon
            testID={SHEET_HEADER_BACK_BUTTON_ID}
            iconColor={IconColor.Default}
            onPress={onBack}
            iconName={IconName.ArrowLeft}
          />
        )}
      </View>
      <TextComponent variant={TextVariant.HeadingMD}>{title}</TextComponent>
      <View style={getRightAccessoryStyles()}>
        {actionButtonOptions && (
          <Button
            variant={ButtonVariants.Link}
            testID={SHEET_HEADER_ACTION_BUTTON_ID}
            onPress={actionButtonOptions.onPress}
            label={actionButtonOptions.label}
          />
        )}
      </View>
    </View>
  );
};

export default SheetHeader;
