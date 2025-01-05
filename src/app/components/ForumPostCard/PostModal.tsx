/**
 *
 * PostModal
 *
 */
import * as React from 'react';
import styled from 'styled-components';
import { Post } from 'types/types';
import { styled as muiStyled } from '@mui/system';
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
    <StyledModal open={open}>
      <StyledPaper>
        <Stack spacing={2}>
          <Stack>
            <StyledStack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <H1>{post.title}</H1>
              <IconButton onClick={props.onClose}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </StyledStack>
          </Stack>
          <Divider />
          <P>{post.body}</P>
          <CommentForm
            comment={comment}
            onChange={setComment}
            onSubmit={(event: any) => {
              event.preventDefault();
              setComment('');
            }}
            message="Add Comment"
          />
          <StyledStack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <H4>
              {props.post.anonymous
                ? 'Anonymous'
                : `${props.post.first_name} ${props.post.last_name}`}
            </H4>
            <H4>{post.date.format('MM/DD/YYYY')}</H4>
            <VotingButtons
              post={props.post}
              onVote={props.onVote}
              userId={props.userId}
            />
          </StyledStack>
        </Stack>
      </StyledPaper>
    </StyledModal>
  );
}

const StyledPaper = muiStyled(Paper)`
  border-radius: 48px;
  padding: 32px;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const StyledModal = styled(Modal)`
  width: 50%;
  min-width: 500px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 64px;
`;

const StyledStack = muiStyled(Stack)`
  width: 100%;
`;

const H1 = styled.h1`
  margin: 0;
`;

const P = styled.p`
  margin: 0;
`;

const H4 = styled.h4`
  margin: 0;
`;
