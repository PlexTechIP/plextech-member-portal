/**
 *
 * ErrorModal
 *
 */
import { Modal, Stack, Paper, IconButton } from '@mui/material';
import * as React from 'react';
import { styled as muiStyled } from '@mui/system';
import styled from 'styled-components/macro';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorImage from '../../../error.png';
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
    console.log(props.error);
  });

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
              Error{props.error.errorCode && ` ${props.error.errorCode}`}:{' '}
              {props.error.errorMessage}
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
