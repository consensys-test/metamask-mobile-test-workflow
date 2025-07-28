import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import useThunkDispatch from '../../../hooks/useThunkDispatch';
import { selectCardFeatureFlag } from '../../../../selectors/featureFlagController/card';
import { RootState } from '../../../../reducers';
import {
  loadCardholderAccountsFailure,
  loadCardholderAccountsRequest,
  loadCardholderAccountsSuccess,
} from '../../../../actions/card';
import { CardAction } from '../../../../actions/card/types';
import { CardSDK } from '../sdk/CardSDK';
import { LINEA_CHAIN_ID } from '@metamask/swaps-controller/dist/constants';
import Logger from '../../../../util/Logger';
import {
  selectAppServicesReady,
  selectUserLoggedIn,
} from '../../../../reducers/user';
import { selectInternalAccountsWithCaipAccountId } from '../../../../selectors/accountsController';

/**
 * Hook that automatically checks for cardholder accounts when conditions are met
 * This should be used once in the App component to trigger the check
 */
export const useCardholderCheck = () => {
  const dispatchThunk = useThunkDispatch();
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const appServicesReady = useSelector(selectAppServicesReady);
  const cardFeatureFlag = useSelector(selectCardFeatureFlag);
  const accounts = useSelector(selectInternalAccountsWithCaipAccountId);

  /**
   * Get accounts from the engine state
   */
  const getAccountsFromEngine =
    useCallback((): `${string}:${string}:${string}`[] => {
      if (!accounts) {
        return [];
      }

      const supportedAccounts = Object.values(accounts).filter(
        (account) => account.type === 'eip155:eoa',
      );

      // Extract account addresses and format them as required by CardSDK
      return Object.values(supportedAccounts).map(
        (account) => account.caipAccountId,
      );
    }, [accounts]);

  const checkCardholderAccounts = useCallback(
    (): ThunkAction<Promise<void>, RootState, unknown, CardAction> =>
      async (dispatch) => {
        try {
          if (!cardFeatureFlag) {
            return;
          }

          dispatch(loadCardholderAccountsRequest());

          const formattedAccounts = getAccountsFromEngine();

          Logger.log('formattedAccounts', formattedAccounts);

          if (!formattedAccounts.length) {
            dispatch(loadCardholderAccountsSuccess([]));
            return;
          }

          const cardSDK = new CardSDK({
            cardFeatureFlag,
            rawChainId: LINEA_CHAIN_ID,
          });

          // Call isCardHolder method
          const result = await cardSDK.isCardHolder(
            formattedAccounts as `eip155:${string}:0x${string}`[],
          );

          // Extract just the addresses for storage
          const cardholderAddresses = result.cardholderAccounts.map(
            (account) => account.split(':')[2],
          );

          dispatch(loadCardholderAccountsSuccess(cardholderAddresses));
        } catch (error) {
          const errorInstance =
            error instanceof Error ? error : new Error(String(error));
          Logger.error(
            errorInstance,
            'Card: Error loading cardholder accounts',
          );
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';
          dispatch(loadCardholderAccountsFailure(errorMessage));
        }
      },
    [cardFeatureFlag, getAccountsFromEngine],
  );

  useEffect(() => {
    if (userLoggedIn && appServicesReady) {
      dispatchThunk(checkCardholderAccounts());
    }
  }, [
    userLoggedIn,
    appServicesReady,
    cardFeatureFlag,
    dispatchThunk,
    checkCardholderAccounts,
    accounts,
  ]);
};
