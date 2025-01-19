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
        <div className="pt-16 h-full">
          <Paper
            className="min-h-[95%] w-[40%] min-w-[500px] mx-auto p-16 !rounded-[48px]"
            elevation={3}
          >
            <form>
              <Stack alignItems="center" spacing={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  className="w-full"
                >
                  <Button variant="contained" style={{ visibility: 'hidden' }}>
                    Back to login
                  </Button>
                  <img
                    src={PlexTechLogo}
                    alt="PlexTech logo"
                    className="max-w-[80px]"
                  />
                  <Button variant="contained" onClick={props.onBack}>
                    Back to login
                  </Button>
                </Stack>
                <h1 className="m-0 text-[3.052rem] pt-6">Forgot Password</h1>
                <p>
                  We'll send a 5-digit code to your email address that you can
                  use to reset your password. This code will expire in 5
                  minutes. Please keep this tab open.
                </p>
                <Stack className="w-full">
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
                </Stack>

                <Button variant="contained" onClick={onSubmit} type="submit">
                  {loading ? (
                    <CircularProgress
                      className="text-[rgb(255,138,0)]"
                      size={20}
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Stack>
            </form>
          </Paper>
          <div className="h-[5%]" />
        </div>
      )}
    </>
  );
}
