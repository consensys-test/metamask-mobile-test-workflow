import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { View, Image, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../../component-library/components/Texts/Text';
import { useTheme } from '../../../../../util/theme';
import { useCardSDK } from '../../sdk';
import { getCardNavbarOptions } from '../../../Navbar';
import { strings } from '../../../../../../locales/i18n';
import { createStyle } from './CardAuthenticatedScreen.styles';
import {
  BaanxCardDetails,
  BaanxCardStatus,
  BaanxExternalWalletWithPriority,
} from '../../types';
import CardImage from '../../components/CardImage';
import Loader from '../../../../../component-library/components-temp/Loader';
import Logger from '../../../../../util/Logger';
import SpendPriorityBottomSheet from '../../components/SpendPriorityBottomSheet';
import { BottomSheetRef } from '../../../../../component-library/components/BottomSheets/BottomSheet';
import { Button, ButtonVariant } from '@metamask/design-system-react-native';

const CardAuthenticatedScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = createStyle(theme);
  const {
    getExternalWallets,
    authToken,
    getCardStatus,
    getExternalWalletPriority,
    getCardDetails,
    sdk,
  } = useCardSDK();
  const [loading, setLoading] = useState(true);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [error, setError] = useState(false);
  const [externalWallets, setExternalWallets] = useState<
    BaanxExternalWalletWithPriority[] | null
  >(null);
  const [openSpendPriorityBottomSheet, setOpenSpendPriorityBottomSheet] =
    useState(false);
  const [cardDetailsImage, setCardDetailsImage] =
    useState<BaanxCardDetails | null>(null);
  const [cardStatus, setCardStatus] = useState<BaanxCardStatus | null>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  useEffect(() => {
    navigation.setOptions(
      getCardNavbarOptions(
        navigation,
        {
          title: strings('card.card') || 'MetaMask Card',
          showClose: true,
          showDevOptions: true,
        },
        theme,
      ),
    );
  }, [navigation, theme]);

  // Fetch card-related data once per authToken change to avoid re-fetch loops
  const lastFetchedAuthToken = useRef<string | null>(null);
  useEffect(() => {
    if (!authToken) {
      return;
    }

    // Prevent repeated fetches for the same token
    if (lastFetchedAuthToken.current === authToken) {
      return;
    }
    lastFetchedAuthToken.current = authToken;

    let isMounted = true;
    const fetchData = async () => {
      try {
        const [wallets, walletsPriority, status] = await Promise.all([
          getExternalWallets(),
          getExternalWalletPriority(),
          getCardStatus(),
        ]);

        if (!isMounted) return;

        setCardStatus(status);

        if (wallets?.length && walletsPriority?.length) {
          const walletsWithPriority = wallets.map((wallet) => {
            const priority = walletsPriority.find(
              (p) => p.currency.toLowerCase() === wallet.currency.toLowerCase(),
            );
            const sdkSupportedTokens = sdk?.supportedTokens;
            Logger.log('sdkSupportedTokens', sdkSupportedTokens);
            const supportedToken = sdkSupportedTokens?.find(
              (token) =>
                token?.symbol?.toLowerCase() === wallet.currency.toLowerCase(),
            );
            Logger.log('supportedToken', supportedToken);
            if (!priority) {
              return {
                ...wallet,
                id: 0,
                priority: 0,
              };
            }

            const aggregatedWallet: BaanxExternalWalletWithPriority = {
              ...wallet,
              ...priority,
            };

            if (supportedToken) {
              aggregatedWallet.tokenAddress = supportedToken.address;
              aggregatedWallet.decimals = supportedToken.decimals;
              aggregatedWallet.name = supportedToken.name;
            }

            return aggregatedWallet;
          });
          // sort to the highest priority first
          walletsWithPriority.sort((a, b) => b.priority - a.priority);
          setExternalWallets(walletsWithPriority);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(true);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [
    authToken,
    getExternalWallets,
    getExternalWalletPriority,
    getCardStatus,
    sdk,
  ]);

  const isMetal = useMemo(() => cardStatus?.type === 'METAL', [cardStatus]);

  const fetchCardDetails = async () => {
    if (!authToken) {
      Logger.error(new Error('No auth token'), 'Card details fetch failed');
      return;
    }

    try {
      const cardDetails = await getCardDetails(isMetal);
      if (cardDetails) {
        setCardDetailsImage(cardDetails);
      }
    } catch (err) {
      Logger.error(err as Error, 'Error fetching card details');
    }
  };

  const changeSwitch = (value: boolean) => {
    setIsSwitchEnabled(value);
    if (value) {
      fetchCardDetails();
    } else {
      setCardDetailsImage(null);
    }
  };

  const renderSpendPriorityBottomSheet = useCallback(
    () => (
      <SpendPriorityBottomSheet
        sheetRef={sheetRef}
        setOpenSpendPriorityBottomSheet={setOpenSpendPriorityBottomSheet}
        tokens={externalWallets ?? []}
      />
    ),
    [sheetRef, setOpenSpendPriorityBottomSheet, externalWallets],
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text variant={TextVariant.BodySM} color={TextColor.Error}>
          Error loading Card information
        </Text>
      ) : (
        <View style={styles.cardImageContainer}>
          {cardDetailsImage ? (
            <Image
              source={{ uri: cardDetailsImage.imageUrl }}
              style={styles.cardDetailsImage}
            />
          ) : (
            <CardImage
              isMetal={isMetal}
              allowance={externalWallets?.[0]?.allowance}
              currency={externalWallets?.[0]?.currency}
              address={externalWallets?.[0]?.address}
            />
          )}
        </View>
      )}

      <View style={styles.seeCardDetailsContainer}>
        <Text variant={TextVariant.HeadingSM}>View credit card details</Text>
        <Switch
          value={isSwitchEnabled}
          onValueChange={changeSwitch}
          disabled={!cardStatus}
        />
      </View>

      <View style={styles.divider} />

      <Button
        variant={ButtonVariant.Primary}
        onPress={() => setOpenSpendPriorityBottomSheet(true)}
        isFullWidth
      >
        Spend Priority
      </Button>

      {openSpendPriorityBottomSheet && renderSpendPriorityBottomSheet()}
    </View>
  );
};

export default CardAuthenticatedScreen;
