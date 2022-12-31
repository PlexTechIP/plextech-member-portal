/**
 *
 * RequestsBoard
 *
 */
import { Paper } from '@material-ui/core';
import { Stack } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { RequestCard } from './RequestCard';
import { AllRequests, Request } from './types';

interface Props {
  requests: AllRequests;
}

const statuses = [
  'pendingReview',
  'underReview',
  'errors',
  'approved',
  'declined',
];

export function RequestsBoard(props: Props) {
  return (
    <Stack direction="row" spacing={1}>
      {statuses.map((statusKey: string) => {
        const regex = statusKey.replace(/([A-Z])/g, ' $1');
        const statusTitleCase = regex.charAt(0).toUpperCase() + regex.slice(1);

        return (
          <Section key={statusKey}>
            <H2>{statusTitleCase}</H2>
            <Stack spacing={1}>
              {props.requests[statusKey].map((request: Request) => (
                <RequestCard
                  request={request}
                  key={request.id}
                  showModal={() => {}}
                  status={statusKey}
                />
              ))}
            </Stack>
          </Section>
        );
      })}
    </Stack>
  );
}

const Section = styled(Paper)`
  width: 100%;
  height: 100%;
  padding: 16px;
  text-align: center;
`;

const H2 = styled.h2`
  margin: 0px;
  padding-bottom: 16px;
`;
