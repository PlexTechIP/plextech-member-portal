/**
 *
 * ErrorModal
 *
 */
import { IconButton, Paper } from '@material-ui/core';
import { Stack } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorImage from '../../../error.webp';

interface Props {}

const onRefresh = () => {
  window.location.reload();
};

export function ErrorModal(props: Props) {
  return (
    <StyledPaper style={{ borderRadius: '5%' }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center">
          <H1>Error</H1>
          <IconButton>
            <RefreshIcon onClick={onRefresh} />
          </IconButton>
        </Stack>
        <P>
          Try refreshing the page and contact{' '}
          <a href="mailto:shamith09@berkeley.edu?subject=[Plexfinance Error]&body=Message">
            shamith09@berkeley.edu
          </a>{' '}
          if the issue persists.
        </P>
        <img src={ErrorImage} alt="error"></img>
      </Stack>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)`
  padding: 48px;
`;

const H1 = styled.h1`
  margin: 0px;
`;

const P = styled.p`
  margin: 0px;
`;
