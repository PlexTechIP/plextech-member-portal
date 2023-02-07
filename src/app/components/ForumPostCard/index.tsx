/**
 *
 * ForumPostCard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Post } from 'types/types';
import { styled as muiStyled } from '@mui/system';
import { Card, Stack } from '@mui/material';
import { useState } from 'react';
import { PostModal } from './PostModal';

interface Props {
  post: Post;
}

export function ForumPostCard(props: Props) {
  const { post } = props;

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <PostModal
        open={showModal}
        post={post}
        onClose={() => setShowModal(false)}
      />
      <StyledCard onClick={() => setShowModal(true)}>
        <StyledStack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <H1>{post.title}</H1>
          <H2>{post.date.format('MM/DD/YYYY')}</H2>
        </StyledStack>
        <P>
          {post.anonymous ? 'Anonymous' : `${post.firstName} ${post.lastName}`}
        </P>
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
  cursor: pointer;
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
