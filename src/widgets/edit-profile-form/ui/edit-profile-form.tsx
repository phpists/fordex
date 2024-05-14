import { Box, Modal, Typography } from '@mui/material';
import classes from './edit-profile.module.css';
import { Footer } from './footer';
import { useEffect, useState } from 'react';
import { ProfileInfoDTO, getProfileInfo } from 'shared/api';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const EditProfileForm = ({ open, onClose }: Props) => {
  const [data, setData] = useState<ProfileInfoDTO | null>(null);

  useEffect(() => {
    if (open) {
      getProfileInfo().then((resp) => setData(resp?.data?.data));
    }
  }, [open]);

  return (
    <div>
      <Modal open={open} onClose={onClose} className={classes.modalWrapper}>
        <Box className={classes.modal}>
          <Typography variant="h5" fontWeight="bold">
            Profilinformationen
          </Typography>
          <Box className={classes.infoList}>
            <b>Name</b> <span>{data?.title ?? '-'}</span>
            <b>Email</b> <span>{data?.email ?? '-'}</span>
            <b>Land Postleitzahl Stadt</b>{' '}
            <span>{data?.countryZipCity ?? '-'}</span>
            <b>Straße</b> <span>{data?.streetBuilding ?? '-'}</span>
          </Box>
          <Footer onClose={onClose} />
        </Box>
      </Modal>
    </div>
  );
};
