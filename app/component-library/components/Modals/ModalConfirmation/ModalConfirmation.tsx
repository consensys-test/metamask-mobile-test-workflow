// Third party dependencies.
import React, { useRef } from 'react';
import { View } from 'react-native';

// External dependencies.
import ReusableModal, {
  ReusableModalRef,
} from '../../../../components/UI/ReusableModal';
import Button, { ButtonSize, ButtonVariants } from '../../Buttons/Button';
import Text, { TextVariant } from '../../Texts/Text';
import { strings } from '../../../../../locales/i18n';
import { useTw } from '../../../../hooks/useTwrncTheme';

// Internal dependencies.
import { ModalConfirmationProps } from './ModalConfirmation.types';
import {
  MODAL_CONFIRMATION_DANGER_BUTTON_ID,
  MODAL_CONFIRMATION_NORMAL_BUTTON_ID,
} from './ModalConfirmation.constants';

const ModalConfirmation = ({ route }: ModalConfirmationProps) => {
  const {
    onConfirm,
    onCancel,
    cancelLabel,
    confirmLabel,
    title,
    description,
    isDanger = false,
  } = route.params;
  const modalRef = useRef<ReusableModalRef>(null);
  const tw = useTw();

  // Modern styling with Tailwind utilities
  const getScreenStyles = () =>
    tw`flex-1 items-center justify-center bg-overlay-default`;

  const getModalStyles = () =>
    tw`bg-background-default rounded-lg mx-4 max-w-md w-full`;

  const getBodyContainerStyles = () => tw`p-6`;

  const getHeaderLabelStyles = () => tw`mb-4 text-center`;

  const getDividerStyles = () => tw`h-px bg-border-muted`;

  const getButtonsContainerStyles = () => tw`flex-row`;

  const getButtonStyles = () => tw`flex-1`;

  const getButtonDividerStyles = () => tw`w-px bg-border-muted`;

  const triggerCancel = () => modalRef.current?.dismissModal(onCancel);

  const triggerConfirm = () => {
    modalRef.current?.dismissModal(onConfirm);
  };

  const handleModalDismiss = (hasPendingAction: boolean) =>
    !hasPendingAction && onCancel?.();

  const renderHeader = () => (
    <Text style={getHeaderLabelStyles()} variant={TextVariant.HeadingMD}>
      {title}
    </Text>
  );

  const renderDescription = () => (
    <Text variant={TextVariant.BodyMD}>{description}</Text>
  );

  const buttonTestID = isDanger
    ? MODAL_CONFIRMATION_DANGER_BUTTON_ID
    : MODAL_CONFIRMATION_NORMAL_BUTTON_ID;

  const renderButtons = () => (
    <View style={getButtonsContainerStyles()}>
      <Button
        variant={ButtonVariants.Secondary}
        onPress={triggerCancel}
        label={cancelLabel || strings('confirmation_modal.cancel_cta')}
        size={ButtonSize.Lg}
        style={getButtonStyles()}
      />
      <View style={getButtonDividerStyles()} />
      <Button
        variant={ButtonVariants.Primary}
        testID={buttonTestID}
        isDanger
        onPress={triggerConfirm}
        label={confirmLabel || strings('confirmation_modal.confirm_cta')}
        size={ButtonSize.Lg}
        style={getButtonStyles()}
      />
    </View>
  );

  return (
    <ReusableModal
      ref={modalRef}
      style={getScreenStyles()}
      onDismiss={handleModalDismiss}
    >
      <View style={getModalStyles()}>
        <View style={getBodyContainerStyles()}>
          {renderHeader()}
          {renderDescription()}
        </View>
        <View style={getDividerStyles()} />
        {renderButtons()}
      </View>
    </ReusableModal>
  );
};

export default ModalConfirmation;
