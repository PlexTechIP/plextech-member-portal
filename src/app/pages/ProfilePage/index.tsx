/**
 *
 * ProfilePage
 *
 */
import { Card } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled as muiStyled } from '@mui/system';
import styled from 'styled-components/macro';
import { User } from 'types/types';
import { Helmet } from 'react-helmet-async';
import { ErrorModal } from 'app/components/ErrorModal';

interface Props {
  token: string | null;
  removeToken: () => void;
}

export function ProfilePage(props: Props) {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const f = async () => {
      setLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/profile/`;
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

        console.log('here');

        if (response.status === 401 || response.status === 422) {
          props.removeToken();
          return;
        } else if (!response.ok) {
          setError(true);
          console.error(response);
        }

        const res = await response.json();

        setUser(res);
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
        <title>Profile</title>
        <meta name="description" content="Profile information" />
      </Helmet>
      {error && <ErrorModal open={error} />}
      <Div>
        <StyledCard></StyledCard>
      </Div>
    </>
  );
}

const StyledCard = muiStyled(Card)`
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;

const Div = styled.div`
  min-height: 95%;
  width: 40%;
  min-width: 500px;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
`;
