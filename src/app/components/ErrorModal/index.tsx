/**
 *
 * ErrorModal
 *
 */
import { Modal, Stack, Paper, IconButton } from '@mui/material';
import * as React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { errorImg } from 'images';
import { Error } from 'types/types';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  error: Error;
}

export function ErrorModal(props: Props) {
  const onRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    console.warn(props.error);
  });

  return (
    <Modal
      open={props.open}
      className="w-1/2 min-w-[500px] h-full absolute inset-0 m-auto p-16"
    >
      <Paper className="p-12 !rounded-[48px]">
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <h1 className="m-0">
              Error{props.error.errorCode && ` ${props.error.errorCode}`}:{' '}
              {props.error.errorMessage}
            </h1>
            <IconButton onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          </Stack>
          <p className="m-0">
            Try refreshing the page and contact{' '}
            <a href="mailto:shamith09@berkeley.edu?subject=[Plexfinance Error]">
              shamith09@berkeley.edu
            </a>{' '}
            if the issue persists.
          </p>
          <img src={errorImg} alt="error" />
        </Stack>
      </Paper>
    </Modal>
  );
}
