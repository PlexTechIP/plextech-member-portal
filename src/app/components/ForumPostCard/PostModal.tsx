/**
 *
 * PostModal
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Post } from 'types/types';
import { styled as muiStyled } from '@mui/system';
import { Divider, Modal, Paper, Stack } from '@mui/material';
import { CommentForm } from '../CommentForm';
import { useState } from 'react';

interface Props {
  post: Post;
  open: boolean;
  onClose: () => void;
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
              <H2>{post.date.format('MM/DD/YYYY')}</H2>
            </StyledStack>
            <P>
              {post.anonymous
                ? 'Anonymous'
                : `${post.firstName} ${post.lastName}`}
            </P>
          </Stack>
          <Divider />
          <P>{post.body}</P>
          <CommentForm
            comment={comment}
            onChange={setComment}
            onSubmit={() => {}}
            message="Add Comment"
          />
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

const H2 = styled.h2`
  margin: 0;
`;

const P = styled.p`
  margin: 0;
`;
