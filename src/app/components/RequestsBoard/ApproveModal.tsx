/**
 *
 * ApproveModal
 *
 */
import * as React from 'react';
import {
  Button,
  Divider,
  InputAdornment,
  Modal,
  Paper,
  Slider,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { CommentForm } from '../CommentForm';
import { CommentCard } from '../CommentCard';
import jwt_decode from 'jwt-decode';
import { Comment } from 'types/types';
import dayjs from 'dayjs';
import { getToken } from 'utils/useToken';

interface Props {
  open: boolean;
  onClose: () => void;
  requestedAmount: number;
  onSubmit: (comments: Comment[], amount: number) => void;
  userName: { firstName: string; lastName: string };
}

export function ApproveModal(props: Props) {
  const [amount, setAmount] = useState<number>(0);
  useEffect(() => {
    setAmount(props.requestedAmount);
  }, [props.requestedAmount]);

  const [comments, setComments] = useState<Comment[]>([]);
  const [curComment, setCurComment] = useState<string>('');

  const handleAmountChange = ({ target }) => setAmount(target.value);

  const handleSliderChange = ({ target }) =>
    setAmount(+((props.requestedAmount / 100) * target.value).toFixed(2));

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      className="w-1/2 min-h-full absolute inset-0 m-auto p-16"
    >
      <Paper className="p-12 !rounded-[48px] min-h-full">
        <Stack spacing={3}>
          <h1 className="m-0 overflow-hidden whitespace-nowrap text-ellipsis text-3xl">
            Reimbursement Request Approval
          </h1>
          <Divider />
          <h3 className="m-0">
            How much do you want to approve this request for?
          </h3>
          <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
              className="w-2/5"
              variant="outlined"
              type="number"
              value={amount}
              label="Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              required
              onChange={handleAmountChange}
            />
            <Button
              variant="text"
              onClick={() => setAmount(props.requestedAmount)}
            >
              Reset
            </Button>
          </Stack>
          <Slider
            defaultValue={100}
            value={Math.round((amount / props.requestedAmount) * 100)}
            step={5}
            min={0}
            max={100}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0%',
              },
              {
                value: 50,
                label: '50%',
              },
              {
                value: 100,
                label: '100%',
              },
            ]}
            className="mx-2 mb-6"
          />
          <Divider />
          {getToken() &&
            [
              ...comments,
              {
                message: `Request approved for $${amount} (${Math.round(
                  (amount / props.requestedAmount) * 100,
                )}%)`,
                date: dayjs(),
                user_id: (jwt_decode(getToken()!) as { sub: string }).sub,
                first_name: props.userName.firstName,
                last_name: props.userName.lastName,
              },
            ]
              .map((comment: Comment, index: number) => (
                <CommentCard
                  key={index}
                  id={(jwt_decode(getToken()!) as { sub: string }).sub}
                  comment={comment}
                />
              ))
              .sort()}

          <CommentForm
            comment={curComment}
            message="Add Comment"
            onChange={(newComment: string) => setCurComment(newComment)}
            onSubmit={(event: any) => {
              event.preventDefault();
              setComments((prevState: Comment[]) => [
                ...prevState,
                {
                  message: curComment,
                  date: dayjs(),
                  user_id: (jwt_decode(getToken()!) as { sub: string }).sub,
                  first_name: props.userName.firstName,
                  last_name: props.userName.lastName,
                },
              ]);
            }}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            className="w-full"
          >
            <Button
              variant="contained"
              onClick={() => {
                setComments([]);
                props.onSubmit(comments, amount);
              }}
              type="submit"
            >
              Approve
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                props.onClose();
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}
