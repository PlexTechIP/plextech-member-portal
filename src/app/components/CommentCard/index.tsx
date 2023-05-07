/**
 *
 * CommentCard
 *
 */
import * as React from 'react';
import { styled as muiStyled } from '@mui/system';
import styled from 'styled-components/macro';
import { Card, Stack } from '@mui/material';
import { Comment } from '../../../types/types';

interface Props {
  id: string;
  comment: Comment;
}

export function CommentCard(props: Props) {
  const { id, comment } = props;

  return (
    <StyledCard
      style={{
        alignSelf: id === comment.user_id ? 'flex-end' : 'flex-start',
        borderBottomLeftRadius: id === comment.user_id ? '24px' : '0',
        borderBottomRightRadius: id === comment.user_id ? '0' : '24px',
        backgroundColor:
          id === comment.user_id ? 'rgba(255, 138, 0, 0.3)' : 'white',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <H4>
          {comment.firstName} {comment.lastName}
        </H4>
        <H4>{comment.date.format('MM/DD/YYYY')}</H4>
      </Stack>
      <P>{comment.message}</P>
    </StyledCard>
  );
}

const StyledCard = muiStyled(Card)`
  width: 50%;
  padding: 16px;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
`;

const H4 = styled.h4`
  margin: 0;
`;

const P = styled.p`
  margin: 0;
  color: grey;
`;
