import { Box, styled } from '@mui/material';

import { FormContentProps } from '../model/types';
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT_WITHOUT_DESCRIPTION,
  HEADER_HEIGHT_WITH_DESCRIPTION,
} from '../lib/constants';

import { MultiStepForm } from 'shared/modules';
import { useStepperStoreContext } from 'shared/modules/stepper-form/store';
import { useStore } from 'zustand';
import { TRANSPORTATION_ORDER_STEPS_TEXTS } from '../model/transportation-order-steps';
import { ProfileInfoDTO, getProfileInfo } from 'shared/api';
import { useEffect, useRef, useState } from 'react';

const Content = styled(Box)<FormContentProps>(({ theme, withDescription }) => ({
  zIndex: 0,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  overflow: 'auto',
  position: 'absolute',
  top: withDescription
    ? HEADER_HEIGHT_WITH_DESCRIPTION
    : HEADER_HEIGHT_WITHOUT_DESCRIPTION,
  bottom: FOOTER_HEIGHT,
  left: 0,
  right: 0,
  [theme.breakpoints.down('md')]: {
    position: 'static',
    overflow: 'initial',
    flexGrow: 1,
  },
  minHeight: 460,
}));

export function FormContent() {
  const stepperStore = useStepperStoreContext();
  const activeStep = useStore(stepperStore, (state) => state.step);
  const textContent = TRANSPORTATION_ORDER_STEPS_TEXTS[activeStep];
  const [profileInfo, setProfileInfo] = useState<ProfileInfoDTO | null>(null);
  const isFirstRender = useRef(true);

  const handleGetProfileInfo = () => {
    isFirstRender.current = false;
    getProfileInfo().then((resp) => setProfileInfo(resp?.data?.data));
  };

  useEffect(() => {
    isFirstRender.current && handleGetProfileInfo();
  }, []);

  return (
    <Content withDescription={!!textContent.description}>
      <MultiStepForm.FormStepContent profileInfo={profileInfo} />
    </Content>
  );
}
