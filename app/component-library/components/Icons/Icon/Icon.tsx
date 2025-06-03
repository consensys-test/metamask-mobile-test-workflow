/* eslint-disable react/prop-types, react/jsx-pascal-case */

// Third party dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { IconProps, IconColor } from './Icon.types';
import { assetByIconName } from './Icon.assets';
import { DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR } from './Icon.constants';

const Icon = ({
  size = DEFAULT_ICON_SIZE,
  style,
  name,
  color = DEFAULT_ICON_COLOR,
  ...props
}: IconProps) => {
  const tw = useTw();
  const SVG = assetByIconName[name];
  const sizeAsNum = Number(size);

  // Modern color handling with Tailwind
  const getIconColor = () => {
    switch (color) {
      case IconColor.Default:
        return tw.color('icon-default');
      case IconColor.Inverse:
        return tw.color('primary-inverse');
      case IconColor.Alternative:
        return tw.color('icon-alternative');
      case IconColor.Muted:
        return tw.color('icon-muted');
      case IconColor.Primary:
        return tw.color('primary-default');
      case IconColor.PrimaryAlternative:
        return tw.color('primary-alternative');
      case IconColor.Success:
        return tw.color('success-default');
      case IconColor.Error:
        return tw.color('error-default');
      case IconColor.ErrorAlternative:
        return tw.color('error-alternative');
      case IconColor.Warning:
        return tw.color('warning-default');
      case IconColor.Info:
        return tw.color('info-default');
      default:
        return color;
    }
  };

  return (
    <SVG
      fill="currentColor"
      color={getIconColor()}
      style={style}
      width={sizeAsNum}
      height={sizeAsNum}
      // This prop it's for testing purposes
      name={name}
      {...props}
    />
  );
};

export default Icon;
