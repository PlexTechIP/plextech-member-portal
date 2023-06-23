/**
 *
 * ForumPostForm
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Post } from 'types/types';
import { styled as muiStyled } from '@mui/system';
import { Divider, IconButton, Modal, Paper, Stack } from '@mui/material';
import { CommentForm } from '../CommentForm';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { VotingButtons } from '../VotingButtons';

interface Props {
  userId: string;
}

export function ForumPostForm(props: Props) {
  const [post, setPost] = useState<any>({
    // user_id: props.userId,
    // firstName?: string;
    // lastName?: string;
    // _id: string;
    // title: string;
    // body: string;
    // date: Dayjs;
    // images: Image[];
    // anonymous: boolean;
    // private: boolean;
    // upvotes: string[];
    // downvotes: string[];
  });

  return (
    // <StyledPaper>
    //   <Stack spacing={2}>
    //     <Stack>
    //       <StyledStack
    //         direction="row"
    //         justifyContent="space-between"
    //         alignItems="center"
    //       >
    //         <H1>{post.title}</H1>
    //         <IconButton onClick={props.onClose}>
    //           <CloseIcon fontSize="large" />
    //         </IconButton>
    //       </StyledStack>
    //     </Stack>
    //     <Divider />
    //     <P>{post.body}</P>
    //     <CommentForm
    //       comment={comment}
    //       onChange={setComment}
    //       onSubmit={(event: any) => {
    //         event.preventDefault();
    //         setComment('');
    //       }}
    //       message="Add Comment"
    //     />
    //     <StyledStack
    //       direction="row"
    //       justifyContent="space-between"
    //       alignItems="center"
    //     >
    //       <H4>
    //         {props.post.anonymous
    //           ? 'Anonymous'
    //           : `${props.post.firstName} ${props.post.lastName}`}
    //       </H4>
    //       <H4>{post.date.format('MM/DD/YYYY')}</H4>
    //       <VotingButtons
    //         post={props.post}
    //         onVote={props.onVote}
    //         userId={props.userId}
    //       />
    //     </StyledStack>
    //   </Stack>
    // </StyledPaper>
    <></>
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
