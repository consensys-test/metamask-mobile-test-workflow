/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useTw } from '../../../../hooks/useTwrncTheme';
import Button from '../../Buttons/Button';

// Internal dependencies.
import {
  BottomSheetFooterProps,
  BottomSheetFooterButtonsAlignment,
} from './BottomSheetFooter.types';
import {
  DEFAULT_BOTTOMSHEETFOOTER_BUTTONSALIGNMENT,
  TESTID_BOTTOMSHEETFOOTER,
  TESTID_BOTTOMSHEETFOOTER_BUTTON,
  TESTID_BOTTOMSHEETFOOTER_BUTTON_SUBSEQUENT,
} from './BottomSheetFooter.constants';

const BottomSheetFooter: React.FC<BottomSheetFooterProps> = ({
  style,
  buttonsAlignment = DEFAULT_BOTTOMSHEETFOOTER_BUTTONSALIGNMENT,
  buttonPropsArray,
}) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getFooterStyles = () => {
    const baseClasses = 'p-4';

    let alignmentClasses = '';
    switch (buttonsAlignment) {
      case BottomSheetFooterButtonsAlignment.Horizontal:
        alignmentClasses = 'flex-row space-x-4';
        break;
      case BottomSheetFooterButtonsAlignment.Vertical:
        alignmentClasses = 'flex-col space-y-4';
        break;
      default:
        alignmentClasses = 'flex-col space-y-4';
    }

    return [tw`${baseClasses} ${alignmentClasses}`, style];
  };

  const getButtonStyles = () => tw``;

  const getSubsequentButtonStyles = () =>
    buttonsAlignment === BottomSheetFooterButtonsAlignment.Horizontal
      ? tw``
      : tw`mt-3`;

  return (
    <View style={getFooterStyles()} testID={TESTID_BOTTOMSHEETFOOTER}>
      {buttonPropsArray.map((buttonProp, index) => (
        <Button
          key={index}
          style={index > 0 ? getSubsequentButtonStyles() : getButtonStyles()}
          testID={
            index > 0
              ? TESTID_BOTTOMSHEETFOOTER_BUTTON_SUBSEQUENT
              : TESTID_BOTTOMSHEETFOOTER_BUTTON
          }
          {...buttonProp}
        />
      ))}
    </View>
  );
};

export default BottomSheetFooter;
