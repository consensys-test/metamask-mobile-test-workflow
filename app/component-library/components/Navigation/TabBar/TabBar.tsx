/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
// External dependencies.
import TabBarItem from '../TabBarItem';
import Routes from '../../../../constants/navigation/Routes';
import { useTheme } from '../../../../util/theme';
import { useTw } from '../../../../hooks/useTwrncTheme';
import { MetaMetricsEvents } from '../../../../core/Analytics';
import { getDecimalChainId } from '../../../../util/networks';
import { useMetrics } from '../../../../components/hooks/useMetrics';

// Internal dependencies.
import { TabBarProps } from './TabBar.types';
import { ICON_BY_TAB_BAR_ICON_KEY, TAB_BAR_HEIGHT } from './TabBar.constants';
import { colors as importedColors } from '../../../../styles/common';
import { AvatarSize } from '../../Avatars/Avatar';
import OnboardingWizard from '../../../../components/UI/OnboardingWizard';
import { selectChainId } from '../../../../selectors/networkController';
import Device from '../../../../util/device';

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const { colors } = useTheme();
  const tw = useTw();
  const { trackEvent, createEventBuilder } = useMetrics();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const chainId = useSelector(selectChainId);
  const tabBarRef = useRef(null);
  /**
   * Current onboarding wizard step
   */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wizardStep = useSelector((reduxState: any) => reduxState.wizard.step);
  /**
   * Return current step of onboarding wizard if not step 5 nor 0
   */
  const renderOnboardingWizard = useCallback(
    () =>
      [4, 5, 6].includes(wizardStep) && (
        <OnboardingWizard navigation={navigation} coachmarkRef={tabBarRef} />
      ),
    [navigation, wizardStep],
  );

  const renderTabBarItem = useCallback(
    (route: { name: string; key: string }, index: number) => {
      const { options } = descriptors[route.key];
      const tabBarIconKey = options.tabBarIconKey;
      const label = options.tabBarLabel as string;
      //TODO: use another option on add it to the prop interface
      const callback = options.callback;
      const rootScreenName = options.rootScreenName;
      const key = `tab-bar-item-${tabBarIconKey}`; // this key is also used to identify elements for e2e testing
      const isSelected = state.index === index;
      const icon = ICON_BY_TAB_BAR_ICON_KEY[tabBarIconKey];
      const onPress = () => {
        callback?.();
        switch (rootScreenName) {
          case Routes.WALLET_VIEW:
            navigation.navigate(Routes.WALLET.HOME, {
              screen: Routes.WALLET.TAB_STACK_FLOW,
              params: {
                screen: Routes.WALLET_VIEW,
              },
            });
            break;
          case Routes.MODAL.WALLET_ACTIONS:
            navigation.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
              screen: Routes.MODAL.WALLET_ACTIONS,
            });
            trackEvent(
              createEventBuilder(MetaMetricsEvents.ACTIONS_BUTTON_CLICKED)
                .addProperties({
                  text: '',
                  chain_id: getDecimalChainId(chainId),
                })
                .build(),
            );
            break;
          case Routes.BROWSER_VIEW:
            navigation.navigate(Routes.BROWSER.HOME, {
              screen: Routes.BROWSER_VIEW,
            });
            break;
          case Routes.TRANSACTIONS_VIEW:
            navigation.navigate(Routes.TRANSACTIONS_VIEW);
            break;
          case Routes.SETTINGS_VIEW:
            navigation.navigate(Routes.SETTINGS_VIEW, {
              screen: 'Settings',
            });
        }
      };

      const isWalletAction = rootScreenName === Routes.MODAL.WALLET_ACTIONS;

      const handleIconColor = () => {
        if (isWalletAction) return colors.primary.inverse;

        if (isSelected) return colors.primary.default;

        return colors.icon.muted;
      };

      const iconProps = {
        size: isWalletAction ? AvatarSize.Md : AvatarSize.Lg,
        backgroundColor: isWalletAction
          ? colors.primary.default
          : importedColors.transparent,
        color: handleIconColor(),
      };

      return (
        <TabBarItem
          key={key}
          label={label}
          icon={icon}
          onPress={onPress}
          iconSize={iconProps.size}
          iconBackgroundColor={iconProps.backgroundColor}
          iconColor={iconProps.color}
          testID={key}
        />
      );
    },
    [
      state,
      descriptors,
      navigation,
      colors,
      chainId,
      trackEvent,
      createEventBuilder,
    ],
  );

  const renderTabBarItems = useCallback(
    () => state.routes.map(renderTabBarItem),
    [state, renderTabBarItem],
  );

  // Modern styling with Tailwind utilities
  const borderStyle = Device.isAndroid()
    ? tw`border-0.5 border-border-muted`
    : tw`shadow-lg shadow-overlay-default`;

  const baseStyle = [
    tw`flex-row items-center bg-background-default px-4`,
    { height: TAB_BAR_HEIGHT, marginBottom: bottomInset },
  ];

  return (
    <>
      <View style={[tw`bg-background-default`, borderStyle]} />
      <View style={baseStyle} ref={tabBarRef}>
        {renderTabBarItems()}
        {renderOnboardingWizard()}
      </View>
    </>
  );
};

export default TabBar;
