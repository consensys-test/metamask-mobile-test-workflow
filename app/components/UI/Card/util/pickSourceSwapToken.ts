import { TokenListToken } from '@metamask/assets-controllers';
import { Hex } from '@metamask/utils';
import Logger from '../../../../util/Logger';

type TokenBalances = Record<Hex, Record<Hex, Record<Hex, Hex>>>;

interface Input {
  tokenBalances: TokenBalances;
  userAddress: Hex;
  targetChainId: Hex;
  priorityToken: Hex;
  tokenList: TokenListToken[];
}

interface Output {
  token: Hex | null;
  chainId: Hex | null;
}

/**
 * Finds the non-priority token with the highest balance (normalized for comparison)
 * on a single specified chain. Returns { token, chainId } or { null, null }.
 * If the highest balance token is the priority token, it is skipped and the next highest is chosen.
 */
export const pickSourceSwapTokenForChain = (input: Input): Output => {
  const {
    tokenBalances,
    userAddress,
    targetChainId,
    priorityToken,
    tokenList,
  } = input;
  const chains = tokenBalances[userAddress];
  if (!chains) {
    return { token: null, chainId: null };
  }

  const tokenMap = chains[targetChainId];
  if (!tokenMap) {
    return { token: null, chainId: null };
  }

  Logger.log('tokenMap', tokenMap);

  let topToken: Hex | null = null;
  let topBalance = 0n;

  for (const [token, hexBal] of Object.entries(tokenMap) as [Hex, Hex][]) {
    if (token.toLowerCase() === priorityToken.toLowerCase()) {
      continue;
    }

    const decimals =
      tokenList.find((t) => t.address.toLowerCase() === token.toLowerCase())
        ?.decimals ?? 18;
    const raw = BigInt(hexBal);
    const normalizedBalance = raw * 10n ** BigInt(18 - decimals);

    if (normalizedBalance > topBalance) {
      topBalance = normalizedBalance;
      topToken = token;
    }
  }

  return {
    token: topToken,
    chainId: topToken ? targetChainId : null,
  };
};
