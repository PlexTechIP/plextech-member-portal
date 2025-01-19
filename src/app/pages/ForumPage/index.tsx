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
import { Error, Post } from 'types/types';
import AddIcon from '@mui/icons-material/Add';
import { ForumPostForm } from 'app/components/ForumPostForm';
import jwt_decode from 'jwt-decode';
import { apiRequest } from 'utils/apiRequest';
import { getToken } from 'utils/useToken';

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
    const [success, res] = await apiRequest('/forum/', 'PUT', param);

    if (!success) {
      setError(res.error);
    }
  };

  useEffect(() => {
    const f = async () => {
      const [success, res] = await apiRequest('/forum/', 'GET');

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
      const [success, res] = await apiRequest('/profile/', 'GET');

      if (!success) {
        setError(res.error);
      }

      setIsTreasurer(res.treasurer);
    };

    f();
  }, [props]);

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
      <Modal
        open={showForm}
        className="w-1/2 min-w-[500px] h-full absolute inset-0 m-auto p-16"
      >
        <ForumPostForm
          userId={(jwt_decode(getToken()!) as { sub: string }).sub}
          onClose={() => setShowForm(false)}
        />
      </Modal>
      <div className="min-h-[95%] w-1/2 min-w-[500px] mx-auto p-16 [&_.MuiButton-root]:!rounded-[48px]">
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
                key={post.id}
                post={post}
                userId={(jwt_decode(getToken()!) as any).sub}
                onVote={onVote}
              />
            ))}
        </Stack>
      </div>
    </>
  );
}
