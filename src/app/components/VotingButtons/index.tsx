/**
 *
 * VotingButtons
 *
 */
import * as React from 'react';
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
  const [upvoted, setUpvoted] = useState<boolean>(
    props.post.upvotes.includes(props.userId),
  );
  const [downvoted, setDownvoted] = useState<boolean>(
    props.post.downvotes.includes(props.userId),
  );

  const handleUpvote = () => {
    if (!props.onVote) return;

    if (upvoted) {
      props.onVote({
        removeFromDownvote: false,
        removeFromUpvote: true,
        addToDownvote: false,
        addToUpvote: false,
        postId: props.post.id!,
      });
      setUpvoted(false);
    } else {
      props.onVote({
        removeFromDownvote: downvoted,
        removeFromUpvote: false,
        addToDownvote: false,
        addToUpvote: true,
        postId: props.post.id!,
      });
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  const handleDownvote = () => {
    if (!props.onVote) return;

    if (downvoted) {
      props.onVote({
        removeFromDownvote: true,
        removeFromUpvote: false,
        addToDownvote: false,
        addToUpvote: false,
        postId: props.post.id!,
      });
      setDownvoted(false);
    } else {
      props.onVote({
        removeFromDownvote: false,
        removeFromUpvote: upvoted,
        addToDownvote: true,
        addToUpvote: false,
        postId: props.post.id!,
      });
      setDownvoted(true);
      setUpvoted(false);
    }
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={handleUpvote}>
        <KeyboardArrowUpIcon color={upvoted ? 'primary' : undefined} />
      </IconButton>
      <div className="w-8 text-center">
        <p className="m-0">
          {props.post.upvotes.length - props.post.downvotes.length}
        </p>
      </div>
      <IconButton onClick={handleDownvote}>
        <KeyboardArrowDownIcon color={downvoted ? 'primary' : undefined} />
      </IconButton>
    </Stack>
  );
}
