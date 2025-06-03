/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import Avatar, { AvatarSize, AvatarVariant } from '../../Avatars/Avatar';
import Button, { ButtonVariants } from '../../Buttons/Button';
import TextComponent, { TextVariant } from '../../Texts/Text';
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { TagUrlProps } from './TagUrl.types';

const TagUrl = ({ imageSource, label, cta, style, ...props }: TagUrlProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    const baseClasses =
      'flex-row items-center p-2 bg-background-alternative rounded-lg';

    return [tw`${baseClasses}`, style];
  };

  const getFaviconStyles = () => tw`mr-2`;

  const getLabelStyles = () => tw`flex-1 text-text-default font-medium`;

  const getCtaStyles = () => tw`ml-2`;

  return (
    <View style={getBaseStyles()} {...props}>
      <Avatar
        variant={AvatarVariant.Favicon}
        imageSource={imageSource}
        size={AvatarSize.Md}
        style={getFaviconStyles()}
      />
      <TextComponent style={getLabelStyles()} variant={TextVariant.BodyMD}>
        {label}
      </TextComponent>
      {cta && (
        <Button
          variant={ButtonVariants.Link}
          style={getCtaStyles()}
          onPress={cta.onPress}
          label={cta.label}
        />
      )}
    </View>
  );
};

export default TagUrl;
