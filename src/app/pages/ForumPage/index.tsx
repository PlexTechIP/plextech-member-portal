/**
 *
 * ForumPage
 *
 */
import { ErrorModal } from 'app/components/ErrorModal';
import { ForumPostCard } from 'app/components/ForumPostCard';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { Post } from 'types/types';

interface Props {
  token: string | null;
  removeToken: () => void;
}

export function ForumPage(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const f = async () => {
      setLoading(true);
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
        setLoading(false);

        if (response.status === 401 || response.status === 422) {
          props.removeToken();
          return;
        } else if (!response.ok) {
          setError(true);
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
        setError(true);
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
      {error && <ErrorModal open={error} />}
      <Div>
        {posts.map((post: Post) => (
          <ForumPostCard key={post._id} post={post} />
        ))}
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
  border-radius: 48px;
`;
