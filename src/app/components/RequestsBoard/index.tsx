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
import { AllRequests, Comment, Error, Request } from '../../../types/types';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { ErrorModal } from '../ErrorModal';
import { ApproveModal } from './ApproveModal';
import { apiRequest } from 'utils/apiRequest';

interface Props {
  requests: AllRequests | null;
  onEdit: (newRequest: Request, mine: boolean) => void;
  onRequest: () => void;
  isTreasurer: boolean;
  token: string | null;
  removeToken: () => void;
  userName: { firstName: string; lastName: string };
}

const statuses = ['pendingReview', 'underReview', 'errors', 'approved', 'paid'];

interface Sums {
  pendingReview: number;
  underReview: number;
  errors: number;
  approved: number;
  paid: number;
}

export function RequestsBoard(props: Props) {
  const [sums, setSums] = useState<Sums>({
    pendingReview: 0,
    underReview: 0,
    errors: 0,
    approved: 0,
    paid: 0,
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
      paid: 0,
    };
    if (props.requests) {
      statuses.forEach((statusKey: string) => {
        props.requests![statusKey].forEach(
          (request: any) => (tempSums[statusKey] += parseFloat(request.amount)),
        );
      });

      setSums(tempSums);
    }
  }, [props.requests]);

  const onDragEnd = async (result: any) => {
    const { destination, source } = result;

    if (
      destination === null ||
      destination.droppableId === source.droppableId ||
      // source.droppableId === 'approved' ||
      !props.isTreasurer
    ) {
      return;
    }

    const request: any = props.requests![source.droppableId][source.index];

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
      [source.droppableId]:
        prevState[source.droppableId] - parseFloat(request.amount),
      [destination.droppableId]:
        prevState[destination.droppableId] + parseFloat(request.amount),
    }));

    const [success, res] = await apiRequest(
      `/approval/${request._id}/`,
      'PUT',
      props.token,
      props.removeToken,
      { status: destination.droppableId, comments: [] },
    );

    if (!success) {
      setError(res.error);
      return;
    }
  };

  const onApprove = async (comments: Comment[], amount: any) => {
    const [success, res] = await apiRequest(
      `/approval/${approveId}/`,
      'PUT',
      props.token,
      props.removeToken,
      {
        status: 'approved',
        comments: comments,
        amount: amount,
      },
    );

    if (!success) {
      if (res.status === 407) {
        setError({ errorMessage: 'User has not set Venmo account.' });
      }
      setError(res.error);
      return;
    }

    const request: any = props.requests![sourceStatus].splice(
      sourceIndex,
      1,
    )[0];

    props.requests!['approved'].splice(destinationIndex, 0, request);

    setSums((prevState: Sums) => ({
      ...prevState,
      [sourceStatus]: prevState[sourceStatus] - parseFloat(request.amount),
      approved: prevState.approved + parseFloat(amount),
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
                          props.requests[statusKey]
                            .sort(
                              (a: Request, b: Request) => b.amount - a.amount,
                            )
                            .map((request: Request, index: number) => (
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
                            ))}
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
