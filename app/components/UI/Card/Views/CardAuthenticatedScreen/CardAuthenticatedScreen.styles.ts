import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../util/theme/models';

export const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background.default,
    },
    seeCardDetailsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border.default,
      marginVertical: 12,
    },
    cardDetailsImage: {
      width: '100%',
      height: 232,
      borderRadius: 12,
      overflow: 'hidden',
    },
    cardImageContainer: {
      width: '100%',
      marginTop: 8,
    },
  });
