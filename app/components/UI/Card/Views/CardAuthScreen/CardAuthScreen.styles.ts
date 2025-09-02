import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../util/theme/models';

export const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background.default,
    },
    content: {
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      marginBottom: 32,
      textAlign: 'center',
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
    buttonContainer: {
      marginTop: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
