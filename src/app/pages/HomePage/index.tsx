import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Stack, Modal, Button } from '@mui/material';
import { RequestsBoard } from 'app/components/RequestsBoard';
import { useEffect, useState } from 'react';
import { ReimbursementForm } from 'app/components/ReimbursementForm';
import { AllRequests, Request } from 'types/types';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ErrorModal } from 'app/components/ErrorModal';
import { styled as muiStyled } from '@mui/system';

interface Props {
  token: string | null;
  removeToken: () => void;
}

export function HomePage(props: Props) {
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
      try {
        const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/requests/`;
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + props.token,
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        });

        if (response.status === 401) {
          props.removeToken();
        }

        if (!response.ok) {
          console.error(response);
          setError(true);
          return;
        }

        setRequests(await response.json());
        setIsLoading(false);
      } catch (e: any) {
        setError(true);
        console.error(e);
        return;
      }
    };

    f();
  }, [props, props.token, refresh]);

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
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Your finance dashboard" />
      </Helmet>
      {error ? (
        <ErrorModal open={error} />
      ) : (
        <>
          <StyledModal open={showModal} onClose={onClose}>
            <>
              <ReimbursementForm
                request={request}
                teams={['Exec']}
                setRequests={setRequests}
                onClose={onClose}
                onSubmit={onSubmit}
                onError={onError}
                token={props.token}
              />
            </>
          </StyledModal>

          <StyledStack justifyContent="space-between">
            <RequestsBoard
              requests={isLoading ? null : requests}
              onEdit={handleShowModal}
            />
            <Stack
              direction="row"
              justifyContent={isLoading ? 'flex-end' : 'space-between'}
            >
              <StyledButton
                startIcon={React.cloneElement(<RefreshIcon />)}
                variant="contained"
                onClick={onRefresh}
              >
                Refresh
              </StyledButton>
              <StyledButton
                startIcon={React.cloneElement(<AddIcon />)}
                variant="contained"
                onClick={() => handleShowModal(null)}
              >
                Request Reimbursement
              </StyledButton>
            </Stack>
          </StyledStack>
        </>
      )}
    </>
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

const StyledButton = muiStyled(Button)`
  background-color: white;
  color: rgb(255, 138, 0);
  font-weight: bold;
`;
