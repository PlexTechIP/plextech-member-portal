/**
 *
 * SuccessDialog
 *
 */
import * as React from 'react';
// import styled from 'styled-components/macro';
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
        style: { borderRadius: '48px', padding: '48px' },
      }}
    >
      <AnimatedCheckmark mode={MODES.SUCCESS} />
    </Dialog>
  );
}
