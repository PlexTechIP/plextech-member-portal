import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Stack, Modal, CircularProgress } from '@mui/material';
import { RequestsBoard } from 'app/components/RequestsBoard';
import { useEffect, useState } from 'react';
import { ReimbursementForm } from 'app/components/ReimbursementForm';
import { AllRequests, Error, Request } from 'types/types';
import { ErrorModal } from 'app/components/ErrorModal';
import dayjs from 'dayjs';
import { BottomButton } from 'app/components/BottomButton';
import { apiRequest } from 'utils/apiRequest';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface Props {}

export function ReimbursementsPage(props: Props) {
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
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [userName, setUserName] = useState<{
    firstName: string;
    lastName: string;
  }>({ firstName: '', lastName: '' });
  const [filter, setFilter] = useState<boolean>(false);
  const [backToTopButtonVisible, setBackToTopButtonVisible] = useState(false);
  const [receiptRequired, setReceiptRequired] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setBackToTopButtonVisible(true);
      } else {
        setBackToTopButtonVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const transformRequestItem = (request: Request) => ({
    ...request,
    amount: parseFloat(request.amount as unknown as string).toFixed(2),
    date: dayjs(request.date),
  });

  useEffect(() => {
    const f = async () => {
      setIsLoading(true);
      const [success, res] = await apiRequest(`/requests/`, 'GET');

      if (!success) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      setIsTreasurer(res.treasurer);
      setUserName({ firstName: res.firstName, lastName: res.lastName });

      delete res.treasurer;
      delete res.firstName;
      delete res.lastName;

      setRequests({
        pendingReview: res.pendingReview.map(transformRequestItem),
        underReview: res.underReview.map(transformRequestItem),
        errors: res.errors.map(transformRequestItem),
        approved: res.approved.map(transformRequestItem),
        paid: res.paid.map(transformRequestItem),
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
            (request: Request) => request.id !== newRequest.id,
          ),
        ],
        errors: [
          ...prevState.errors.filter(
            (request: Request) => request.id !== newRequest.id,
          ),
        ],
      }));
    } else {
      setRequests(prevState => ({
        ...prevState,
        pendingReview: [
          newRequest,
          ...prevState.pendingReview.filter(
            (request: Request) => request.id !== newRequest.id,
          ),
        ],
        errors: [
          ...prevState.errors.filter(
            (request: Request) => request.id !== newRequest.id,
          ),
        ],
      }));
    }
  };

  const handleShowModal = (newRequest: Request | null, mine: boolean) => {
    setRequest(newRequest);
    setCanEdit(!isTreasurer || mine || !newRequest);
    setShowModal(true);
    setReceiptRequired(!newRequest);
  };

  const refreshRequests = async (userFilter?: string) => {
    setFilter(!!userFilter);
    setIsLoading(true);

    const [success, res] = await apiRequest(
      userFilter ? `/requests/?user_filter=${userFilter}` : `/requests/`,
      'GET',
    );

    if (!success) {
      setError(res.error);
      return;
    }

    setIsTreasurer(res.treasurer);
    setUserName({ firstName: res.firstName, lastName: res.lastName });

    delete res.treasurer;
    delete res.firstName;
    delete res.lastName;
    setRequests({
      pendingReview: res.pendingReview.map(transformRequestItem),
      underReview: res.underReview.map(transformRequestItem),
      errors: res.errors.map(transformRequestItem),
      approved: res.approved.map(transformRequestItem),
      paid: res.paid.map(transformRequestItem),
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
          <Modal
            open={showModal}
            onClose={onClose}
            className="w-1/2 min-w-[500px] h-full absolute inset-0 m-auto p-16 overflow-auto scrollbar-hide"
          >
            <>
              <ReimbursementForm
                request={request}
                setRequests={setRequests}
                onClose={onClose}
                onSubmit={onSubmit}
                onError={onError}
                canEdit={canEdit}
                userName={{
                  first_name: userName.firstName,
                  last_name: userName.lastName,
                }}
                receiptRequired={receiptRequired}
              />
            </>
          </Modal>
          {isLoading && (
            <CircularProgress className="text-[rgb(255,138,0)] absolute inset-0 m-auto" />
          )}
          {filter && (
            <BottomButton
              text="Back to All"
              onClick={() => refreshRequests()}
              icon={<KeyboardArrowLeftIcon />}
              sx={{
                transform: 'translateX(-50%)',
                '&:hover': {
                  background: 'transparent',
                },
              }}
            />
          )}

          <Stack
            className="w-full h-full pt-6 px-12"
            justifyContent="space-between"
          >
            <RequestsBoard
              requests={isLoading ? null : requests}
              onEdit={handleShowModal}
              onRequest={onRequest}
              isTreasurer={isTreasurer}
              userName={userName}
              refreshRequests={refreshRequests}
            />
          </Stack>
          <BottomButton
            text="Back to Top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            icon={<KeyboardArrowUpIcon />}
            sx={{
              transform: `translateX(-50%) ${
                backToTopButtonVisible ? 'translateY(0%)' : 'translateY(100%)'
              }`,
              transition: backToTopButtonVisible
                ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                : 'transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)',
              '&:hover': {
                background: 'transparent',
              },
            }}
          />
        </>
      )}
    </>
  );
}
