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
import styled from 'styled-components';
import { PlexTechLogo } from 'images';
import { useState } from 'react';
import { PasswordResetPage } from '../PasswordResetPage/Loadable';
import { Error } from 'types/types';
import { apiRequest } from 'utils/apiRequest';
import { getToken } from 'utils/useToken';

interface Props {
  onBack: () => void;
}

export function ForgotPasswordPage(props: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<Error>();
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

    const [success, res] = await apiRequest(
      '/users/',
      'PUT',
      { email, method: 'passwordCode' },
      getToken(),
      () => setIncorrect(true),
    );

    setLoading(false);
    if (!success) {
      setError(res.error);
      return;
    }
    setShowResetPage(true);
    setIncorrect(false);
    setSubmitted(false);
  };

  if (showResetPage) {
    return <PasswordResetPage onBack={props.onBack} email={email} />;
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
