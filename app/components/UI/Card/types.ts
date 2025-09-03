import { ethers } from 'ethers';
import { FlashListAssetKey } from '../Tokens/TokenList';

/**
 * Enum for asset delegation status
 */
export enum AllowanceState {
  Enabled = 'enabled',
  Limited = 'limited',
  NotEnabled = 'not_enabled',
}

// Helper interface for token balances
export interface CardToken {
  address: string | null;
  decimals: number | null;
  symbol: string | null;
  name: string | null;
}

export type CardTokenAllowance = {
  allowanceState: AllowanceState;
  allowance: ethers.BigNumber;
} & FlashListAssetKey &
  CardToken;

export interface BaanxUser {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  verificationState: string;
  createdAt: string;
}

export interface BaanxExternalWallet {
  address: string;
  currency: string;
  balance: string;
  allowance: string;
  chain: string;
}

export interface BaanxExternalWalletPriority {
  address: string;
  chain: string;
  currency: string;
  id: number;
  priority: number;
}

export interface BaanxCardStatus {
  id: string;
  holderName: string;
  expiryDate: string;
  panLast4: string;
  status: string;
  type: string;
  orderedAt: string;
}

export interface BaanxCardDetails {
  token: string;
  hostedPageUrl: string;
  imageUrl: string;
}

export interface BaanxExternalWalletWithPriority
  extends BaanxExternalWallet,
    BaanxExternalWalletPriority {
  tokenAddress?: string | null;
  decimals?: number | null;
  name?: string | null;
}
