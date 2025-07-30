import { Hex } from '@metamask/utils';

type TokenBalances = Record<Hex, Record<Hex, Record<Hex, Hex>>>;

/**
 * Scans through all chains for the given user and returns the token
 * address with the highest balance that isn’t the priorityToken.
 * If there’s no other token, returns null.
 */
export const pickSourceSwapToken = (
  tokenBalances: TokenBalances,
  userAddress: Hex,
  priorityToken: string,
): {
  token: string | null;
  chainId: Hex | null;
} => {
  const chains = tokenBalances[userAddress];
  if (!chains) return { token: null, chainId: null };

  let topToken: string | null = null;
  let chainId: Hex | null = null;
  let topBalance = 0n;

  for (const tokenMap of Object.values(chains)) {
    for (const [token, hexBalance] of Object.entries(tokenMap)) {
      // skip the priority token entirely
      if (token === priorityToken) continue;

      const balance = BigInt(hexBalance);
      if (balance > topBalance) {
        topBalance = balance;
        topToken = token;
        chainId = Object.keys(tokenMap)[0] as Hex; // Assuming the first key is the chain ID
      }
    }
  }

  return { token: topToken, chainId };
};
