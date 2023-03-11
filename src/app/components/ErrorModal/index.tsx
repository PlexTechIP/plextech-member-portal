/**
 *
 * ErrorModal
 *
 */
import { IconButton } from '@material-ui/core';
import { Modal, Stack, Paper } from '@mui/material';
import * as React from 'react';
import { styled as muiStyled } from '@mui/system';
import styled from 'styled-components/macro';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorImage from '../../../error.webp';
import { Error } from 'types/types';

interface Props {
  open: boolean;
  error: Error;
}

const onRefresh = () => {
  window.location.reload();
};

export function ErrorModal(props: Props) {
  const { errorCode, errorMessage } = props.error;

  return (
    <StyledModal open={props.open}>
      <StyledPaper>
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <H1>
              Error{errorCode && ` ${errorCode}`}: {errorMessage}
            </H1>
            <IconButton onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          </Stack>
          <P>
            Try refreshing the page and contact{' '}
            <a href="mailto:shamith09@berkeley.edu?subject=[Plexfinance Error]">
              shamith09@berkeley.edu
            </a>{' '}
            if the issue persists.
          </P>
          <img src={ErrorImage} alt="error"></img>
        </Stack>
      </StyledPaper>
    </StyledModal>
  );
}

const StyledPaper = muiStyled(Paper)`
  padding: 48px;
  border-radius: 48px;
`;

const H1 = styled.h1`
  margin: 0px;
`;

const P = styled.p`
  margin: 0px;
`;
const StyledModal = styled(Modal)`
  width: 50%;
  min-width: 500px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 64px;
`;
