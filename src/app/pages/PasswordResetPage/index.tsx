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
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/system';
import { PlexTechLogo } from 'images';
import { NewPasswordPage } from '../NewPasswordPage/Loadable';
import { Error } from 'types/types';
import { apiRequest } from 'utils/apiRequest';
import { getToken, setToken } from 'utils/useToken';

interface Props {
  onBack: () => void;
  email: string;
}

export function PasswordResetPage(props: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<Error>();
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

    const [success, res] = await apiRequest(
      '/users/',
      'POST',
      {
        email: props.email,
        code,
        method: 'checkResetPasswordCode',
      },
      getToken()!.substring(1, getToken()!.length),
    );

    setLoading(false);

    if (!success) {
      if (res.error.errorCode === 401) {
        setIncorrect(true);
        return;
      }
      if (res.error.errorCode === 498) {
        setExpired(true);
        return;
      }
      setError(res.error);
      return;
    }

    setToken('ƒ' + res.access_token);
    setSuccess(true);
    setExpired(false);
    setIncorrect(false);
    setSubmitted(false);
  };

  if (success) {
    return <NewPasswordPage />;
  }

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="Reset Password" content="Login page for PlexTech finance" />
      </Helmet>
      {error ? (
        <ErrorModal open={!!error} error={error} />
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
                  <Button variant="contained" style={{ visibility: 'hidden' }}>
                    Back to login
                  </Button>
                  <Img src={PlexTechLogo} alt="PlexTech logo" />
                  <Button variant="contained" onClick={props.onBack}>
                    Back to login
                  </Button>
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

                <Button variant="contained" onClick={onSubmit} type="submit">
                  {loading ? <StyledCircularProgress size={20} /> : 'Submit'}
                </Button>
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
  min-height: 95%;
  width: 40%;
  min-width: 500px;
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

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
