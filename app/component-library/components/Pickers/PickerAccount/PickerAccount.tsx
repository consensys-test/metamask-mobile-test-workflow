/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

// External dependencies.
import Avatar, { AvatarSize, AvatarVariant } from '../../Avatars/Avatar';
import Text, { TextVariant } from '../../Texts/Text';
import { formatAddress } from '../../../../util/address';
import { useTw } from '../../../../hooks/useTwrncTheme';
import { IconSize } from '../../Icons/Icon';

// Internal dependencies.
import PickerBase from '../PickerBase';
import { PickerAccountProps } from './PickerAccount.types';
import { WalletViewSelectorsIDs } from '../../../../../e2e/selectors/wallet/WalletView.selectors';

const PickerAccount: React.ForwardRefRenderFunction<
  typeof TouchableOpacity,
  PickerAccountProps
> = (
  {
    style,
    accountAddress,
    accountName,
    accountAvatarType,
    showAddress = true,
    cellAccountContainerStyle = {},
    ...props
  },
  ref: React.Ref<typeof TouchableOpacity>,
) => {
  const tw = useTw();
  const shortenedAddress = formatAddress(accountAddress, 'short');

  // Modern styling with Tailwind utilities
  const getPickerContainerStyles = () => tw`flex-col`;

  const getPickerBaseStyles = () => [tw`bg-background-default`, style];

  const getDropdownIconStyles = () => tw`text-icon-default`;

  const getCellAccountStyles = () => [
    tw`flex-row items-center p-2`,
    cellAccountContainerStyle,
  ];

  const getAccountNameLabelStyles = () => tw`flex-1`;

  const getAccountNameAvatarStyles = () => tw`flex-row items-center`;

  const getAccountAvatarStyles = () => tw`mr-2`;

  const getAccountAddressLabelStyles = () => tw`text-text-muted mt-1 ml-2`;

  const renderCellAccount = () => (
    <View style={getCellAccountStyles()}>
      <View style={getAccountNameLabelStyles()}>
        <View style={getAccountNameAvatarStyles()}>
          <Avatar
            variant={AvatarVariant.Account}
            type={accountAvatarType}
            accountAddress={accountAddress}
            size={AvatarSize.Xs}
            style={getAccountAvatarStyles()}
          />
          <Text
            variant={TextVariant.BodyMDMedium}
            testID={WalletViewSelectorsIDs.ACCOUNT_NAME_LABEL_TEXT}
          >
            {accountName}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      style={getPickerContainerStyles()}
      onPress={props.onPress}
    >
      <PickerBase
        iconSize={IconSize.Xs}
        style={getPickerBaseStyles()}
        dropdownIconStyle={getDropdownIconStyles()}
        {...props}
        ref={ref as React.Ref<View>}
      >
        {renderCellAccount()}
      </PickerBase>
      {showAddress && (
        <Text
          variant={TextVariant.BodySMMedium}
          style={getAccountAddressLabelStyles()}
        >
          {shortenedAddress}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default forwardRef(PickerAccount);
