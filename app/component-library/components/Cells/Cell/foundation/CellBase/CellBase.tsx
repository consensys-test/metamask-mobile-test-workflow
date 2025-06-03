/* eslint-disable react/prop-types */

// Third library dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import Text from '../../../../Texts/Text';
import Tag from '../../../../Tags/Tag';
import Avatar from '../../../../Avatars/Avatar';

// Internal dependencies.
import {
  DEFAULT_CELLBASE_AVATAR_SIZE,
  DEFAULT_CELLBASE_AVATAR_TITLE_TEXTVARIANT,
  DEFAULT_CELLBASE_AVATAR_SECONDARYTEXT_TEXTVARIANT,
  DEFAULT_CELLBASE_AVATAR_TERTIARYTEXT_TEXTVARIANT,
} from './CellBase.constants';
import { CellBaseProps } from './CellBase.types';
import { CellComponentSelectorsIDs } from '../../../../../../../e2e/selectors/wallet/CellComponent.selectors';

const CellBase = ({
  style,
  avatarProps,
  title,
  secondaryText,
  tertiaryText,
  tagLabel,
  children,
}: CellBaseProps) => {
  const tw = useTw();

  return (
    <View style={[tw`flex-row items-center p-4`, style]}>
      {/* DEV Note: Account Avatar should be replaced with Avatar with Badge whenever available */}
      <Avatar
        style={tw`mr-3`}
        testID={CellComponentSelectorsIDs.BASE_AVATAR}
        size={DEFAULT_CELLBASE_AVATAR_SIZE}
        {...avatarProps}
      />
      <View style={tw`flex-1`}>
        <Text
          numberOfLines={1}
          variant={DEFAULT_CELLBASE_AVATAR_TITLE_TEXTVARIANT}
          testID={CellComponentSelectorsIDs.BASE_TITLE}
        >
          {title}
        </Text>
        {!!secondaryText && (
          <Text
            numberOfLines={1}
            variant={DEFAULT_CELLBASE_AVATAR_SECONDARYTEXT_TEXTVARIANT}
            style={tw`mt-1 text-text-alternative`}
          >
            {secondaryText}
          </Text>
        )}
        {!!tertiaryText && (
          <Text
            numberOfLines={1}
            variant={DEFAULT_CELLBASE_AVATAR_TERTIARYTEXT_TEXTVARIANT}
            style={tw`mt-1 text-text-muted`}
          >
            {tertiaryText}
          </Text>
        )}
        {!!tagLabel && <Tag label={tagLabel} style={tw`mt-2`} />}
      </View>
      {children && <View style={tw`ml-3`}>{children}</View>}
    </View>
  );
};

export default CellBase;
