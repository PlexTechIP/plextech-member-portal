/**
 *
 * ForumPostForm
 *
 */
import * as React from 'react';
import styled from 'styled-components';
import { Post } from 'types/types';
import { styled as muiStyled } from '@mui/system';
import { Divider, IconButton, Paper, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { VotingButtons } from '../VotingButtons';
import { apiRequest } from 'utils/apiRequest';
import dayjs from 'dayjs';

interface Props {
  userId: string;
  onClose: () => void;
}

export function ForumPostForm(props: Props) {
  useEffect(() => {
    const f = async () => {
      const [success, res] = await apiRequest(`/forum/`, 'PATCH');

      if (!success) {
        setError(res.error);
        return;
      }

      if (!success) {
        setError(res.error);
      } else {
        setUserName({ firstName: res.firstName, lastName: res.lastName });
      }
    };
    f();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>();
  const [userName, setUserName] = useState<any>({
    firstName: '',
    lastName: '',
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [post, setPost] = useState<Post>({
    user_id: props.userId,
    firstName: userName.firstName,
    lastName: userName.lastName,
    title: '',
    body: '',
    date: dayjs(),
    images: [],
    anonymous: false,
    private: false,
    upvotes: [],
    downvotes: [],
  });

  return (
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
        <StyledStack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <H4>
            {post.anonymous
              ? 'Anonymous'
              : `${post.firstName} ${post.lastName}`}
          </H4>
          <H4>{post.date.format('MM/DD/YYYY')}</H4>
          <VotingButtons post={post} onVote={() => {}} userId={props.userId} />
        </StyledStack>
      </Stack>
    </StyledPaper>
  );
}

const StyledPaper = muiStyled(Paper)`
  border-radius: 48px;
  padding: 32px;
  text-align: left;
  display: flex;
  flex-direction: column;
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
