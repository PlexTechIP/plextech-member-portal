/**
 *
 * VotingButtons
 *
 */
import * as React from 'react';
import styled from 'styled-components';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack, IconButton } from '@mui/material';
import { Post } from 'types/types';
import { useState } from 'react';

interface Props {
  post: Post;
  userId: string;
  onVote?: (param: {
    removeFromDownvote: boolean;
    removeFromUpvote: boolean;
    addToDownvote: boolean;
    addToUpvote: boolean;
    postId: string;
  }) => void;
}

export function VotingButtons(props: Props) {
  const { post, userId } = props;

  const [hasUpvoted, setHasUpvoted] = useState<boolean>(
    post.upvotes.includes(userId),
  );
  const [hasDownvoted, setHasDownvoted] = useState<boolean>(
    post.downvotes.includes(userId),
  );

  const onVote = (isUpvote: boolean) => {
    if (!props.onVote) return;

    const param = {
      removeFromDownvote: false,
      removeFromUpvote: false,
      addToDownvote: false,
      addToUpvote: false,
      postId: post.id!,
    };

    if (isUpvote) {
      if (hasUpvoted) {
        post.upvotes = post.upvotes.filter((id: string) => id !== userId);
        param.removeFromUpvote = true;
      } else {
        post.upvotes.push(props.userId);
        param.addToUpvote = true;
        if (hasDownvoted) {
          post.downvotes = post.downvotes.filter((id: string) => id !== userId);
          setHasDownvoted(false);
          param.removeFromDownvote = true;
        }
      }
      setHasUpvoted(!hasUpvoted);
    } else {
      if (hasDownvoted) {
        post.downvotes = post.downvotes.filter((id: string) => id !== userId);
        param.removeFromDownvote = true;
      } else {
        post.downvotes.push(props.userId);
        param.addToDownvote = true;
        if (hasUpvoted) {
          post.upvotes = post.upvotes.filter((id: string) => id !== userId);
          setHasUpvoted(false);
          param.removeFromUpvote = true;
        }
      }
      setHasDownvoted(!hasDownvoted);
    }

    props.onVote(param);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton onClick={() => onVote(true)}>
        <KeyboardArrowUpIcon
          style={{ color: hasUpvoted ? 'green' : 'inherit' }}
        />
      </IconButton>
      <Div>
        <P>{post.upvotes.length - post.downvotes.length}</P>
      </Div>
      <IconButton onClick={() => onVote(false)}>
        <KeyboardArrowDownIcon
          style={{ color: hasDownvoted ? 'red' : 'inherit' }}
        />
      </IconButton>
    </Stack>
  );
}

const Div = styled.div`
  width: 2em;
  text-align: center;
`;

const P = styled.p`
  margin: 0;
`;
