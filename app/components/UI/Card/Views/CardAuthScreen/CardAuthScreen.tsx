import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
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
import WebView, { WebViewNavigation } from '@metamask/react-native-webview';

const CardAuthScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { generateAuthorizationLink, setAuthToken } = useCardSDK();

  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      webView: {
        flex: 1,
      },
    }),
    [colors.background.default],
  );

  const handleGenerateAuthLink = async () => {
    setIsLoading(true);
    try {
      const redirectUrl = 'https://example.com';
      const state = 'card-auth-state';

      const url = await generateAuthorizationLink({
        redirectUrl,
        state,
      });

      if (url) {
        setAuthUrl(url);
        Logger.log('Card auth URL generated successfully', { url });
      } else {
        Logger.error(
          new Error('Failed to generate authorization URL'),
          'Card auth URL generation failed',
        );
      }
    } catch (error) {
      Logger.error(
        error as Error,
        'Failed to generate card authorization link',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenReceived = async (token: string) => {
    setIsLoading(true);
    try {
      const success = await setAuthToken(token);
      if (success) {
        Logger.log('Card authentication successful');
        setAuthUrl(null);
        // Authentication state change will trigger re-render in CardAuthGuard
      } else {
        Logger.error(
          new Error('Failed to store authentication token'),
          'Card authentication failed',
        );
      }
    } catch (error) {
      Logger.error(error as Error, 'Card authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebViewNavigationStateChange = (event: WebViewNavigation) => {
    if (event.url.includes('example.com')) {
      // Extract the token from the URL
      const sampleURL = new URL(event.url);
      const token = sampleURL.searchParams.get('token');

      if (token) {
        handleTokenReceived(token);
      }
    }
  };

  if (authUrl) {
    return (
      <WebView
        key={authUrl}
        source={{ uri: authUrl }}
        style={styles.webView}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          variant={TextVariant.HeadingLG}
          color={TextColor.Default}
          style={styles.title}
        >
          Welcome to MetaMask Card
        </Text>

        <Text
          variant={TextVariant.BodyMD}
          color={TextColor.Alternative}
          style={styles.description}
        >
          To continue, please authenticate your account to access Card features.
        </Text>

        <Button
          variant={ButtonVariants.Primary}
          size={ButtonSize.Lg}
          label={isLoading ? 'Generating...' : 'Start Authentication'}
          onPress={handleGenerateAuthLink}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default CardAuthScreen;
