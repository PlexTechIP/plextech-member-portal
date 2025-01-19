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
                <h1 className="m-0 text-[3.052rem] pt-6">Reset Password</h1>
                <Stack className="w-full">
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
