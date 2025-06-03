/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// External dependencies.
import Avatar, { AvatarSize, AvatarVariant } from '../../Avatars/Avatar';
import Icon, { IconName, IconSize } from '../../Icons/Icon';
import Text, { TextVariant } from '../../Texts/Text';
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { PickerNetworkProps } from './PickerNetwork.types';
import { WalletViewSelectorsIDs } from '../../../../../e2e/selectors/wallet/WalletView.selectors';
import { PICKERNETWORK_ARROW_TESTID } from './PickerNetwork.constants';

const PickerNetwork = ({
  onPress,
  style,
  label,
  imageSource,
  hideNetworkName,
  isDisabled = false,
  ...props
}: PickerNetworkProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getPickerStyles = () => {
    const baseClasses =
      'flex-row items-center p-2 bg-background-default rounded-lg';
    const disabledClasses = isDisabled ? 'opacity-50' : '';

    return [tw`${baseClasses} ${disabledClasses}`, style];
  };

  const getNetworkIconContainerStyles = () => tw`mr-2`;

  const getLabelStyles = () => tw`flex-1 text-text-default font-medium mr-2`;

  return (
    <TouchableOpacity
      style={getPickerStyles()}
      onPress={onPress}
      disabled={isDisabled}
      {...props}
    >
      <View
        style={hideNetworkName ? getNetworkIconContainerStyles() : undefined}
      >
        <Avatar
          variant={AvatarVariant.Network}
          size={AvatarSize.Xs}
          name={label}
          imageSource={imageSource}
          testID={WalletViewSelectorsIDs.NAVBAR_NETWORK_PICKER}
          accessibilityLabel={label}
        />
      </View>
      {hideNetworkName ? null : (
        <Text
          style={getLabelStyles()}
          numberOfLines={1}
          variant={TextVariant.BodyMD}
          testID={WalletViewSelectorsIDs.NAVBAR_NETWORK_TEXT}
        >
          {label}
        </Text>
      )}
      {onPress && (
        <Icon
          size={IconSize.Xs}
          name={IconName.ArrowDown}
          color={tw.color('icon-default')}
          testID={PICKERNETWORK_ARROW_TESTID}
        />
      )}
    </TouchableOpacity>
  );
};

export default PickerNetwork;
