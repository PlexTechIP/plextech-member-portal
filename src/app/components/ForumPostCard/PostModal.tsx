/**
 *
 * PostModal
 *
 */
import * as React from 'react';
import { Post } from 'types/types';
import { Divider, IconButton, Modal, Paper, Stack } from '@mui/material';
import { CommentForm } from '../CommentForm';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { VotingButtons } from '../VotingButtons';

interface Props {
  post: Post;
  open: boolean;
  onClose: () => void;
  userId: string;
  onVote: (param: {
    removeFromDownvote: boolean;
    removeFromUpvote: boolean;
    addToDownvote: boolean;
    addToUpvote: boolean;
    postId: string;
  }) => void;
}

export function PostModal(props: Props) {
  const { post, open } = props;
  const [comment, setComment] = useState<string>('');

  return (
    <Modal
      open={open}
      className="w-1/2 min-w-[500px] h-full absolute inset-0 m-auto p-16"
    >
      <Paper className="!rounded-[48px] p-8 text-left flex flex-col">
        <Stack spacing={2}>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="w-full"
            >
              <h1 className="m-0">{post.title}</h1>
              <IconButton onClick={props.onClose}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Stack>
          <Divider />
          <p className="m-0">{post.body}</p>
          <CommentForm
            comment={comment}
            onChange={setComment}
            onSubmit={(event: any) => {
              event.preventDefault();
              setComment('');
            }}
            message="Add Comment"
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="w-full"
          >
            <h4 className="m-0">
              {props.post.anonymous
                ? 'Anonymous'
                : `${props.post.first_name} ${props.post.last_name}`}
            </h4>
            <h4 className="m-0">{post.date.format('MM/DD/YYYY')}</h4>
            <VotingButtons
              post={props.post}
              onVote={props.onVote}
              userId={props.userId}
            />
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}
