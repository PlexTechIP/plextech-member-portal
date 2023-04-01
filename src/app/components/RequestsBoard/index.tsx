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
import { useEffect, useState } from 'react';

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

interface Sums {
  pendingReview: number;
  underReview: number;
  errors: number;
  approved: number;
  declined: number;
}

export function RequestsBoard(props: Props) {
  const [sums, setSums] = useState<Sums>({
    pendingReview: 0,
    underReview: 0,
    errors: 0,
    approved: 0,
    declined: 0,
  });

  useEffect(() => {
    const tempSums: Sums = {
      pendingReview: 0,
      underReview: 0,
      errors: 0,
      approved: 0,
      declined: 0,
    };
    if (props.requests) {
      statuses.forEach((statusKey: string) => {
        props.requests![statusKey].forEach((request: Request) => {
          tempSums[statusKey] += request.amount;
        });
      });

      setSums(tempSums);
    }
  }, [props.requests]);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (
      destination === null ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      (destination.droppableId !== source.droppableId && !props.isTreasurer)
    ) {
      return;
    }

    const request: Request = props.requests![source.droppableId].splice(
      source.index,
      1,
    )[0];

    props.requests![destination.droppableId].splice(
      destination.index,
      0,
      request,
    );

    if (source.droppableId !== destination.droppableId) {
      setSums((prevState: Sums) => ({
        ...prevState,
        [source.droppableId]: prevState[source.droppableId] - request.amount,
        [destination.droppableId]:
          prevState[destination.droppableId] + request.amount,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack direction="row" spacing={1}>
        {statuses.map((statusKey: string) => {
          const regex = statusKey.replace(/([A-Z])/g, ' $1');
          const statusTitleCase =
            regex.charAt(0).toUpperCase() + regex.slice(1);

          return (
            <Section key={statusKey}>
              {!props.requests || props.requests![statusKey].length === 0 ? (
                <H2>{statusTitleCase}</H2>
              ) : (
                <H2>
                  {statusTitleCase}: ${sums[statusKey].toFixed(2)}
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
              <Droppable droppableId={statusKey}>
                {(provided: any, snapshot: any) => (
                  <Stack
                    spacing={1}
                    elevation={2}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {props.requests &&
                      props.requests[statusKey].map(
                        (request: Request, index: number) => (
                          <RequestCard
                            token={props.token}
                            request={request}
                            key={request._id}
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
                    {provided.placeholder}
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
