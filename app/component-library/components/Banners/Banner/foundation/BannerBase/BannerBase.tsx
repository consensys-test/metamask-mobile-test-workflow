/* eslint-disable react/prop-types */

// Third party dependencies.
import { noop } from 'lodash';
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import Text from '../../../../Texts/Text';
import Button from '../../../../Buttons/Button';
import ButtonIcon from '../../../../Buttons/ButtonIcon';

// Internal dependencies.
import { BannerBaseProps } from './BannerBase.types';
import {
  DEFAULT_BANNERBASE_TITLE_TEXTVARIANT,
  DEFAULT_BANNERBASE_DESCRIPTION_TEXTVARIANT,
  DEFAULT_BANNERBASE_ACTIONBUTTON_SIZE,
  DEFAULT_BANNERBASE_CLOSEBUTTON_BUTTONICON_ICONCOLOR,
  DEFAULT_BANNERBASE_CLOSEBUTTON_BUTTONICON_SIZE,
  DEFAULT_BANNERBASE_CLOSEBUTTON_BUTTONICON_ICONNAME,
  TESTID_BANNER_CLOSE_BUTTON_ICON,
} from './BannerBase.constants';

const BannerBase: React.FC<BannerBaseProps> = ({
  style,
  startAccessory,
  title,
  description,
  actionButtonProps,
  onClose,
  closeButtonProps,
  children,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBannerStyles = () => {
    const baseClasses = 'flex-row p-4 rounded-lg border';

    return [tw`${baseClasses}`, style];
  };

  const getStartAccessoryStyles = () => {
    return tw`mr-3`;
  };

  const getInfoStyles = () => {
    return tw`flex-1`;
  };

  const getEndAccessoryStyles = () => {
    return tw`ml-3 self-start`;
  };

  const renderTitle = () =>
    typeof title === 'string' ? (
      <Text variant={DEFAULT_BANNERBASE_TITLE_TEXTVARIANT}>{title}</Text>
    ) : (
      title
    );

  const renderDescription = () =>
    typeof description === 'string' ? (
      <Text variant={DEFAULT_BANNERBASE_DESCRIPTION_TEXTVARIANT}>
        {description}
      </Text>
    ) : (
      description
    );

  return (
    <View style={getBannerStyles()} {...props}>
      <View style={getStartAccessoryStyles()}>{startAccessory}</View>
      <View style={getInfoStyles()}>
        {renderTitle()}
        {renderDescription()}
        {actionButtonProps && (
          <Button
            size={DEFAULT_BANNERBASE_ACTIONBUTTON_SIZE}
            {...actionButtonProps}
          />
        )}
        {children}
      </View>
      {(onClose || closeButtonProps) && (
        <View style={getEndAccessoryStyles()}>
          <ButtonIcon
            testID={TESTID_BANNER_CLOSE_BUTTON_ICON}
            iconColor={DEFAULT_BANNERBASE_CLOSEBUTTON_BUTTONICON_ICONCOLOR}
            size={DEFAULT_BANNERBASE_CLOSEBUTTON_BUTTONICON_SIZE}
            onPress={onClose || closeButtonProps?.onPress || noop}
            iconName={DEFAULT_BANNERBASE_CLOSEBUTTON_BUTTONICON_ICONNAME}
            {...closeButtonProps}
          />
        </View>
      )}
    </View>
  );
};

export default BannerBase;
