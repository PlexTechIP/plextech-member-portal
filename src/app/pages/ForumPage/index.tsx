/**
 *
 * ForumPage
 *
 */
import { Button, Modal, Stack } from '@mui/material';
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

interface Props {
  token: string | null;
  removeToken: () => void;
}

export function ForumPage(props: Props) {
  const [error, setError] = useState<Error>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/forum/`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + props.token,
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        });

        if (response.status === 401 || response.status === 422) {
          props.removeToken();
          return;
        } else if (!response.ok) {
          setError({
            errorCode: response.status,
            errorMessage: response.statusText,
          });
          console.error(response);
        }

        const res = await response.json();

        setPosts(
          res.posts.map((post: any) => ({
            ...post,
            date: dayjs(post.date),
          })),
        );
      } catch (e: any) {
        setError({
          errorMessage: e,
        });
        console.error(e);
      }
    };
    f();
  }, [props]);

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
      <Modal open={showForm}>
        <ForumPostForm />
      </Modal>
      <Div>
        <Stack spacing={2}>
          <Button
            onClick={() => setShowForm(true)}
            startIcon={React.cloneElement(<AddIcon />)}
            fullWidth
            variant="contained"
            style={{ backgroundColor: 'white', color: 'rgb(255, 138, 0)' }}
          >
            Create Post
          </Button>
          {posts.map((post: Post) => (
            <ForumPostCard key={post._id} post={post} />
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
