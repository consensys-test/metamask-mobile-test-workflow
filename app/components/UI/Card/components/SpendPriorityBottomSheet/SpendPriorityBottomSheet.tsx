import React from 'react';
import BottomSheet, {
  BottomSheetRef,
} from '../../../../../component-library/components/BottomSheets/BottomSheet';
import BottomSheetHeader from '../../../../../component-library/components/BottomSheets/BottomSheetHeader';
import Text, {
  TextVariant,
} from '../../../../../component-library/components/Texts/Text';
import { FlatList } from 'react-native-gesture-handler';
import { AllowanceState, BaanxExternalWalletWithPriority } from '../../types';
import { CardHomeSelectors } from '../../../../../../e2e/selectors/Card/CardHome.selectors';
import CardAssetItem from '../CardAssetItem';
import { BigNumber } from 'ethers';
import { NETWORKS_CHAIN_ID } from '../../../../../constants/network';
import { StyleSheet, View } from 'react-native';

export interface SpendPriorityBottomSheetProps {
  setOpenSpendPriorityBottomSheet: (open: boolean) => void;
  sheetRef: React.RefObject<BottomSheetRef>;
  tokens: BaanxExternalWalletWithPriority[];
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  assetItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  assetItemText: {
    marginRight: 8,
  },
});

const SpendPriorityBottomSheet: React.FC<SpendPriorityBottomSheetProps> = ({
  setOpenSpendPriorityBottomSheet,
  sheetRef,
  tokens,
}) => (
  <BottomSheet
    ref={sheetRef}
    shouldNavigateBack={false}
    onClose={() => {
      setOpenSpendPriorityBottomSheet(false);
    }}
    testID={CardHomeSelectors.ADD_FUNDS_BOTTOM_SHEET}
    keyboardAvoidingViewEnabled={false}
  >
    <BottomSheetHeader onClose={() => setOpenSpendPriorityBottomSheet(false)}>
      <Text variant={TextVariant.HeadingSM}>Spending preference</Text>
    </BottomSheetHeader>
    <FlatList
      scrollEnabled={false}
      data={tokens}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.assetItemContainer}>
          <CardAssetItem
            privacyMode={false}
            assetKey={{
              address: item.tokenAddress ?? item.address,
              symbol: item.currency?.toUpperCase(),
              decimals: item.decimals ?? 18,
              name: item.name ?? item.currency,
              allowance: BigNumber.from(0),
              allowanceState: AllowanceState.Enabled,
              chainId:
                item.chain === 'linea'
                  ? NETWORKS_CHAIN_ID.LINEA_MAINNET
                  : 'solana',
              isStaked: false,
            }}
          />
        </View>
      )}
      keyExtractor={(item) => item.currency}
    />
  </BottomSheet>
);

export default SpendPriorityBottomSheet;
