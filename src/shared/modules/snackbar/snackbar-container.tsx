import { Fragment, useRef } from 'react';
import { Alert, Button, IconButton, Snackbar, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { SnackbarMessageModel, useSnackbarStore } from './store';

export function SnackbarContainer() {
  const messageRef = useRef<SnackbarMessageModel>();
  const hide = useSnackbarStore((state) => state.hide);
  const snackbarMessage = useSnackbarStore((state) => state.snackbarMessage);

  if (snackbarMessage) {
    messageRef.current = snackbarMessage;
  }

  return (
    <Snackbar
      open={!!snackbarMessage}
      autoHideDuration={messageRef.current?.autoHideDuration}
      anchorOrigin={
        messageRef.current?.origin ?? {
          vertical: 'bottom',
          horizontal: 'right',
        }
      }
      TransitionComponent={Slide}
      onClose={hide}
      action={
        <Fragment>
          {messageRef.current?.actions &&
            messageRef.current.actions.map((action, index) => (
              <Button
                key={index}
                color="secondary"
                size="small"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={hide}
          >
            <CloseIcon />
          </IconButton>
        </Fragment>
      }
    >
      <Alert
        onClose={messageRef.current?.canClose ? hide : undefined}
        severity={messageRef.current?.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {messageRef.current?.message}
      </Alert>
    </Snackbar>
  );
}
