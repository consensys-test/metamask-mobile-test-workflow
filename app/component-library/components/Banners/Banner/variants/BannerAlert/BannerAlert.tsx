/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';

// External dependencies.
import { useTw } from '../../../../../../hooks/useTwrncTheme';
import BannerBase from '../../foundation/BannerBase';
import Icon from '../../../../Icons/Icon';

// Internal dependencies.
import { BannerAlertProps, BannerAlertSeverity } from './BannerAlert.types';
import {
  DEFAULT_BANNERALERT_SEVERITY,
  DEFAULT_BANNERALERT_ICONSIZE,
  ICONNAME_BY_BANNERALERTSEVERITY,
  BANNERALERT_TEST_ID,
} from './BannerAlert.constants';

const BannerAlert: React.FC<BannerAlertProps> = ({
  style,
  severity = DEFAULT_BANNERALERT_SEVERITY,
  ...props
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBannerStyles = () => {
    let severityClasses = '';

    switch (severity) {
      case BannerAlertSeverity.Info:
        severityClasses = 'bg-info-muted border-info-default';
        break;
      case BannerAlertSeverity.Warning:
        severityClasses = 'bg-warning-muted border-warning-default';
        break;
      case BannerAlertSeverity.Error:
        severityClasses = 'bg-error-muted border-error-default';
        break;
      case BannerAlertSeverity.Success:
        severityClasses = 'bg-success-muted border-success-default';
        break;
      default:
        severityClasses = 'bg-info-muted border-info-default';
    }

    return [tw`${severityClasses}`, style];
  };

  const getSeverityIconColor = () => {
    switch (severity) {
      case BannerAlertSeverity.Info:
        return tw.color('info-default');
      case BannerAlertSeverity.Warning:
        return tw.color('warning-default');
      case BannerAlertSeverity.Error:
        return tw.color('error-default');
      case BannerAlertSeverity.Success:
        return tw.color('success-default');
      default:
        return tw.color('info-default');
    }
  };

  const severityIcon = (
    <Icon
      name={ICONNAME_BY_BANNERALERTSEVERITY[severity]}
      color={getSeverityIconColor()}
      size={DEFAULT_BANNERALERT_ICONSIZE}
    />
  );

  return (
    <BannerBase
      style={getBannerStyles()}
      startAccessory={severityIcon}
      testID={BANNERALERT_TEST_ID}
      {...props}
    />
  );
};

export default BannerAlert;
