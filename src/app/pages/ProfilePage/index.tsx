/**
 *
 * ProfilePage
 *
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Error, User } from 'types/types';
import { Helmet } from 'react-helmet-async';
import { ErrorModal } from 'app/components/ErrorModal';
import { styled as muiStyled } from '@mui/system';
// import { AttendanceCard } from 'app/components/AttendanceCard';
import {
  Button,
  Card,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import { apiRequest } from 'utils/apiRequest';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SuccessDialog } from 'app/components/SuccessDialog';

interface Props {}

export function ProfilePage(props: Props) {
  const [error, setError] = useState<Error>();
  const [user, setUser] = useState<User>();

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
    if (accountNumber !== user?.bank?.accountNumber) {
      bodyData['accountNumber'] = accountNumber;
    }
    if (routingNumber !== user?.bank?.routingNumber) {
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
    if (bluevinePassword && bluevinePassword !== user?.bluevinePassword) {
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
                      !accountNumber ||
                      !routingNumber ||
                      (accountNumber === user.bank?.accountNumber &&
                        routingNumber === user.bank?.routingNumber &&
                        bankName === user.bank?.bankName) ||
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
                        (accountNumber && /^\d+$/.test(accountNumber)) ||
                        accountNumber === user.bank?.accountNumber
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
                        (routingNumber && /^\d+$/.test(routingNumber)) ||
                        routingNumber === user.bank?.routingNumber
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
                    error={!(bankName || bankName === user.bank?.bankName)}
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
                      !bluevineEmail ||
                      !bluevinePassword ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bluevineEmail) ||
                      (bluevinePassword === user.bluevinePassword &&
                        bluevineEmail === user.bluevineEmail)
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
                    error={!bluevinePassword}
                    required
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
