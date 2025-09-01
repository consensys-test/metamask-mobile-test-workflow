import React, { useState, useEffect, useMemo } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../../component-library/components/Texts/Text';
import Button, {
  ButtonVariants,
  ButtonSize,
} from '../../../../../component-library/components/Buttons/Button';
import { useTheme } from '../../../../../util/theme';
import { useCardSDK } from '../../sdk';
import { getCardNavbarOptions } from '../../../Navbar';
import { strings } from '../../../../../../locales/i18n';
import Logger from '../../../../../util/Logger';

const CardAuthenticatedScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { authToken, logoutFromCard } = useCardSDK();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    navigation.setOptions(
      getCardNavbarOptions(
        navigation,
        {
          title: strings('card.card') || 'MetaMask Card',
          showBack: false,
          showClose: true,
        },
        { colors },
      ),
    );
  }, [navigation, colors]);

  const styles = useMemo(
    () => ({
      container: {
        flex: 1,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        padding: 20,
        backgroundColor: colors.background.default,
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
        backgroundColor: colors.background.alternative,
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
        backgroundColor: colors.background.alternative,
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
    }),
    [colors.background.default, colors.background.alternative],
  );

  const handleLogout = async () => {
    Alert.alert(
      'Clear Authentication Token',
      'This will clear your authentication token and you will need to log in again. This is for debugging purposes only.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear Token',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await logoutFromCard();
              Logger.log('Card authentication token cleared successfully');
              // Authentication state change will trigger re-render in CardAuthGuard
            } catch (error) {
              Logger.error(
                error as Error,
                'Failed to clear card authentication token',
              );
              Alert.alert(
                'Error',
                'Failed to clear authentication token. Please try again.',
              );
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ],
    );
  };

  const truncateToken = (token: string, maxLength: number = 20): string => {
    if (token.length <= maxLength) return token;
    const start = token.slice(0, maxLength / 2);
    const end = token.slice(-maxLength / 2);
    return `${start}...${end}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          variant={TextVariant.HeadingLG}
          color={TextColor.Default}
          style={styles.title}
        >
          MetaMask Card
        </Text>

        <Text
          variant={TextVariant.BodyMD}
          color={TextColor.Alternative}
          style={styles.description}
        >
          You are successfully authenticated and ready to use Card features.
        </Text>

        {authToken && (
          <View style={styles.tokenContainer}>
            <Text
              variant={TextVariant.BodySM}
              color={TextColor.Alternative}
              style={styles.tokenLabel}
            >
              Authentication Token:
            </Text>
            <Text
              variant={TextVariant.BodyXS}
              color={TextColor.Default}
              style={styles.tokenText}
            >
              {truncateToken(authToken, 40)}
            </Text>
          </View>
        )}

        <View style={styles.debugSection}>
          <Text
            variant={TextVariant.BodyMD}
            color={TextColor.Alternative}
            style={styles.debugTitle}
          >
            Debug Options
          </Text>

          <Text
            variant={TextVariant.BodySM}
            color={TextColor.Alternative}
            style={styles.debugDescription}
          >
            Clear your authentication token to test the login flow again.
          </Text>

          <Button
            variant={ButtonVariants.Secondary}
            size={ButtonSize.Lg}
            label={isLoggingOut ? 'Clearing Token...' : 'Clear Auth Token'}
            onPress={handleLogout}
            loading={isLoggingOut}
          />
        </View>
      </View>
    </View>
  );
};

export default CardAuthenticatedScreen;
