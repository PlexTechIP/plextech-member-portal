/**
 *
 * ForumPage
 *
 */
import { Button, Modal, Stack, useTheme } from '@mui/material';
import { ErrorModal } from 'app/components/ErrorModal';
import { ForumPostCard } from 'app/components/ForumPostCard';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { Error, Post } from 'types/types';
import AddIcon from '@mui/icons-material/Add';
import { ForumPostForm } from 'app/components/ForumPostForm';
import jwt_decode from 'jwt-decode';
import { apiRequest } from 'utils/apiRequest';
import { getToken, removeToken } from 'utils/useToken';

interface Props {}

export function ForumPage(props: Props) {
  const [error, setError] = useState<Error>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  const onVote = async (param: {
    removeFromDownvote: boolean;
    removeFromUpvote: boolean;
    addToDownvote: boolean;
    addToUpvote: boolean;
    postId: string;
  }) => {
    const [success, res] = await apiRequest(
      '/forum/',
      'PUT',
      getToken(),
      removeToken,
      param,
    );

    if (!success) {
      setError(res.error);
    }
  };

  useEffect(() => {
    const f = async () => {
      const [success, res] = await apiRequest(
        '/forum/',
        'GET',
        getToken(),
        removeToken,
      );

      if (!success) {
        setError(res.error);
      }

      if (!success) {
        setError(res.error);
      }

      setPosts(
        res.posts.map((post: any) => ({
          ...post,
          date: dayjs(post.date),
        })),
      );
    };
    f();
  }, [props]);

  const [isTreasurer, setIsTreasurer] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      const [success, res] = await apiRequest(
        '/profile/',
        'GET',
        getToken(),
        removeToken,
      );

      if (!success) {
        setError(res.error);
      }

      setIsTreasurer(res.treasurer);
    };

    f();
  }, [props, getToken()]);

  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Forum</title>
        <meta
          name="description"
          content="An anonymous forum to discuss anything PlexTech related."
        />
      </Helmet>
      {error && <ErrorModal open={!!error} error={error} />}
      <StyledModal open={showForm}>
        <ForumPostForm
          userId={(jwt_decode(getToken()!) as { sub: string }).sub}
          onClose={() => setShowForm(false)}
        />
      </StyledModal>
      <Div>
        <Stack spacing={2}>
          <Button
            onClick={() => setShowForm(true)}
            startIcon={React.cloneElement(<AddIcon />)}
            fullWidth
            variant="contained"
            style={{ backgroundColor: theme.palette.background.default }}
          >
            Create Post
          </Button>
          {posts
            .filter((post: Post) => !post.private || isTreasurer)
            .map((post: Post) => (
              <ForumPostCard
                isTreasurer={isTreasurer}
                key={post._id}
                post={post}
                userId={(jwt_decode(getToken()!) as any).sub}
                onVote={onVote}
              />
            ))}
        </Stack>
      </Div>
    </>
  );
}

const Div = styled.div`
  min-height: 95%;
  width: 50%;
  min-width: 500px;
  margin: auto;
  padding: 64px;
  .MuiButton-root {
    border-radius: 48px;
  }
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
