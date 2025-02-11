/**
 *
 * RequestsBoard
 *
 */
import { Stack, Paper, Button, Tooltip } from '@mui/material';
import * as React from 'react';
import { RequestCard } from './RequestCard';
import { AllRequests, Comment, Error, Request } from '../../../types/types';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { ErrorModal } from '../ErrorModal';
import { ApproveModal } from './ApproveModal';
import { apiRequest } from 'utils/apiRequest';
import { getToken } from 'utils/useToken';
import { HelpOutline } from '@mui/icons-material';
import { SuccessDialog } from '../SuccessDialog';

interface Props {
  requests: AllRequests | null;
  onEdit: (newRequest: Request, mine: boolean) => void;
  onRequest: () => void;
  isTreasurer: boolean;
  userName: { firstName: string; lastName: string };
  refreshRequests: (userFilter: string) => void;
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
  const [success, setSuccess] = useState<boolean>(false);

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
      !props.isTreasurer
    ) {
      return;
    }

    const request: any = props.requests![source.droppableId][source.index];

    if (destination.droppableId === 'approved') {
      setShowApproveModal(true);
      setRequestedAmount(request.amount);
      setApproveId(request.id);
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

    const [success, res] = await apiRequest(`/approval/${request.id}/`, 'PUT', {
      status: destination.droppableId,
      comments: [],
    });

    if (!success) {
      setError(res.error);
      return;
    }
  };

  const onApprove = async (comments: Comment[], amount: any) => {
    const [success, res] = await apiRequest(`/approval/${approveId}/`, 'PUT', {
      status: 'approved',
      comments: comments,
      amount: amount,
    });

    if (!success) {
      if (res.status === 407) {
        setError({
          errorMessage: 'User needs to connect their bank account via Plaid.',
        });
        return;
      }
      setError(res.error);
      return;
    }

    const request: any = props.requests![sourceStatus].splice(
      sourceIndex,
      1,
    )[0];
    props.requests!.approved.splice(destinationIndex, 0, request);

    setSums((prevState: Sums) => ({
      ...prevState,
      [sourceStatus]: prevState[sourceStatus] - parseFloat(request.amount),
      approved: prevState.approved + parseFloat(amount),
    }));

    setShowApproveModal(false);
    setSuccess(true);

    // Move to paid immediately since Plaid handles the payment
    setTimeout(() => {
      setSuccess(false);
      props.requests!.approved = props.requests!.approved.filter(
        (r: Request) => r.id !== request.id,
      );
      props.requests!['paid'].splice(0, 0, request);

      setSums((prevState: Sums) => ({
        ...prevState,
        approved: prevState.approved - parseFloat(amount),
        paid: prevState.paid + parseFloat(amount),
      }));
    }, 2000);
  };

  const onClickName = (request: Request) => {
    props.refreshRequests(request.user_id);

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
  };

  return (
    <>
      {error && <ErrorModal open={!!error} error={error} />}
      <ApproveModal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        requestedAmount={requestedAmount}
        onSubmit={onApprove}
        userName={props.userName}
      />
      <SuccessDialog open={success} onClose={() => setSuccess(false)} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Stack direction="row" spacing={1}>
          {statuses.map((statusKey: string) => {
            const regex = statusKey.replace(/([A-Z])/g, ' $1');
            const statusTitleCase =
              regex.charAt(0).toUpperCase() + regex.slice(1);

            return (
              <Paper
                key={statusKey}
                className="w-[calc(20%-8px)] h-full p-8 text-center !rounded-2xl"
                style={
                  statusKey === 'approved'
                    ? { border: '2px solid rgb(255, 138, 0)' }
                    : {}
                }
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className="pb-4"
                  gap={1}
                >
                  <h2 className="m-0 text-2xl">
                    {statusTitleCase}
                    {props.requests &&
                    props.requests![statusKey].length !== 0 &&
                    statusKey !== 'approved'
                      ? `: $${sums[statusKey].toFixed(2)}`
                      : ''}
                  </h2>
                  {statusKey === 'approved' && (
                    <Tooltip title="Moving a request here will process the payment through Plaid and automatically move it to Paid when complete.">
                      <HelpOutline
                        className="cursor-pointer text-gray-500"
                        fontSize="small"
                      />
                    </Tooltip>
                  )}
                </Stack>
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
                          (statusKey !== 'paid'
                            ? props.requests[statusKey].sort(
                                (a: Request, b: Request) => b.amount - a.amount,
                              )
                            : props.requests[statusKey]
                          ).map((request: Request, index: number) => (
                            <RequestCard
                              request={request}
                              key={request.id}
                              index={index}
                              onEdit={(mine: boolean) =>
                                props.onEdit(request, mine)
                              }
                              mine={
                                !props.isTreasurer ||
                                request.user_id ===
                                  (jwt_decode(getToken()!) as any).sub
                              }
                              onClickName={() => onClickName(request)}
                            />
                          ))}
                        {provided.placeholder}
                      </Stack>
                    )}
                  </Droppable>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </DragDropContext>
    </>
  );
}
