// Third party dependencies
import { useContext } from 'react';

// External dependencies
import {
  ThemeContext,
  useTailwind,
} from '@metamask-previews/design-system-twrnc-preset';

/**
 * Custom hook to access the twrnc theme system
 *
 * @returns An object containing:
 * - tw: The tailwind utility function for styling
 * - themeContext: The full theme context with theme state and setters
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { tw } = useTwrncTheme();
 *
 *   return (
 *     <View style={tw`bg-primary-default p-4 rounded-lg`}>
 *       <Text style={tw`text-text-default text-lg`}>Hello World</Text>
 *     </View>
 *   );
 * };
 * ```
 */
export const useTwrncTheme = () => {
  // Get the tailwind utility function
  const tw = useTailwind();

  // Get the full theme context for advanced usage
  const themeContext = useContext(ThemeContext);

  return {
    tw,
    themeContext,
  };
};

/**
 * Hook to get just the tailwind utility function
 * This is a convenience hook for the most common use case
 *
 * @returns The tailwind utility function
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const tw = useTw();
 *
 *   return <View style={tw`bg-primary-default p-4`} />;
 * };
 * ```
 */
export const useTw = () => useTailwind();

export default useTwrncTheme;
