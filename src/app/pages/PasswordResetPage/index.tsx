/**
 *
 * PasswordResetPage
 *
 */
import {
  Stack,
  TextField,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import { ErrorModal } from 'app/components/ErrorModal';
import * as React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { styled as muiStyled } from '@mui/system';
import PlexTechLogo from '../../../PlexTechLogo.png';
import { NewPasswordPage } from '../NewPasswordPage/Loadable';

interface Props {
  onBack: () => void;
  email: string;
  setToken: (newToken: string) => void;
  token: string | null;
}

export function PasswordResetPage(props: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onCodeChange = ({ target }) => {
    setCode(target.value);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (code === '') {
      setSubmitted(true);
      return;
    }
    setLoading(true);

    const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/users/`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          email: props.email,
          code,
          method: 'checkResetPasswordCode',
        }),
      });
      setLoading(false);

      if (!response.ok) {
        if (response.status === 401) {
          setIncorrect(true);
          return;
        }
        if (response.status === 498) {
          setExpired(true);
          return;
        }
        console.error(response);
        setError(true);
        return;
      }
      const res = await response.json();

      props.setToken('ƒ' + res.access_token);
      setSuccess(true);
      setExpired(false);
      setIncorrect(false);
      setSubmitted(false);
    } catch (e: any) {
      console.error(e);
      setError(true);
      return;
    }
  };

  if (success) {
    return <NewPasswordPage setToken={props.setToken} token={props.token} />;
  }

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="Reset Password" content="Login page for PlexTech finance" />
      </Helmet>
      {error ? (
        <ErrorModal open={error} />
      ) : (
        <Div>
          <Form elevation={3}>
            <form>
              <Stack alignItems="center" spacing={4}>
                <StyledStack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <StyledButton
                    variant="contained"
                    style={{ visibility: 'hidden' }}
                  >
                    Back to login
                  </StyledButton>
                  <Img src={PlexTechLogo} alt="PlexTech logo" />
                  <StyledButton variant="contained" onClick={props.onBack}>
                    Back to login
                  </StyledButton>
                </StyledStack>
                <H1>Reset Password</H1>
                <StyledStack>
                  <p>5-digit code (check your email)</p>
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    value={code}
                    onChange={onCodeChange}
                    error={(submitted && code === '') || incorrect}
                    helperText={
                      (submitted && code === '' && 'Required') ||
                      (incorrect && 'Incorrect code.') ||
                      (expired && 'Code expired. Please try again.')
                    }
                  />
                </StyledStack>

                <StyledButton
                  variant="contained"
                  onClick={onSubmit}
                  type="submit"
                >
                  {loading ? <StyledCircularProgress size={20} /> : 'Submit'}
                </StyledButton>
              </Stack>
            </form>
          </Form>
          <div style={{ height: '5%' }} />
        </Div>
      )}
    </>
  );
}

const Form = muiStyled(Paper)`
  min-height: 65%;
  width: 40%;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const H1 = styled.h1`
  margin: 0px;
  font-size: 3.052rem;
  padding-top: 24px;
`;

const Img = styled.img`
  max-width: 80px;
`;

const Div = styled.div`
  padding-top: 64px;
  height: 100%;
`;

const StyledButton = muiStyled(Button)`
  background-color: white;
  color: rgb(255, 138, 0);
  font-weight: bold;
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
