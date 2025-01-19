/**
 *
 * ForumPostCard
 *
 */
import * as React from 'react';
import { Post } from 'types/types';
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
      <Card className="p-8 text-left flex flex-col !rounded-[48px]">
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="w-full"
          >
            <h1 className="m-0">{props.post.title}</h1>
            <h2 className="m-0">{props.post.date.format('MM/DD/YYYY')}</h2>
          </Stack>
          <Divider />

          <Stack direction="row" alignItems="center">
            <p className="m-0 whitespace-nowrap overflow-hidden text-ellipsis">
              {props.post.body.length > 100
                ? props.post.body.slice(0, 100) + '...'
                : props.post.body}
            </p>
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
            <IconButton onClick={() => setShowModal(true)}>
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <VotingButtons
              post={props.post}
              onVote={props.onVote}
              userId={props.userId}
            />
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
