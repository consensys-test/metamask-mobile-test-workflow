import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../../../../constants/navigation/Routes';
import { CardSDKProvider, useCardSDK } from '../sdk';
import CardAuthenticatedScreen from '../Views/CardAuthenticatedScreen';
import CardOptionsScreen from '../Views/CardOptionsScreen/CardOptionsScreen';
import CardAuthScreen from '../Views/CardAuthScreen/CardAuthScreen';

const Stack = createStackNavigator();

export const CardAuthenticatedRoutes = () => (
  <Stack.Navigator initialRouteName={Routes.CARD.HOME} headerMode="screen">
    <Stack.Screen
      name={Routes.CARD.HOME}
      component={CardAuthenticatedScreen}
      options={{
        headerShown: true,
        animationEnabled: false,
      }}
    />
    <Stack.Screen
      name={Routes.CARD.OPTIONS}
      component={CardOptionsScreen}
      options={{
        headerShown: true,
        animationEnabled: false,
      }}
    />
  </Stack.Navigator>
);

const CardRoutesContent = () => {
  const { isAuthenticated, checkExistingToken } = useCardSDK();

  // On mount, try to hydrate auth state from secure storage
  useEffect(() => {
    checkExistingToken();
  }, [checkExistingToken]);

  if (!isAuthenticated) {
    // Unauthenticated flow: show CardAuthScreen with header
    return (
      <Stack.Navigator
        initialRouteName={Routes.CARD.AUTH_GUARD}
        headerMode="screen"
      >
        <Stack.Screen
          name={Routes.CARD.AUTH_GUARD}
          component={CardAuthScreen}
          options={{
            headerShown: true,
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  // Authenticated flow: delegate to authenticated routes (these manage their own headers)
  return <CardAuthenticatedRoutes />;
};

const CardRoutes = () => (
  <CardSDKProvider>
    <CardRoutesContent />
  </CardSDKProvider>
);

export default CardRoutes;
