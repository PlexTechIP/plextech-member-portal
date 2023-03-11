/**
 *
 * ProfilePage
 *
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled as muiStyled } from '@mui/system';
import styled from 'styled-components/macro';
import { Error, User } from 'types/types';
import { Helmet } from 'react-helmet-async';
import { ErrorModal } from 'app/components/ErrorModal';
import { AttendanceCard } from 'app/components/AttendanceCard';

interface Props {
  token: string | null;
  removeToken: () => void;
}

export function ProfilePage(props: Props) {
  const [error, setError] = useState<Error>();
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

        setUser(res);
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
        <title>Profile</title>
        <meta name="description" content="Profile information" />
      </Helmet>
      {error && <ErrorModal open={!!error} error={error} />}
      <Div>{user && <AttendanceCard user={user} />}</Div>
    </>
  );
}

const Div = styled.div`
  min-height: 95%;
  width: 75%;
  min-width: 500px;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
`;

const H1 = styled.h1`
  margin: 0;
`;

const H2 = styled.h2`
  margin: 0;
  padding-bottom: 8px;
`;

const H3 = styled.h3`
  margin: 0;
`;
