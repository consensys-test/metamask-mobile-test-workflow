// Third party dependencies.
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { View, ScrollView } from 'react-native';

// External dependencies.
import { useTw } from '../../hooks/useTwrncTheme';
import ButtonToggle from '../../components-temp/Buttons/ButtonToggle';
import { ButtonWidthTypes } from '../../components/Buttons/Button/Button.types';

// Internal dependencies.
import {
  SegmentedControlProps,
  SingleSelectSegmentedControlProps,
  MultiSelectSegmentedControlProps,
} from './SegmentedControl.types';
import { DEFAULT_SEGMENTEDCONTROL_SIZE } from './SegmentedControl.constants';

const SegmentedControl = ({
  options,
  size = DEFAULT_SEGMENTEDCONTROL_SIZE,
  isButtonWidthFlexible = true,
  isDisabled = false,
  isMultiSelect = false,
  isScrollable = false,
  style,
  ...props
}: SegmentedControlProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getBaseStyles = () => {
    let flexClasses = '';

    if (isButtonWidthFlexible) {
      flexClasses = 'flex-row flex-wrap';
    } else {
      flexClasses = 'flex-row';
    }

    const baseClasses = `${flexClasses} gap-2`;

    return [tw`${baseClasses}`, style];
  };

  const getButtonContainerStyles = () => {
    if (isButtonWidthFlexible) {
      return tw`flex-grow min-w-0`;
    }
    return tw`flex-1`;
  };

  const getScrollContentContainerStyles = () => tw`px-4`;

  // Single select state
  const singleSelectProps = useMemo(
    () =>
      isMultiSelect
        ? { selectedValue: undefined, onValueChange: undefined }
        : (props as SingleSelectSegmentedControlProps),
    [isMultiSelect, props],
  );

  const [internalSingleValue, setInternalSingleValue] = useState<string>(
    singleSelectProps.selectedValue ||
      (options.length > 0 ? options[0].value : ''),
  );

  // Multi select state
  const multiSelectProps = useMemo(
    () =>
      isMultiSelect
        ? (props as MultiSelectSegmentedControlProps)
        : { selectedValues: [], onValueChange: undefined },
    [isMultiSelect, props],
  );

  const [internalMultiValues, setInternalMultiValues] = useState<string[]>(
    multiSelectProps.selectedValues || [],
  );

  // Update internal state when props change
  useEffect(() => {
    if (!isMultiSelect && singleSelectProps.selectedValue !== undefined) {
      setInternalSingleValue(singleSelectProps.selectedValue);
    }
  }, [isMultiSelect, singleSelectProps.selectedValue]);

  useEffect(() => {
    if (isMultiSelect && multiSelectProps.selectedValues) {
      setInternalMultiValues(multiSelectProps.selectedValues);
    }
  }, [isMultiSelect, multiSelectProps.selectedValues]);

  // Define control state
  const isSingleControlled = useMemo(
    () => !isMultiSelect && singleSelectProps.selectedValue !== undefined,
    [isMultiSelect, singleSelectProps.selectedValue],
  );

  const isMultiControlled = useMemo(
    () => isMultiSelect && multiSelectProps.selectedValues !== undefined,
    [isMultiSelect, multiSelectProps.selectedValues],
  );

  const currentSingleValue = useMemo(
    () =>
      isSingleControlled
        ? singleSelectProps.selectedValue
        : internalSingleValue,
    [isSingleControlled, singleSelectProps.selectedValue, internalSingleValue],
  );

  const currentMultiValues = useMemo(
    () =>
      isMultiControlled
        ? multiSelectProps.selectedValues || []
        : internalMultiValues,
    [isMultiControlled, multiSelectProps.selectedValues, internalMultiValues],
  );

  // Handle toggle for single select
  const handleSinglePress = useCallback(
    (value: string) => {
      // Don't trigger if disabled
      if (isDisabled) return;

      if (!isSingleControlled) {
        setInternalSingleValue(value);
      }
      singleSelectProps.onValueChange?.(value);
    },
    [isDisabled, isSingleControlled, singleSelectProps],
  );

  // Handle toggle for multi-select
  const handleMultiPress = useCallback(
    (value: string) => {
      // Don't trigger if disabled
      if (isDisabled) return;

      const newValues = currentMultiValues.includes(value)
        ? currentMultiValues.filter((v) => v !== value)
        : [...currentMultiValues, value];

      if (!isMultiControlled) {
        setInternalMultiValues(newValues);
      }
      multiSelectProps.onValueChange?.(newValues);
    },
    [currentMultiValues, isDisabled, isMultiControlled, multiSelectProps],
  );

  // Determine active state based on mode
  const isOptionActive = useCallback(
    (optionValue: string) => {
      if (isMultiSelect) {
        return currentMultiValues.includes(optionValue);
      }
      return currentSingleValue === optionValue;
    },
    [isMultiSelect, currentSingleValue, currentMultiValues],
  );

  // Handle button press based on mode
  const handleButtonPress = useCallback(
    (value: string) => {
      if (isMultiSelect) {
        handleMultiPress(value);
      } else {
        handleSinglePress(value);
      }
    },
    [isMultiSelect, handleSinglePress, handleMultiPress],
  );

  // Render the buttons with gap between them
  const renderButtons = () =>
    options.map((option) => {
      // Extract standard props and any additional props that might be in the option
      const { value, label, ...optionProps } = option;

      return (
        <View key={value} style={getButtonContainerStyles()}>
          <ButtonToggle
            label={label}
            isActive={isOptionActive(value)}
            onPress={() => handleButtonPress(value)}
            size={size}
            isDisabled={isDisabled}
            width={
              isButtonWidthFlexible
                ? ButtonWidthTypes.Auto
                : ButtonWidthTypes.Full
            }
            {...optionProps}
          />
        </View>
      );
    });

  // Conditionally render ScrollView or View based on isScrollable prop
  if (isScrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={getScrollContentContainerStyles()}
        {...props}
      >
        <View style={getBaseStyles()}>{renderButtons()}</View>
      </ScrollView>
    );
  }

  return (
    <View style={getBaseStyles()} {...props}>
      {renderButtons()}
    </View>
  );
};

export default SegmentedControl;
