/**
 *
 * ForumPostForm
 *
 */
import * as React from 'react';
import { Post } from 'types/types';
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
    first_name: userName.first_name,
    last_name: userName.last_name,
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="w-full"
        >
          <h4 className="m-0">
            {post.anonymous
              ? 'Anonymous'
              : `${post.first_name} ${post.last_name}`}
          </h4>
          <h4 className="m-0">{post.date.format('MM/DD/YYYY')}</h4>
          <VotingButtons post={post} onVote={() => {}} userId={props.userId} />
        </Stack>
      </Stack>
    </Paper>
  );
}
