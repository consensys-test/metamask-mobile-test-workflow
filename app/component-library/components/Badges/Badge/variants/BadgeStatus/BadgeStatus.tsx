/* eslint-disable react/prop-types */

// Third library dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import BadgeBase from '../../foundation/BadgeBase';

// Internal dependencies
import { BadgeStatusProps, BadgeStatusState } from './BadgeStatus.types';
import {
  BADGE_STATUS_TEST_ID,
  DEFAULT_BADGESTATUS_STATE,
} from './BadgeStatus.constants';

const BadgeStatus = ({
  style,
  state = DEFAULT_BADGESTATUS_STATE,
  borderColor,
}: BadgeStatusProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBadgeStyles = () => {
    let stateClasses = '';

    switch (state) {
      case BadgeStatusState.Active:
        stateClasses = 'bg-success-default';
        break;
      case BadgeStatusState.Inactive:
        stateClasses = 'bg-text-muted';
        break;
      case BadgeStatusState.Warning:
        stateClasses = 'bg-warning-default';
        break;
      case BadgeStatusState.Error:
        stateClasses = 'bg-error-default';
        break;
      default:
        stateClasses = 'bg-text-muted';
    }

    const borderClasses = borderColor ? 'border-2' : '';

    return [
      tw`w-2 h-2 rounded-full ${stateClasses} ${borderClasses}`,
      borderColor ? { borderColor } : {},
      style,
    ];
  };

  return (
    <BadgeBase style={getBadgeStyles()} testID={BADGE_STATUS_TEST_ID}>
      <View />
    </BadgeBase>
  );
};

export default BadgeStatus;
