import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../../../../constants/navigation/Routes';
import CardAuthGuard from './CardAuthGuard';
import { CardSDKProvider } from '../sdk';
import CardAuthenticatedScreen from '../Views/CardAuthenticatedScreen';

const Stack = createStackNavigator();

const CardRoutes = () => (
  <CardSDKProvider>
    <Stack.Navigator
      initialRouteName={Routes.CARD.AUTH_GUARD}
      headerMode="screen"
    >
      <Stack.Screen
        name={Routes.CARD.AUTH_GUARD}
        component={CardAuthGuard}
        options={{
          headerShown: true,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  </CardSDKProvider>
);

export const CardAuthenticatedRoutes = () => (
  <Stack.Navigator initialRouteName={Routes.CARD.HOME} headerMode="screen">
    <Stack.Screen
      name={Routes.CARD.HOME}
      component={CardAuthenticatedScreen}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />
  </Stack.Navigator>
);

export default CardRoutes;
