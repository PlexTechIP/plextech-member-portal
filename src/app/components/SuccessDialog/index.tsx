/**
 *
 * SuccessDialog
 *
 */
import * as React from 'react';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark';
import { Dialog } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SuccessDialog(props: Props) {
  setTimeout(() => {
    props.onClose();
  }, 4000);

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      PaperProps={{
        className: '!rounded-[48px] p-12',
      }}
    >
      <AnimatedCheckmark mode={MODES.SUCCESS} />
    </Dialog>
  );
}
