import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Modal,
  Button,
} from '@material-ui/core';
import { Stack } from '@mui/material';
import { RequestsBoard } from 'app/components/RequestsBoard';
import { useState } from 'react';
import { ReimbursementForm } from 'app/components/ReimbursementForm';
import { Request } from 'app/components/RequestsBoard/types';
import AddIcon from '@mui/icons-material/Add';

export function HomePage() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  const [requests, setRequests] = useState<Request[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Helmet>
          <title>HomePage</title>
          <meta
            name="description"
            content="A Boilerplate application homepage"
          />
        </Helmet>
        <StyledModal open={showModal} onClose={onClose}>
          <ReimbursementForm
            teams={['Exec']}
            setRequests={setRequests}
            onClose={onClose}
          />
        </StyledModal>
        <StyledStack justifyContent="space-between">
          <RequestsBoard
            showModal={handleShowModal}
            requests={{
              pendingReview: requests,
              underReview: [],
              errors: [],
              approved: [],
              declined: [],
            }}
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button
              startIcon={React.cloneElement(<AddIcon />)}
              variant="contained"
              onClick={handleShowModal}
            >
              Request Reimbursement
            </Button>
          </Stack>
        </StyledStack>
      </CssBaseline>
    </ThemeProvider>
  );
}

const StyledStack = styled(Stack)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 64px;
`;

const StyledModal = styled(Modal)`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 64px;
`;
