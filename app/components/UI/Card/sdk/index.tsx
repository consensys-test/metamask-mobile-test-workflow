import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';

import { CardSDK } from './CardSDK';
import { selectCardFeatureFlag } from '../../../../selectors/featureFlagController/card';
import { useCardholderCheck } from '../hooks/useCardholderCheck';
import { LINEA_CHAIN_ID } from '@metamask/swaps-controller/dist/constants';
import {
  getCardToken,
  resetCardToken,
  storeCardToken,
} from '../utils/CardTokenVault';
import Logger from '../../../../util/Logger';
import { BaanxUser } from '../types';

export interface ICardSDK {
  sdk: CardSDK | null;
  sdkError?: Error;
  isAuthenticated: boolean;
  authToken?: string;
  setAuthToken: (token: string) => Promise<boolean>;
  logoutFromCard: () => Promise<void>;
  checkExistingToken: () => Promise<boolean>;
  generateAuthorizationLink: (input?: {
    redirectUrl?: string;
    state?: string;
  }) => Promise<string | null>;
  getUser: () => Promise<BaanxUser | null>;
  getExternalWallet: () => Promise<any>;
}

interface ProviderProps<T> {
  value?: T;
  children?: React.ReactNode;
}

const CardSDKContext = createContext<ICardSDK | undefined>(undefined);

export const CardSDKProvider = ({
  value,
  ...props
}: ProviderProps<ICardSDK>) => {
  const cardFeatureFlag = useSelector(selectCardFeatureFlag);

  const [sdk, setSdk] = useState<CardSDK | null>(null);
  const [sdkError, setSdkError] = useState<Error>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>();

  // Initialize CardholderSDK if card feature flag is enabled and chain ID is selected
  useEffect(() => {
    try {
      if (cardFeatureFlag) {
        const cardSDK = new CardSDK({
          cardFeatureFlag,
          rawChainId: LINEA_CHAIN_ID,
        });
        setSdk(cardSDK);
        setSdkError(undefined);
      } else {
        setSdk(null);
      }
    } catch (error) {
      setSdkError(error as Error);
    }
  }, [cardFeatureFlag]);

  // Update authentication state when token or SDK changes
  useEffect(() => {
    if (sdk && authToken) {
      sdk.setAuthenticationToken(authToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [sdk, authToken]);

  const checkExistingToken = useCallback(async () => {
    try {
      const tokenResponse = await getCardToken();
      if (tokenResponse.success && tokenResponse.token) {
        setAuthToken(tokenResponse.token);
        return true;
      }
      return false;
    } catch (error) {
      Logger.error(error as Error, 'Error checking existing card token');
      return false;
    }
  }, []);

  const setAuthTokenCallback = useCallback(
    async (token: string): Promise<boolean> => {
      try {
        const storeResult = await storeCardToken(token);
        if (storeResult.success) {
          setAuthToken(token);
          return true;
        }
        return false;
      } catch (error) {
        Logger.error(error as Error, 'Error setting card auth token');
        return false;
      }
    },
    [],
  );

  const logoutFromCard = useCallback(async () => {
    await resetCardToken();
    setAuthToken(undefined);
  }, []);

  const generateAuthorizationLink = useCallback(
    async (input?: {
      redirectUrl?: string;
      state?: string;
    }): Promise<string | null> => {
      if (!sdk) {
        Logger.error(
          new Error('SDK not initialized'),
          'Card SDK not initialized for authorization link generation',
        );
        return null;
      }

      try {
        return await sdk.generateAuthorizationLink(input);
      } catch (error) {
        Logger.error(
          error as Error,
          'Error generating card authorization link',
        );
        return null;
      }
    },
    [sdk],
  );

  const getUser = useCallback(async () => {
    if (!sdk) {
      Logger.error(
        new Error('SDK not initialized'),
        'Card SDK not initialized for user retrieval',
      );
      return null;
    }

    try {
      return await sdk.getUser();
    } catch (error) {
      Logger.error(error as Error, 'Error retrieving card user info');
      return null;
    }
  }, [sdk]);

  const getExternalWallet = useCallback(async () => {
    if (!sdk) {
      Logger.error(
        new Error('SDK not initialized'),
        'Card SDK not initialized for external wallet retrieval',
      );
      return null;
    }

    try {
      return await sdk.getExternalWallet();
    } catch (error) {
      Logger.error(
        error as Error,
        'Error retrieving card external wallet info',
      );
      return null;
    }
  }, [sdk]);

  const contextValue = useMemo(
    (): ICardSDK => ({
      sdk,
      sdkError,
      isAuthenticated,
      authToken,
      setAuthToken: setAuthTokenCallback,
      logoutFromCard,
      checkExistingToken,
      generateAuthorizationLink,
      getUser,
      getExternalWallet,
    }),
    [
      sdk,
      sdkError,
      isAuthenticated,
      authToken,
      setAuthTokenCallback,
      logoutFromCard,
      checkExistingToken,
      generateAuthorizationLink,
      getUser,
      getExternalWallet,
    ],
  );

  return <CardSDKContext.Provider value={value || contextValue} {...props} />;
};

export const useCardSDK = () => {
  const contextValue = useContext(CardSDKContext);
  if (!contextValue) {
    throw new Error('useCardSDK must be used within a CardSDKProvider');
  }
  return contextValue;
};

export const withCardSDK =
  (Component: React.ComponentType) => (props: Record<string, unknown>) =>
    (
      <CardSDKProvider>
        <Component {...props} />
      </CardSDKProvider>
    );

export const CardVerification: React.FC = () => {
  useCardholderCheck();

  return null;
};

export default CardSDKContext;
