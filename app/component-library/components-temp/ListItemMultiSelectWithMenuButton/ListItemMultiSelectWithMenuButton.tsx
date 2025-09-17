/* eslint-disable react/prop-types */

// Third party dependencies.
import React, { useRef } from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
  View,
  Platform,
  GestureResponderEvent,
} from 'react-native';

// External dependencies.
import { useStyles } from '../../hooks';
import ListItem from '../../../component-library/components/List/ListItem/ListItem';
import Checkbox from '../../components/Checkbox';

// Internal dependencies.
import styleSheet from './ListItemMultiSelectWithMenuButton.styles';
import { ListItemMultiSelectWithMenuButtonProps } from './ListItemMultiSelectWithMenuButton.types';
import {
  BUTTON_TEST_ID,
  DEFAULT_LIST_ITEM_MULTISELECT_WITH_MENU_BUTTON_GAP,
} from './ListItemMultiSelectWithMenuButton.constants';
import ButtonIcon from '../../../component-library/components/Buttons/ButtonIcon';
import {
  IconColor,
  IconName,
} from '../../../component-library/components/Icons/Icon';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const TouchableOpacity = ({
  onPress,
  disabled,
  children,
  ...props
}: TouchableOpacityProps & {
  children?: React.ReactNode;
}) => {
  const isDisabled = disabled || (props as { isDisabled?: boolean }).isDisabled;

  // Double-click prevention logic for Android (non-test environments only)
  const lastPressTime = useRef(0);
  const COORDINATION_WINDOW = 100; // 100ms window for TalkBack compatibility

  const handlePress = (pressEvent?: GestureResponderEvent) => {
    if (!onPress || isDisabled) return;

    // Skip coordination logic in test environments
    if (process.env.NODE_ENV === 'test') {
      if (pressEvent) {
        onPress(pressEvent);
      }
      return;
    }

    const now = Date.now();
    const timeSinceLastPress = now - lastPressTime.current;

    if (timeSinceLastPress > COORDINATION_WINDOW) {
      lastPressTime.current = now;
      if (pressEvent) {
        onPress(pressEvent);
      }
    }
  };

  // Gesture detection for ScrollView compatibility on Android
  const tap = Gesture.Tap()
    .runOnJS(true)
    .shouldCancelWhenOutside(false)
    .maxDeltaX(20) // Allow some movement while tapping
    .maxDeltaY(20)
    .onEnd((gestureEvent) => {
      if (onPress && !isDisabled) {
        // Create a proper GestureResponderEvent-like object from gesture event
        const syntheticEvent = {
          nativeEvent: {
            locationX: gestureEvent.x || 0,
            locationY: gestureEvent.y || 0,
            pageX: gestureEvent.absoluteX || 0,
            pageY: gestureEvent.absoluteY || 0,
            timestamp: Date.now(),
          },
          persist: () => {
            /* no-op for synthetic event */
          },
          preventDefault: () => {
            /* no-op for synthetic event */
          },
          stopPropagation: () => {
            /* no-op for synthetic event */
          },
        } as GestureResponderEvent;

        handlePress(syntheticEvent);
      }
    });

  return (
    <GestureDetector gesture={tap}>
      <RNTouchableOpacity
        disabled={isDisabled}
        onPress={handlePress} // Use our handlePress with double-click prevention
        {...props}
        // Ensure disabled prop is available to tests
        {...(process.env.NODE_ENV === 'test' && { disabled: isDisabled })}
      >
        {children}
      </RNTouchableOpacity>
    </GestureDetector>
  );
};

const ListItemMultiSelectWithMenuButton: React.FC<
  ListItemMultiSelectWithMenuButtonProps
> = ({
  style,
  isSelected = false,
  isDisabled = false,
  children,
  gap = DEFAULT_LIST_ITEM_MULTISELECT_WITH_MENU_BUTTON_GAP,
  showButtonIcon = true,
  buttonIcon = IconName.MoreVertical,
  buttonProps,
  ...props
}) => {
  const { styles } = useStyles(styleSheet, {
    style,
    gap,
    isDisabled,
    isSelected,
  });

  // Disable gesture wrapper in test environments to prevent test interference
  const isE2ETest =
    process.env.IS_TEST === 'true' ||
    process.env.METAMASK_ENVIRONMENT === 'e2e';
  const isUnitTest = process.env.NODE_ENV === 'test';
  const TouchableComponent =
    Platform.OS === 'android' && !isE2ETest && !isUnitTest
      ? TouchableOpacity
      : RNTouchableOpacity;

  return (
    <View style={styles.container}>
      <TouchableComponent
        style={styles.base}
        disabled={isDisabled}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        {...props}
      >
        <ListItem gap={gap} style={styles.containerColumn}>
          <Checkbox isChecked={isSelected} onPressIn={props.onPress} />
          {children}
        </ListItem>
      </TouchableComponent>
      {showButtonIcon ? (
        <View style={styles.buttonIcon}>
          <ButtonIcon
            iconName={buttonIcon}
            iconColor={IconColor.Default}
            testID={buttonProps?.buttonTestId || BUTTON_TEST_ID}
            onPress={buttonProps?.onButtonClick}
            accessibilityRole="button"
          />
        </View>
      ) : null}
    </View>
  );
};

export default ListItemMultiSelectWithMenuButton;
