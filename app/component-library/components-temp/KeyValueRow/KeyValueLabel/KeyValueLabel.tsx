import ButtonIcon from '../../../../component-library/components/Buttons/ButtonIcon';
import Label from '../../../../component-library/components/Form/Label';
import {
  IconColor,
  IconName,
} from '../../../../component-library/components/Icons/Icon';
import {
  TextVariant,
  TextColor,
} from '../../../../component-library/components/Texts/Text';
import { useTw } from '../../../../hooks/useTwrncTheme';
import useTooltipModal from '../../../../components/hooks/useTooltipModal';
import React from 'react';
import { View } from 'react-native';
import { KeyValueRowLabelProps, TooltipSizes } from '../KeyValueRow.types';
import { isPreDefinedKeyValueRowLabel } from '../KeyValueRow.utils';

/**
 * A label and tooltip component.
 *
 * @param {Object} props - Component props.
 * @param {PreDefinedKeyValueRowLabel | ReactNode} props.label - The label content to display.
 * @param {KeyValueRowTooltip} [props.tooltip] - Optional tooltip to render to the right of the label.
 *
 * @returns {JSX.Element} The rendered KeyValueRowLabel component.
 */
const KeyValueRowLabel = ({ label, tooltip }: KeyValueRowLabelProps) => {
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getLabelContainerStyles = () => tw`flex-row items-center gap-1`;

  const { openTooltipModal } = useTooltipModal();

  const hasTooltip = tooltip?.title && tooltip?.content;

  const onNavigateToTooltipModal = () => {
    if (!hasTooltip) return;
    openTooltipModal(tooltip.title, tooltip.content);
    tooltip?.onPress?.();
  };

  return (
    <View style={getLabelContainerStyles()}>
      {isPreDefinedKeyValueRowLabel(label) ? (
        <Label
          variant={label?.variant ?? TextVariant.BodyMDMedium}
          color={label?.color ?? TextColor.Default}
        >
          {label.text}
        </Label>
      ) : (
        label
      )}
      {hasTooltip && (
        <ButtonIcon
          size={tooltip.size ?? TooltipSizes.Md}
          iconColor={IconColor.Muted}
          iconName={IconName.Question}
          accessibilityRole="button"
          accessibilityLabel={`${tooltip.title} tooltip`}
          onPress={onNavigateToTooltipModal}
        />
      )}
    </View>
  );
};

export default KeyValueRowLabel;
