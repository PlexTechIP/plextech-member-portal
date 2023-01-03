import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Modal,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Stack } from '@mui/material';
import { RequestsBoard } from 'app/components/RequestsBoard';
import { useEffect, useState } from 'react';
import { ReimbursementForm } from 'app/components/ReimbursementForm';
import { AllRequests, Request } from 'types/types';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ErrorModal } from 'app/components/ErrorModal';
import Background from '../../../shapes-background.png';
import { styled as muiStyled } from '@mui/system';

export function HomePage() {
  const theme = createTheme({
    palette: {
      type: 'light',
    },
    typography: {
      fontFamily: ['"DM Sans"'].join(','),
    },
  });

  const [requests, setRequests] = useState<AllRequests>({
    pendingReview: [],
    underReview: [],
    errors: [],
    approved: [],
    declined: [],
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [request, setRequest] = useState<Request | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      setIsLoading(true);
      const url = `http://localhost:${process.env.PORT || 3000}/requests/`;
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });

      if (!response.ok) {
        setError(true);
      }

      setRequests(await response.json());
      setIsLoading(false);
    };

    f();
  }, [refresh]);

  const onClose = () => {
    setShowModal(false);
  };

  const onRefresh = () => {
    setRefresh(!refresh);
  };

  const onError = () => {
    setError(true);
  };

  const onSubmit = (newRequest: Request) => {
    setRequests(prevState => ({
      ...prevState,
      pendingReview: [
        ...prevState.pendingReview.filter(
          (request: Request) => request._id !== newRequest._id,
        ),
        newRequest,
      ],
      errors: [
        ...prevState.errors.filter(
          (request: Request) => request._id !== newRequest._id,
        ),
      ],
    }));
  };

  const handleShowModal = (newRequest: Request | null) => {
    setRequest(newRequest);
    setShowModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Helmet>
          <title>HomePage</title>
          <meta
            name="description"
            content="A Boilerplate application homepage"
          />
        </Helmet>
        <Div>
          <StyledModal open={error || showModal} onClose={onClose}>
            <>
              {error ? (
                <ErrorModal />
              ) : (
                <ReimbursementForm
                  request={request}
                  teams={['Exec']}
                  setRequests={setRequests}
                  onClose={onClose}
                  onSubmit={onSubmit}
                  onError={onError}
                />
              )}
            </>
          </StyledModal>

          <StyledStack justifyContent="space-between">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <RequestsBoard requests={requests} onEdit={handleShowModal} />
            )}
            <Stack
              direction="row"
              justifyContent={isLoading ? 'flex-end' : 'space-between'}
            >
              {isLoading || (
                <StyledButton
                  startIcon={React.cloneElement(<RefreshIcon />)}
                  variant="contained"
                  onClick={onRefresh}
                >
                  Refresh
                </StyledButton>
              )}
              <StyledButton
                startIcon={React.cloneElement(<AddIcon />)}
                variant="contained"
                onClick={() => handleShowModal(null)}
              >
                Request Reimbursement
              </StyledButton>
            </Stack>
          </StyledStack>
        </Div>
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

const Div = styled.div`
  background-image: url(${Background});
  height: 100vh;
  background-repeat: repeat;
`;

const StyledButton = muiStyled(Button)`
  background-color: white;
  color: rgb(255, 138, 0);
  font-weight: bold;
`;
