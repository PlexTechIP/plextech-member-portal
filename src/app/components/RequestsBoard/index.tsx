/**
 *
 * RequestsBoard
 *
 */
import { Stack, Paper, Button } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { styled as muiStyled } from '@mui/system';
import { RequestCard } from './RequestCard';
import { AllRequests, Request } from '../../../types/types';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';

interface Props {
  requests: AllRequests | null;
  onEdit: (newRequest: Request, mine: boolean) => void;
  onRequest: () => void;
  isTreasurer: boolean;
  token: string | null;
}

const statuses = [
  'pendingReview',
  'underReview',
  'errors',
  'approved',
  'declined',
];

export function RequestsBoard(props: Props) {
  const [dragFrom, setDragFrom] = useState<string | null>(null);

  const onDragEnd = (event: any) => {
    // event.preventDefault();
    setDragFrom(null);
  };

  const onDragStart = (start: any) => {
    setDragFrom(start.source.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Stack direction="row" spacing={1}>
        {statuses.map((statusKey: string) => {
          const regex = statusKey.replace(/([A-Z])/g, ' $1');
          const statusTitleCase =
            regex.charAt(0).toUpperCase() + regex.slice(1);
          let sum: number = 0;
          if (props.requests) {
            props.requests![statusKey].forEach((request: Request) => {
              sum += request.amount;
            });
          }

          return (
            <Section key={statusKey}>
              <Droppable droppableId={statusKey}>
                {(provided: any, snapshot: any) => (
                  <Stack
                    spacing={1}
                    elevation={2}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {!props.requests ||
                    props.requests![statusKey].length === 0 ? (
                      <H2>{statusTitleCase}</H2>
                    ) : (
                      <H2>
                        {statusTitleCase}: ${sum.toFixed(2)}
                      </H2>
                    )}
                    {statusKey === 'pendingReview' && props.requests !== null && (
                      <Button
                        startIcon={React.cloneElement(<AddIcon />)}
                        onClick={props.onRequest}
                      >
                        Request Reimbursement
                      </Button>
                    )}
                    {dragFrom !== statusKey && provided.placeholder}
                    {props.requests &&
                      props.requests[statusKey].map(
                        (request: Request, index: number) => (
                          <RequestCard
                            token={props.token}
                            request={request}
                            key={index}
                            index={index}
                            onEdit={(mine: boolean) =>
                              props.onEdit(request, mine)
                            }
                            mine={
                              !props.isTreasurer ||
                              request.user_id ===
                                (jwt_decode(props.token!) as any).sub
                            }
                          />
                        ),
                      )}
                  </Stack>
                )}
              </Droppable>
            </Section>
          );
        })}
      </Stack>
    </DragDropContext>
  );
}

const Section = muiStyled(Paper)`
  width: calc(20% - 8px);
  height: 100%;
  padding: 32px;
  text-align: center;
  border-radius: 24px;
`;

const H2 = styled.h2`
  margin: 0px;
  padding-bottom: 16px;
`;
