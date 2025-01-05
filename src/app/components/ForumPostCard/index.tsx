/**
 *
 * ForumPostCard
 *
 */
import * as React from 'react';
import styled from 'styled-components';
import { Post } from 'types/types';
import { styled as muiStyled } from '@mui/system';
import { Card, Divider, IconButton, Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import { PostModal } from './PostModal';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { VotingButtons } from '../VotingButtons';

interface Props {
  post: Post;
  userId: string;
  onVote: (param: {
    removeFromDownvote: boolean;
    removeFromUpvote: boolean;
    addToDownvote: boolean;
    addToUpvote: boolean;
    postId: string;
  }) => void;
  isTreasurer: boolean;
}

export function ForumPostCard(props: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const mode = useTheme().palette.mode;

  return (
    <>
      <PostModal
        open={showModal}
        post={props.post}
        onClose={() => setShowModal(false)}
        onVote={props.onVote}
        userId={props.userId}
      />
      <StyledCard>
        <Stack spacing={2}>
          <StyledStack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <H1>{props.post.title}</H1>
            <H2>{props.post.date.format('MM/DD/YYYY')}</H2>
          </StyledStack>
          <Divider />

          <Stack direction="row" alignItems="center">
            <P>
              {props.post.body.length > 100
                ? props.post.body.slice(0, 100) + '...'
                : props.post.body}
            </P>
            {props.post.body.length > 100 && (
              <button
                onClick={() => setShowModal(true)}
                style={{
                  color: mode === 'dark' ? 'lightblue' : 'blue',
                  textDecoration: 'inherit',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                see more
              </button>
            )}
          </Stack>

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
            <IconButton onClick={() => setShowModal(true)}>
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <VotingButtons
              post={props.post}
              onVote={props.onVote}
              userId={props.userId}
            />
          </StyledStack>
        </Stack>
      </StyledCard>
    </>
  );
}

const StyledCard = muiStyled(Card)`
  padding: 32px;
  text-align: left;
  display: flex;
  flex-direction: column;
  border-radius: 48px;
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

const H4 = styled.h4`
  margin: 0;
`;

const P = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
