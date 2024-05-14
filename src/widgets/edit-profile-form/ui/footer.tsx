// import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import classes from './edit-profile.module.css';

interface Props {
  onClose: () => void;
}

export const Footer = ({ onClose }: Props) => (
  <div className={classes.footer}>
    <Button type="button" color={'error'} onClick={onClose}>
      schließen
    </Button>
    {/* <LoadingButton variant="contained" type="submit" color={'success'}>
      Speichern
    </LoadingButton> */}
  </div>
);
