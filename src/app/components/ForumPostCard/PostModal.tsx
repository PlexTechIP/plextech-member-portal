/**
 *
 * PostModal
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Post } from 'types/types';
import { styled as muiStyled } from '@mui/system';
import { Card, Modal, Paper, Stack } from '@mui/material';

interface Props {
  post: Post;
  open: boolean;
}

export function PostModal(props: Props) {
  const { post, open } = props;
  return (
    <StyledModal open={open}>
      <StyledPaper>
        <StyledStack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <H1>{post.title}</H1>
          <H2>{post.date.format('MM/DD/YYYY')}</H2>
        </StyledStack>
        <P>{post.body}</P>
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
