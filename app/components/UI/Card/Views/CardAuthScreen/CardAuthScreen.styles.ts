import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../util/theme/models';

export const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      padding: 20,
      backgroundColor: theme.colors.background.default,
    },
    content: {
      width: '100%' as const,
      maxWidth: 400,
      alignItems: 'center' as const,
    },
    title: {
      marginBottom: 16,
      textAlign: 'center' as const,
    },
    description: {
      marginBottom: 32,
      textAlign: 'center' as const,
    },
    webView: {
      flex: 1,
    },
    loaderContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
  });
