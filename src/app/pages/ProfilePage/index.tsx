/**
 *
 * ProfilePage
 *
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Error, User, VenmoProfile } from 'types/types';
import { Helmet } from 'react-helmet-async';
import { ErrorModal } from 'app/components/ErrorModal';
import { styled as muiStyled } from '@mui/system';
// import { AttendanceCard } from 'app/components/AttendanceCard';
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
import { apiRequest } from 'utils/apiRequest';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SuccessDialog } from 'app/components/SuccessDialog';

interface Props {}

export function ProfilePage(props: Props) {
  const [error, setError] = useState<Error>();
  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [accountNumber, setAccountNumber] = useState<string>('');
  const [routingNumber, setRoutingNumber] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');

  const [success, setSuccess] = useState<boolean>(false);

  const [bluevineEmail, setBluevineEmail] = useState<string>('');
  const [bluevinePassword, setBluevinePassword] = useState<string>('');

  useEffect(() => {
    const f = async () => {
      const [success, res] = await apiRequest('/profile/', 'GET');

      if (!success) {
        setError(res.error);
        return;
      }

      setUser(res);
      setBluevineEmail(res.bluevineEmail);
      setBluevinePassword(res.bluevinePassword);
      if (res.bank) {
        setAccountNumber(res.bank.accountNumber);
        setRoutingNumber(res.bank.routingNumber);
        setBankName(res.bank.bankName);
      }
    };
    f();
  }, [props]);

  const bankSubmit = async () => {
    const bodyData = { bankName };
    if (accountNumber && accountNumber[0] !== 'b') {
      bodyData['accountNumber'] = accountNumber;
    }
    if (routingNumber && routingNumber[0] !== 'b') {
      bodyData['routingNumber'] = routingNumber;
    }

    const [success, res] = await apiRequest('/bank/', 'PUT', bodyData);

    if (!success) {
      setError(res.error);
      return;
    }

    setUser((prevUser: User | undefined) => ({
      ...prevUser!,
      bank: {
        ...prevUser!.bank,
        ...bodyData,
      },
    }));

    setSuccess(true);
  };

  const bluevineSubmit = async () => {
    const bodyData = { bluevineEmail };
    if (accountNumber && accountNumber[0] !== 'b') {
      bodyData['bluevinePassword'] = bluevinePassword;
    }

    const [success, res] = await apiRequest('/bluevine/', 'PUT', bodyData);

    if (!success) {
      setError(res.error);
      return;
    }

    setUser((prevUser: User | undefined) => ({
      ...prevUser!,
      bodyData,
    }));

    setSuccess(true);
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
          {/* <Div>
             <AttendanceCard user={user} /> 
          </Div> */}
          <Div>
            <Form>
              <Stack spacing={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <H1>Bank Details</H1>
                  <Button
                    onClick={bankSubmit}
                    variant="contained"
                    disabled={
                      (accountNumber &&
                        accountNumber[0] === 'b' &&
                        routingNumber &&
                        routingNumber[0] === 'b' &&
                        bankName === user.bank.bankName) ||
                      !bankName
                    }
                  >
                    {user.bank ? 'Update' : 'Submit'}
                  </Button>
                </Stack>
                <>
                  <TextField
                    fullWidth
                    label="Account Number"
                    onChange={e => setAccountNumber(e.target.value)}
                    required
                    error={
                      !(
                        /^\d+$/.test(accountNumber) ||
                        (user.bank?.accountNumber &&
                          accountNumber === user.bank?.accountNumber)
                      )
                    }
                    value={accountNumber}
                    type="password"
                  />
                  <TextField
                    fullWidth
                    label="Routing Number"
                    value={routingNumber}
                    onChange={e => setRoutingNumber(e.target.value)}
                    required
                    error={
                      !(
                        /^\d+$/.test(routingNumber) ||
                        (user.bank?.routingNumber &&
                          routingNumber === user.bank?.routingNumber)
                      )
                    }
                    type="password"
                  />
                </>
                <>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    required
                    error={
                      !(
                        bankName ||
                        (user.bank?.bankName &&
                          bankName === user.bank?.bankName)
                      )
                    }
                  />
                  <SuccessDialog
                    open={success}
                    onClose={() => setSuccess(false)}
                  />
                </>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent="flex-end"
                >
                  <StyledInfoOutlinedIcon />
                  <P>Your information is securely encrypted with Fernet.</P>
                </Stack>
              </Stack>
            </Form>
          </Div>
          <Div>
            <Form>
              <Stack spacing={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <H1>Bluevine Details (admin only)</H1>
                  <Button
                    onClick={bluevineSubmit}
                    variant="contained"
                    disabled={
                      !(
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bluevineEmail) &&
                        user.bluevinePassword &&
                        bluevinePassword === user.bluevinePassword
                      )
                    }
                  >
                    {user.bank ? 'Update' : 'Submit'}
                  </Button>
                </Stack>
                <>
                  <TextField
                    fullWidth
                    label="Bluevine Email"
                    onChange={e => setBluevineEmail(e.target.value)}
                    required
                    error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bluevineEmail)}
                    value={bluevineEmail}
                  />
                  <TextField
                    fullWidth
                    label="Bluevine Password"
                    value={bluevinePassword}
                    onChange={e => setBluevinePassword(e.target.value)}
                    required
                    error={
                      !(
                        user.bluevinePassword &&
                        bluevinePassword === user.bluevinePassword
                      )
                    }
                    type="password"
                  />
                </>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent="flex-end"
                >
                  <StyledInfoOutlinedIcon />
                  <P>Your information is securely encrypted with Fernet.</P>
                </Stack>
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

const P = styled.p`
  margin: 0;
  color: grey;
`;

const StyledInfoOutlinedIcon = muiStyled(InfoOutlinedIcon)`
  color: grey;
  font-size: small;
`;
