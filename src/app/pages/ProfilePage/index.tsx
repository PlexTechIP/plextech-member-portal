/**
 *
 * ProfilePage
 *
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Error, User, VenmoProfile } from 'types/types';
import { Helmet } from 'react-helmet-async';
import { ErrorModal } from 'app/components/ErrorModal';
import { styled as muiStyled } from '@mui/system';
import { AttendanceCard } from 'app/components/AttendanceCard';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { VenmoCard } from 'app/components/VenmoCard';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  token: string | null;
  removeToken: () => void;
}

export function ProfilePage(props: Props) {
  const [error, setError] = useState<Error>();
  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState<string>('');
  const [profiles, setProfiles] = useState<VenmoProfile[]>([]);
  const [curProfile, setCurProfile] = useState<VenmoProfile>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
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
        setCurProfile(res.venmo);
      } catch (e: any) {
        setError({
          errorMessage: e.toString(),
        });
        console.error(e);
      }
    };
    f();
  }, [props]);

  const onSelect = async (profile: VenmoProfile) => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/venmo/_/`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(profile),
      });

      if (response.status === 401) {
        props.removeToken();
        return;
      } else if (!response.ok) {
        setError({
          errorCode: response.status,
          errorMessage: response.statusText,
        });
        console.error(response);
      }

      setCurProfile(profile);
    } catch (e: any) {
      setError({
        errorMessage: e.toString(),
      });
      console.error(e);
    }
    setLoading(false);
  };

  const onChange = async (e: any) => {
    setUsername(e.target.value);
  };

  const onSearch = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (!username) {
      return;
    }
    const url = `${
      process.env.REACT_APP_BACKEND_URL
    }/venmo/${encodeURIComponent(username)}/`;
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

      if (response.status === 401) {
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

      setProfiles(res.users);
    } catch (e: any) {
      setError({
        errorMessage: e.toString(),
      });
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile information" />
      </Helmet>
      {error && <ErrorModal open={!!error} error={error} />}
      <Div />
      {user && (
        <>
          <Div>
            <AttendanceCard user={user} />
          </Div>
          <Div>
            <Form>
              <Stack spacing={4}>
                {curProfile ? (
                  <Box>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <H1>Venmo Profile</H1>
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <H2>Current:</H2>
                        <VenmoCard venmoProfile={curProfile} />
                      </Stack>
                    </Stack>
                  </Box>
                ) : (
                  <H1>Venmo Profile</H1>
                )}
                <form>
                  <TextField
                    fullWidth
                    label="Venmo Username"
                    value={username}
                    onChange={onChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={onSearch}
                            type="submit"
                            disabled={!username || loading}
                          >
                            {loading ? (
                              <StyledCircularProgress size={20} />
                            ) : (
                              <SearchIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
                <Grid container spacing={2}>
                  {profiles.map((profile: VenmoProfile) => (
                    <Grid
                      item
                      key={profile.id}
                      onClick={() => onSelect(profile)}
                      xs={12}
                      sm={6}
                    >
                      <Button
                        fullWidth
                        sx={{
                          justifyContent: 'flex-start',
                          color: 'inherit',
                          textDecoration: 'inherit',
                          textAlign: 'left',
                          alignItems: 'flex-start',
                          textTransform: 'none',
                          fontSize: 'inherit',
                        }}
                      >
                        <VenmoCard venmoProfile={profile} />
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Form>
          </Div>
        </>
      )}
    </>
  );
}

const Form = muiStyled(Card)`
  padding: 48px;
  width: 80%;
  border-radius: 32px;
`;

const Div = styled.div`
  min-height: 95%;
  width: 75%;
  min-width: 500px;
  margin: auto;
  padding-left: 64px;
  padding-right: 64px;
  padding-top: 32px;
  border-radius: 48px;
`;

const H1 = styled.h1`
  margin: 0;
`;

const H2 = styled.h2`
  margin: 0;
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
