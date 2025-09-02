import React, { useState, useEffect } from 'react';
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
import { createStyle } from './CardAuthenticatedScreen.styles';
import { BaanxUser } from '../../types';

const CardAuthenticatedScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = createStyle(theme);
  const { logoutFromCard, getUser, authToken } = useCardSDK();
  const [userInfo, setUserInfo] = useState<BaanxUser | null>(null);
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
        theme,
      ),
    );
  }, [navigation, theme]);

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

  useEffect(() => {
    const fetchUser = async () => {
      Logger.log(authToken);
      const user = await getUser();
      setUserInfo(user);
    };

    fetchUser();
  }, [getUser, authToken]);

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

        {userInfo && (
          <View style={styles.tokenContainer}>
            <Text
              variant={TextVariant.BodySM}
              color={TextColor.Alternative}
              style={styles.tokenLabel}
            >
              User Information:
            </Text>
            {/* Display user information in this format label: value. iterate using Object.entries */}
            {userInfo && (
              <View>
                {Object.entries(userInfo).map(([label, value]) => (
                  <Text
                    key={label}
                    variant={TextVariant.BodySM}
                    color={TextColor.Alternative}
                  >
                    {label}: {value}
                  </Text>
                ))}
              </View>
            )}
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
