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
import { BottomButton } from 'app/components/BottomButton';
import { apiRequest } from 'utils/apiRequest';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface Props {}

export function CategoriesPage(props: Props) {
  const [requests, setRequests] = useState<AllRequests>({
    pendingReview: [],
    underReview: [],
    errors: [],
    approved: [],
    paid: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [request, setRequest] = useState<Request | null>(null);
  const [error, setError] = useState<Error>();
  const [isTreasurer, setIsTreasurer] = useState<boolean>(false);

  const transformRequestItem = (request: Request) => ({
    ...request,
    amount: request.amount.toFixed(2),
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

  const onError = (error: Error) => {
    setError(error);
  };

  console.log(requests);

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Your finance dashboard" />
      </Helmet>
      {Object.values(
        requests.pendingReview.reduce(
          (acc: Record<string, number>, r: Request) => {
            const key = r.teamBudget;
            acc[key] = (acc[key] || 0) + Number(r.amount);
            return acc;
          },
          {},
        ),
      ).map((totalAmount: number, index: number) => (
        <p key={index}>{`Total amount for team budget ${
          requests.pendingReview[index].teamBudget
        }: ${totalAmount.toFixed(2)}`}</p>
      ))}
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
