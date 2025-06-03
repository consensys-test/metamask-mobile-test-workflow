// Third party dependencies.
import React, { useCallback } from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import Avatar from '../Avatar';
import TextComponent, { TextVariant } from '../../Texts/Text';

// Internal dependencies.
import { AvatarGroupProps } from './AvatarGroup.types';
import {
  DEFAULT_AVATARGROUP_AVATARSIZE,
  DEFAULT_AVATARGROUP_MAXSTACKEDAVATARS,
  DEFAULT_AVATARGROUP_COUNTER_TEXTCOLOR,
  AVATARGROUP_AVATAR_CONTAINER_TESTID,
  AVATARGROUP_AVATAR_TESTID,
  AVATARGROUP_OVERFLOWCOUNTER_TESTID,
  SPACEBETWEENAVATARS_BY_AVATARSIZE,
  TEXTVARIANT_BY_AVATARSIZE,
} from './AvatarGroup.constants';

const AvatarGroup = ({
  avatarPropsList,
  size = DEFAULT_AVATARGROUP_AVATARSIZE,
  maxStackedAvatars = DEFAULT_AVATARGROUP_MAXSTACKEDAVATARS,
  includesBorder = true,
  spaceBetweenAvatars,
  style,
}: AvatarGroupProps) => {
  const tw = useTw();
  const overflowCounter = avatarPropsList.length - maxStackedAvatars;
  const avatarNegativeSpacing =
    spaceBetweenAvatars || SPACEBETWEENAVATARS_BY_AVATARSIZE[size];
  const shouldRenderOverflowCounter = overflowCounter > 0;

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    const baseClasses = 'flex-row items-center';

    return [tw`${baseClasses}`, style];
  };

  const getTextStyles = () => tw`ml-2 text-text-muted font-medium`;

  const renderAvatarList = useCallback(
    () =>
      avatarPropsList.slice(0, maxStackedAvatars).map((avatarProps, index) => {
        const marginLeft = index === 0 ? 0 : avatarNegativeSpacing;

        return (
          <View
            key={`avatar-${index}`}
            testID={`${AVATARGROUP_AVATAR_CONTAINER_TESTID}-${index}`}
            style={{ marginLeft }}
          >
            <Avatar
              {...avatarProps}
              size={size}
              includesBorder={includesBorder}
              testID={AVATARGROUP_AVATAR_TESTID}
            />
          </View>
        );
      }),
    [
      avatarPropsList,
      avatarNegativeSpacing,
      includesBorder,
      maxStackedAvatars,
      size,
    ],
  );

  return (
    <View style={getBaseStyles()}>
      {renderAvatarList()}
      {shouldRenderOverflowCounter && (
        <TextComponent
          variant={TEXTVARIANT_BY_AVATARSIZE[size]}
          color={DEFAULT_AVATARGROUP_COUNTER_TEXTCOLOR}
          style={getTextStyles()}
          testID={AVATARGROUP_OVERFLOWCOUNTER_TESTID}
        >{`+${overflowCounter}`}</TextComponent>
      )}
    </View>
  );
};

export default AvatarGroup;
