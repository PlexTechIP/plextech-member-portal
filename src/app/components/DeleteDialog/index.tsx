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
        className: '!rounded-2xl p-6',
      }}
    >
      <DialogTitle>
        Are you sure you want to delete this {props.item}?
      </DialogTitle>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          onClick={props.onDelete}
          variant="contained"
          className="!bg-[rgb(255,138,0)] !text-white"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
