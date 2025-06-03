// Third party dependencies
import React from 'react';

// External dependencies
import {
  ThemeProvider as DesignSystemThemeProvider,
  Theme as DesignSystemTheme,
  ColorSet,
} from '@metamask-previews/design-system-twrnc-preset';
import { useAppTheme } from '../../../util/theme';
import { AppThemeKey } from '../../../util/theme/models';

/**
 * Props for TwrncThemeProvider component
 */
interface TwrncThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Maps the existing theme system to the design-system-twrnc-preset theme values
 * @param themeAppearance - The current theme appearance from the existing system
 * @returns The corresponding DesignSystemTheme value
 */
const mapThemeAppearanceToDesignSystemTheme = (
  themeAppearance: AppThemeKey,
): DesignSystemTheme => {
  switch (themeAppearance) {
    case AppThemeKey.light:
      return DesignSystemTheme.Light;
    case AppThemeKey.dark:
      return DesignSystemTheme.Dark;
    case AppThemeKey.os:
      // For OS theme, we'll default to Light, but this could be enhanced
      // to detect the actual OS preference
      return DesignSystemTheme.Default;
    default:
      return DesignSystemTheme.Default;
  }
};

/**
 * TwrncThemeProvider integrates the new design-system-twrnc-preset ThemeProvider
 * with the existing MetaMask theme system. It reads the current theme from the
 * existing system and applies it to the new design system provider.
 */
const TwrncThemeProvider: React.FC<TwrncThemeProviderProps> = ({
  children,
}) => {
  // Get the current theme from the existing theme system
  const currentTheme = useAppTheme();

  // Map the existing theme to the design system theme
  const designSystemTheme = mapThemeAppearanceToDesignSystemTheme(
    currentTheme.themeAppearance,
  );

  // Use the Brand ColorSet - currently the only available option
  const colorSet = ColorSet.Brand;

  return (
    <DesignSystemThemeProvider theme={designSystemTheme} colorSet={colorSet}>
      {children}
    </DesignSystemThemeProvider>
  );
};

export default TwrncThemeProvider;
