import SecureKeychain from '../../../../core/SecureKeychain';

const CARD_TOKEN_KEY = 'CARD_AUTH_TOKEN';

const scopeOptions = {
  service: `com.metamask.${CARD_TOKEN_KEY}`,
  accessible: SecureKeychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

interface CardTokenResponse {
  success: boolean;
  token?: string;
  error?: string;
}

interface CardToken {
  token: string;
  expiresAt: number;
}

export async function storeCardToken(
  token: string,
): Promise<CardTokenResponse> {
  try {
    // Set expiration to 5 days (5 * 24 * 60 * 60 * 1000 milliseconds)
    const expiresAt = Date.now() + 5 * 24 * 60 * 60 * 1000;
    const storedToken: CardToken = {
      token,
      expiresAt,
    };

    const stringifiedToken = JSON.stringify(storedToken);

    const storeResult = await SecureKeychain.setSecureItem(
      CARD_TOKEN_KEY,
      stringifiedToken,
      scopeOptions,
    );

    if (storeResult === false) {
      return {
        success: false,
        error: 'Failed to store Card token',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

export async function getCardToken(): Promise<CardTokenResponse> {
  try {
    const secureItem = await SecureKeychain.getSecureItem(scopeOptions);

    if (secureItem) {
      const storedToken: CardToken = JSON.parse(secureItem.value);

      if (Date.now() > storedToken.expiresAt) {
        await resetCardToken();
        return {
          success: false,
          error: 'Token has expired',
        };
      }

      return {
        success: true,
        token: storedToken.token,
      };
    }

    return {
      success: false,
      error: 'No token found',
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

export async function resetCardToken(): Promise<void> {
  await SecureKeychain.clearSecureScope(scopeOptions);
}
