/**
 *
 * RequestsBoard
 *
 */
import { Stack, Paper, Button, Divider } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { styled as muiStyled } from '@mui/system';
import { RequestCard } from './RequestCard';
import { AllRequests, Comment, Error, Request } from '../../../types/types';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { ErrorModal } from '../ErrorModal';
import { ApproveModal } from './ApproveModal';

interface Props {
  requests: AllRequests | null;
  onEdit: (newRequest: Request, mine: boolean) => void;
  onRequest: () => void;
  isTreasurer: boolean;
  token: string | null;
  userName: { firstName: string; lastName: string };
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
  const [error, setError] = useState<Error>();
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [requestedAmount, setRequestedAmount] = useState<number>(0);
  const [approveId, setApproveId] = useState<string>('');
  const [sourceStatus, setSourceStatus] = useState<string>('');
  const [sourceIndex, setSourceIndex] = useState<number>(0);
  const [destinationIndex, setDestinationIndex] = useState<number>(0);

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

  const onDragEnd = async (result: any) => {
    const { destination, source } = result;

    if (
      destination === null ||
      destination.droppableId === source.droppableId ||
      source.droppableId === 'approved' ||
      !props.isTreasurer
    ) {
      return;
    }

    const request: Request = props.requests![source.droppableId][source.index];

    if (destination.droppableId === 'approved') {
      setShowApproveModal(true);
      setRequestedAmount(request.amount);
      setApproveId(request._id);
      setSourceStatus(source.droppableId);
      setSourceIndex(source.index);
      setDestinationIndex(destination.index);
      return;
    }

    props.requests![source.droppableId].splice(source.index, 1);

    props.requests![destination.droppableId].splice(
      destination.index,
      0,
      request,
    );

    setSums((prevState: Sums) => ({
      ...prevState,
      [source.droppableId]: prevState[source.droppableId] - request.amount,
      [destination.droppableId]:
        prevState[destination.droppableId] + request.amount,
    }));

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/approval/${request._id}/`;
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ status: destination.droppableId, comments: [] }),
      });

      if (!response.ok) {
        setError({
          errorCode: response.status,
          errorMessage: response.statusText,
        });
        console.error(response);
      }
    } catch (e: any) {
      console.error(e);
      setError({
        errorMessage: e.toString(),
      });
    }
  };

  const onApprove = async (comments: Comment[], amount: number) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/approval/${approveId}/`;
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          status: 'approved',
          comments: comments,
          amount: amount,
        }),
      });

      if (response.status === 407) {
        setError({
          errorMessage: 'No Venmo ID found.',
        });
      }

      if (!response.ok) {
        setError({
          errorCode: response.status,
          errorMessage: response.statusText,
        });
        console.error(response);
      }
    } catch (e: any) {
      console.error(e);
      setError({
        errorMessage: e.toString(),
      });
    }

    const request: Request = props.requests![sourceStatus].splice(
      sourceIndex,
      1,
    )[0];

    props.requests!['approved'].splice(destinationIndex, 0, request);

    setSums((prevState: Sums) => ({
      ...prevState,
      [sourceStatus]: prevState[sourceStatus] - request.amount,
      approved: prevState.approved + amount,
    }));

    setShowApproveModal(false);
  };

  return (
    <>
      {error && <ErrorModal open={!!error} error={error} />}
      <ApproveModal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        requestedAmount={requestedAmount}
        onSubmit={onApprove}
        token={props.token}
        userName={props.userName}
      />
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
                <Stack spacing={1}>
                  {statusKey === 'pendingReview' && props.requests !== null && (
                    <Button
                      startIcon={React.cloneElement(<AddIcon />)}
                      onClick={props.onRequest}
                    >
                      Request Reimbursement
                    </Button>
                  )}
                  <Droppable droppableId={statusKey}>
                    {(provided: any) => (
                      <Stack
                        spacing={1}
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
                </Stack>
              </Section>
            );
          })}
        </Stack>
      </DragDropContext>
    </>
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
