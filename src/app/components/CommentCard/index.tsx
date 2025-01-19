/**
 *
 * CommentCard
 *
 */
import * as React from 'react';
import { Card, Stack } from '@mui/material';
import { Comment } from '../../../types/types';

interface Props {
  id: string;
  comment: Comment;
}

export function CommentCard(props: Props) {
  const { id, comment } = props;
  const isOwn = id === comment.user_id;

  return (
    <Card
      className={`w-1/2 p-4 !rounded-t-2xl ${
        isOwn
          ? 'self-end !rounded-bl-2xl bg-[rgba(255,138,0,0.3)]'
          : 'self-start !rounded-br-2xl bg-white'
      }`}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h4 className="m-0">
          {comment.first_name} {comment.last_name}
        </h4>
        <h4 className="m-0">{comment.date.format('MM/DD/YYYY')}</h4>
      </Stack>
      <p className="m-0 text-gray-500">{comment.message}</p>
    </Card>
  );
}
