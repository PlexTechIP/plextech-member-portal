import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Stack, Modal, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { AllRequests, Request } from 'types/types';
import { styled as muiStyled } from '@mui/system';
import dayjs from 'dayjs';
import { apiRequest } from 'utils/apiRequest';

interface Props {}

export const categories = ['NMEP'];

export function CategoriesPage(props: Props) {
  const [requests, setRequests] = useState<AllRequests>({
    pendingReview: [],
    underReview: [],
    errors: [],
    approved: [],
    paid: [],
  });
  const [isTreasurer, setIsTreasurer] = useState<boolean>(false);

  const transformRequestItem = (request: Request) => ({
    ...request,
    amount: request.amount.toFixed(2),
    date: dayjs(request.date),
  });

  useEffect(() => {
    const f = async () => {
      const [_, res] = await apiRequest(`/requests/`, 'GET');

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
    };

    f();
  }, [props]);

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Your finance dashboard" />
      </Helmet>
      {isTreasurer ? (
        Object.values(
          requests.pendingReview.reduce(
            (acc: Record<string, number>, r: Request) => {
              const key = r.teamBudget;
              acc[key] = (acc[key] || 0) + Number(r.amount);
              return acc;
            },
            {},
          ),
        ).map((totalAmount: number, index: number) => (
          <p key={index}>{`Total amount for category ${
            requests.pendingReview[index].teamBudget
          }: $${totalAmount.toFixed(2)}`}</p>
        ))
      ) : (
        <p>You do not have access to this section.</p>
      )}
    </>
  );
}
