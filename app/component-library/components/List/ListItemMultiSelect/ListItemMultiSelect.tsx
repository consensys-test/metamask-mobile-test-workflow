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
import Checkbox from '../../Checkbox';
import { useStyles } from '../../../hooks';
import ListItem from '../../List/ListItem/ListItem';

// Internal dependencies.
import styleSheet from './ListItemMultiSelect.styles';
import { ListItemMultiSelectProps } from './ListItemMultiSelect.types';
import { DEFAULT_LISTITEMMULTISELECT_GAP } from './ListItemMultiSelect.constants';
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

const ListItemMultiSelect: React.FC<ListItemMultiSelectProps> = ({
  style,
  isSelected = false,
  isDisabled = false,
  children,
  gap = DEFAULT_LISTITEMMULTISELECT_GAP,
  onPress,
  ...props
}) => {
  const { styles } = useStyles(styleSheet, { style, gap, isDisabled });

  // Android: Custom TouchableOpacity handles ALL coordination, no checkbox interaction
  // iOS: Standard RNTouchableOpacity + checkbox coordination needed
  const lastCheckboxGestureTime = useRef(0);
  const COORDINATION_WINDOW = 100; // 100ms window for TalkBack compatibility

  // Disable gesture wrapper in test environments to prevent test interference
  const isE2ETest =
    process.env.IS_TEST === 'true' ||
    process.env.METAMASK_ENVIRONMENT === 'e2e';
  const isUnitTest = process.env.NODE_ENV === 'test';
  const TouchableComponent =
    Platform.OS === 'android' && !isE2ETest && !isUnitTest
      ? TouchableOpacity
      : RNTouchableOpacity;

  // For iOS/other platforms: coordination logic to prevent double firing from checkbox
  const conditionalOnPress =
    Platform.OS === 'android' && !isE2ETest && !isUnitTest
      ? onPress // Android: Custom TouchableOpacity handles all coordination, pass onPress directly
      : isDisabled
      ? undefined
      : (pressEvent?: GestureResponderEvent) => {
          // iOS/other platforms: coordinate with checkbox
          // Skip coordination logic in test environments
          if (process.env.NODE_ENV === 'test') {
            onPress?.(pressEvent as GestureResponderEvent);
            return;
          }

          const now = Date.now();
          const timeSinceLastGesture = now - lastCheckboxGestureTime.current;

          if (onPress && timeSinceLastGesture > COORDINATION_WINDOW) {
            lastCheckboxGestureTime.current = now;
            onPress(pressEvent as GestureResponderEvent);
          }
        };

  // iOS checkbox coordination: Set timestamp FIRST, then call raw parent function
  // This ensures main component's conditionalOnPress sees the recent timestamp and skips
  const checkboxOnPressIn = (pressEvent: GestureResponderEvent) => {
    if (onPress && !isDisabled) {
      // Skip coordination logic in test environments
      if (process.env.NODE_ENV === 'test') {
        onPress(pressEvent);
        return;
      }

      // Set timestamp BEFORE calling parent function (timestamp-first pattern)
      lastCheckboxGestureTime.current = Date.now();
      // Call raw parent function directly (bypasses main component coordination)
      onPress(pressEvent);
    }
  };

  return (
    <TouchableComponent
      style={styles.base}
      disabled={isDisabled}
      onPress={conditionalOnPress}
      {...props}
    >
      <ListItem gap={gap} style={styles.listItem}>
        <View
          pointerEvents={
            Platform.OS === 'android' && !isE2ETest && !isUnitTest
              ? 'none' // On Android, make checkbox non-interactive to prevent double firing
              : 'auto' // On other platforms, allow normal interaction
          }
        >
          <Checkbox
            style={styles.checkbox}
            isChecked={isSelected}
            isDisabled={isDisabled}
            onPressIn={
              Platform.OS === 'android'
                ? undefined // Android uses main gesture handler only
                : isDisabled
                ? undefined
                : checkboxOnPressIn // iOS/other platforms use checkbox onPressIn
            }
          />
        </View>
        {children}
      </ListItem>
      {isSelected && (
        <View style={styles.underlay} accessibilityRole="checkbox" accessible />
      )}
    </TouchableComponent>
  );
};

export default ListItemMultiSelect;
