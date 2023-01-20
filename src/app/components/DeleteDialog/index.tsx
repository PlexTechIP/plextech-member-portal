import { styled as muiStyled } from '@mui/system';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  item: string;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteDialog(props: Props) {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      PaperProps={{
        style: { borderRadius: '24px', padding: '24px' },
      }}
    >
      <DialogTitle>
        Are you sure you want to delete this {props.item}?
      </DialogTitle>
      <DialogActions>
        <StyledButton onClick={props.onClose}>Cancel</StyledButton>
        <StyledButton onClick={props.onDelete} variant="contained">
          Delete
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}

const StyledButton = muiStyled(Button)`
    background-color: white;
    color: rgb(255, 138, 0);
    font-weight: bold;
`;
