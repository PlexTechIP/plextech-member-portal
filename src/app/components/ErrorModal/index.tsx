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

interface Props {}

const onRefresh = () => {
  window.location.reload();
};

export function ErrorModal(props: Props) {
  return (
    <StyledPaper>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center">
          <H1>Error</H1>
          <IconButton>
            <RefreshIcon onClick={onRefresh} />
          </IconButton>
        </Stack>
        <P>
          Try refreshing the page and contact shamith09@berkeley.edu if the
          issue persists.
        </P>
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
