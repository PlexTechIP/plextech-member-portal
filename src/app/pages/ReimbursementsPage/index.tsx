import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Stack, Modal, CircularProgress } from '@mui/material';
import { RequestsBoard } from 'app/components/RequestsBoard';
import { useEffect, useState } from 'react';
import { ReimbursementForm } from 'app/components/ReimbursementForm';
import { AllRequests, Error, Request } from 'types/types';
import { ErrorModal } from 'app/components/ErrorModal';
import { styled as muiStyled } from '@mui/system';
import dayjs from 'dayjs';
import { BackToTopButton } from 'app/components/BackToTopButton';
import { apiRequest } from 'utils/apiRequest';

interface Props {}

export function HomePage(props: Props) {
  const [requests, setRequests] = useState<AllRequests>({
    pendingReview: [],
    underReview: [],
    errors: [],
    approved: [],
    paid: [],
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [request, setRequest] = useState<Request | null>(null);
  const [error, setError] = useState<Error>();
  const [isTreasurer, setIsTreasurer] = useState<boolean>(false);
  const [teams, setTeams] = useState<string[]>([]);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [userName, setUserName] = useState<{
    firstName: string;
    lastName: string;
  }>({ firstName: '', lastName: '' });

  useEffect(() => {
    const f = async () => {
      setIsLoading(true);
      const [success, res] = await apiRequest(`/requests/`, 'GET');

      if (!success) {
        setError(res.error);
        return;
      }

      setIsTreasurer(res.treasurer);
      setTeams(res.teams);
      setUserName({ firstName: res.firstName, lastName: res.lastName });

      delete res.treasurer;
      delete res.teams;
      delete res.firstName;
      delete res.lastName;
      setRequests({
        pendingReview: res.pendingReview.map((request: Request) => ({
          ...request,
          amount: request.amount.toFixed(2),
          date: dayjs(request.date),
        })),
        underReview: res.underReview.map((request: Request) => ({
          ...request,
          amount: request.amount.toFixed(2),
          date: dayjs(request.date),
        })),
        errors: res.errors.map((request: Request) => ({
          ...request,
          amount: request.amount.toFixed(2),
          date: dayjs(request.date),
        })),
        approved: res.approved.map((request: Request) => ({
          ...request,
          amount: request.amount.toFixed(2),
          date: dayjs(request.date),
        })),
        paid: res.paid.map((request: Request) => ({
          ...request,
          amount: request.amount.toFixed(2),
          date: dayjs(request.date),
        })),
      });
      setIsLoading(false);
    };

    f();
  }, [props]);

  const onClose = () => {
    setShowModal(false);
  };

  const onError = (error: Error) => {
    setError(error);
  };

  const onRequest = () => {
    handleShowModal(null, false);
  };

  const onSubmit = (newRequest: Request, remove?: boolean) => {
    if (remove) {
      setRequests(prevState => ({
        ...prevState,
        pendingReview: [
          ...prevState.pendingReview.filter(
            (request: Request) => request._id !== newRequest._id,
          ),
        ],
        errors: [
          ...prevState.errors.filter(
            (request: Request) => request._id !== newRequest._id,
          ),
        ],
      }));
    } else {
      setRequests(prevState => ({
        ...prevState,
        pendingReview: [
          newRequest,
          ...prevState.pendingReview.filter(
            (request: Request) => request._id !== newRequest._id,
          ),
        ],
        errors: [
          ...prevState.errors.filter(
            (request: Request) => request._id !== newRequest._id,
          ),
        ],
      }));
    }
  };

  const handleShowModal = (newRequest: Request | null, mine: boolean) => {
    setRequest(newRequest);
    setCanEdit(!isTreasurer || mine || !newRequest);
    setShowModal(true);
  };

  // userFilter is a user id
  const refreshRequests = async (userFilter?: string) => {
    setIsLoading(true);

    const [success, res] = await apiRequest(
      `/requests/?user_filter=${userFilter}`,
      'GET',
    );

    if (!success) {
      setError(res.error);
      return;
    }

    setIsTreasurer(res.treasurer);
    setTeams(res.teams);
    setUserName({ firstName: res.firstName, lastName: res.lastName });

    delete res.treasurer;
    delete res.teams;
    delete res.firstName;
    delete res.lastName;
    setRequests({
      pendingReview: res.pendingReview.map((request: Request) => ({
        ...request,
        amount: request.amount.toFixed(2),
        date: dayjs(request.date),
      })),
      underReview: res.underReview.map((request: Request) => ({
        ...request,
        amount: request.amount.toFixed(2),
        date: dayjs(request.date),
      })),
      errors: res.errors.map((request: Request) => ({
        ...request,
        amount: request.amount.toFixed(2),
        date: dayjs(request.date),
      })),
      approved: res.approved.map((request: Request) => ({
        ...request,
        amount: request.amount.toFixed(2),
        date: dayjs(request.date),
      })),
      paid: res.paid.map((request: Request) => ({
        ...request,
        amount: request.amount.toFixed(2),
        date: dayjs(request.date),
      })),
    });
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Reimbursements</title>
        <meta name="description" content="Your finance dashboard" />
      </Helmet>
      {error ? (
        <ErrorModal open={!error} error={error} />
      ) : (
        <>
          <StyledModal open={showModal} onClose={onClose}>
            <>
              <ReimbursementForm
                request={request}
                teams={teams}
                setRequests={setRequests}
                onClose={onClose}
                onSubmit={onSubmit}
                onError={onError}
                canEdit={canEdit}
                userName={userName}
              />
            </>
          </StyledModal>
          {isLoading && <StyledCircularProgress />}

          <StyledStack justifyContent="space-between">
            <RequestsBoard
              requests={isLoading ? null : requests}
              onEdit={handleShowModal}
              onRequest={onRequest}
              isTreasurer={isTreasurer}
              userName={userName}
              refreshRequests={refreshRequests}
            />
          </StyledStack>
          <BackToTopButton />
        </>
      )}
    </>
  );
}

const StyledStack = styled(Stack)`
  width: 100%;
  height: 100%;
  padding-top: 24px;
  padding-left: 48px;
  padding-right: 48px;
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
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;
