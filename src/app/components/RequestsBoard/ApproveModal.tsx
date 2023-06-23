/**
 *
 * ApproveModal
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
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
import { styled as muiStyled } from '@mui/system';
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
    <StyledModal open={props.open} onClose={props.onClose}>
      <StyledPaper>
        <Stack spacing={3}>
          <H1>Reimbursement Request Approval</H1>
          <Divider />
          <H3>How much do you want to approve this request for?</H3>
          <Stack direction="row" alignItems="center" spacing={2}>
            <StyledTextField
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
            style={{
              marginLeft: '8px',
              marginRight: '8px',
              marginBottom: '24px',
            }}
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
                firstName: props.userName.firstName,
                lastName: props.userName.lastName,
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
                  firstName: props.userName.firstName,
                  lastName: props.userName.lastName,
                },
              ]);
            }}
          />
          <StyledStack direction="row" justifyContent="space-between">
            {/* Submit Button */}
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
          </StyledStack>
        </Stack>
      </StyledPaper>
    </StyledModal>
  );
}

const StyledTextField = styled(TextField)`
  width: 40%;
`;

const StyledModal = styled(Modal)`
  width: 50%;
  min-height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 64px;
`;

const StyledPaper = muiStyled(Paper)`
  padding: 48px;
  border-radius: 48px;
  min-height: 100%;
`;

const H1 = styled.h1`
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const H3 = styled.h3`
  margin: 0px;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;
