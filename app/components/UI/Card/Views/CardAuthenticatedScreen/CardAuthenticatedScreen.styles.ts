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
    tokenContainer: {
      marginBottom: 24,
      padding: 16,
      backgroundColor: theme.colors.background.alternative,
      borderRadius: 8,
      width: '100%' as const,
    },
    tokenLabel: {
      marginBottom: 8,
      textAlign: 'center' as const,
    },
    tokenText: {
      textAlign: 'center' as const,
      fontFamily: 'monospace',
    },
    debugSection: {
      marginTop: 32,
      padding: 16,
      backgroundColor: theme.colors.background.alternative,
      borderRadius: 8,
      width: '100%' as const,
    },
    debugTitle: {
      marginBottom: 12,
      textAlign: 'center' as const,
    },
    debugDescription: {
      marginBottom: 16,
      textAlign: 'center' as const,
    },
  });
