/**
 *
 * ForgotPasswordPage
 *
 */
import {
  Stack,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';
import { ErrorModal } from 'app/components/ErrorModal';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { styled as muiStyled } from '@mui/system';
import styled from 'styled-components/macro';
import PlexTechLogo from '../../../PlexTechLogo.png';
import { useState } from 'react';
import { PasswordResetPage } from '../PasswordResetPage/Loadable';

interface Props {
  onBack: () => void;
  setToken: (newToken: string) => void;
  token: string | null;
}

export function ForgotPasswordPage(props: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [showResetPage, setShowResetPage] = useState<boolean>(false);

  const onEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (email === '') {
      setSubmitted(true);
      return;
    }
    setLoading(true);

    const url = `${process.env.REACT_APP_BACKEND_URL}/users/`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email, method: 'passwordCode' }),
      });

      setLoading(false);

      if (response.status === 401 || response.status === 422) {
        console.error(response);
        setIncorrect(true);
        return;
      }
      if (!response.ok) {
        setError(true);
        return;
      }
      setShowResetPage(true);
      setIncorrect(false);
      setSubmitted(false);
    } catch (e: any) {
      console.error(e);
      setError(true);
    }
  };

  if (showResetPage) {
    return (
      <PasswordResetPage
        onBack={props.onBack}
        email={email}
        setToken={props.setToken}
        token={props.token}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="description"
          content="Forgot Password page for PlexTech finance"
        />
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
                <H1>Forgot Password</H1>
                <p>
                  We'll send a 5-digit code to your email address that you can
                  use to reset your password. This code will expire in 5
                  minutes. Please keep this tab open.
                </p>
                <StyledStack>
                  <p>Email Address</p>
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    value={email}
                    onChange={onEmailChange}
                    error={(submitted && email === '') || incorrect}
                    helperText={
                      (submitted && email === '' && 'Required') ||
                      (incorrect &&
                        "Account doesn't exist. Go back to the login page to make an account.")
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
  min-height: 75%;
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
