import React, { useState, useEffect, useContext } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../../util/theme';
import { useCardSDK } from '../../sdk';
import { getCardNavbarOptions } from '../../../Navbar';
import Logger from '../../../../../util/Logger';
import { createStyle } from './CardOptionsScreen.styles';
import SettingsDrawer from '../../../SettingsDrawer';
import Loader from '../../../../../component-library/components-temp/Loader';
import ClipboardManager from '../../../../../core/ClipboardManager';
import {
  ToastContext,
  ToastVariants,
} from '../../../../../component-library/components/Toast';
import { BaanxUser } from '../../types';

const CardOptionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = createStyle(theme);
  const { logoutFromCard, authToken, getUser } = useCardSDK();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toastRef } = useContext(ToastContext);
  const [userInfo, setUserInfo] = useState<BaanxUser | null>(null);

  useEffect(() => {
    navigation.setOptions(
      getCardNavbarOptions(
        navigation,
        {
          title: 'Card Options',
          showClose: false,
          showGoBack: true,
          showDevOptions: false,
        },
        theme,
      ),
    );
  }, [navigation, theme]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getUser();
      setUserInfo(user);
    };

    fetchUserInfo();
  }, [getUser]);

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
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
            } catch (err) {
              Logger.error(
                err as Error,
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

  const showCopyNotificationToast = (type: 'token' | 'user') => {
    toastRef?.current?.showToast({
      variant: ToastVariants.Plain,
      labelOptions: [
        {
          label:
            type === 'token'
              ? 'Token Copied Successfully'
              : 'User Information Copied Successfully',
          isBold: false,
        },
      ],
      hasNoTimeout: false,
    });
  };

  const handleCopyToken = async () => {
    showCopyNotificationToast('token');
    await ClipboardManager.setString(authToken);
  };

  const handleCopyUserInformation = async () => {
    showCopyNotificationToast('user');
    if (userInfo) await ClipboardManager.setString(JSON.stringify(userInfo));
  };

  if (isLoggingOut) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <SettingsDrawer
        description="Copy authentication token for debugging purposes."
        onPress={handleCopyToken}
        title="Copy authentication token"
        renderArrowRight={false}
      />
      <SettingsDrawer
        description="Copy current user information for debugging purposes."
        onPress={handleCopyUserInformation}
        title="Copy current user information"
        renderArrowRight={false}
      />
      <SettingsDrawer
        description="Clear your authentication token to test the login flow again."
        onPress={handleLogout}
        title="Log Out"
      />
    </View>
  );
};

export default CardOptionsScreen;
