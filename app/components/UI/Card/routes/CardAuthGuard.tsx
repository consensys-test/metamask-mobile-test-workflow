import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useCardSDK } from '../sdk';
import { useTheme } from '../../../../util/theme';
import CardAuthScreen from '../Views/CardAuthScreen/CardAuthScreen';
import Loader from '../../../../component-library/components-temp/Loader';
import { createStyles } from './CardAuthGuard.styles.ts';
import { CardAuthenticatedRoutes } from './index.tsx';

const CardAuthGuard: React.FC = () => {
  const { isAuthenticated, checkExistingToken, sdk } = useCardSDK();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (sdk) {
        try {
          await checkExistingToken();
        } finally {
          setIsInitializing(false);
        }
      } else {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [sdk, checkExistingToken]);

  // Show loading while checking authentication
  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <Loader size="large" color={theme.colors.primary.default} />
      </View>
    );
  }

  // Conditionally render the appropriate screen based on authentication state
  return isAuthenticated ? <CardAuthenticatedRoutes /> : <CardAuthScreen />;
};

export default CardAuthGuard;
