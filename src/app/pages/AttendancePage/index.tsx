/**
 *
 * AttendancePage
 *
 */
import { ErrorModal } from 'app/components/ErrorModal';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// import styled from 'styled-components/macro';
// import dayjs, { Dayjs } from 'dayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  CircularProgress,
  Paper,
  // Stack,
  // TextField,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Button,
  // InputAdornment,
  // IconButton,
} from '@mui/material';
import { styled as muiStyled } from '@mui/system';
import { Error } from 'types/types';
// import AddIcon from '@mui/icons-material/Add';
import { QRCodeCanvas } from 'qrcode.react';
import { useSearchParams } from 'react-router-dom';
import { apiRequest } from 'utils/apiRequest';

interface Props {
  token: string | null;
  removeToken: () => void;
}

export function AttendancePage(props: Props) {
  const [code, setCode] = useState<string>('hi');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const [searchParams, setSearchParams] = useSearchParams();

  const attendancecode = searchParams.get('attendancecode');

  useEffect(() => {
    const f = async () => {
      if (attendancecode) {
        const [success, res] = await apiRequest(
          '/attendance/',
          'PUT',
          props.token,
          props.removeToken,
          { attendancecode },
        );
      } else {
        setIsLoading(true);
        const [success, res] = await apiRequest(
          '/attendance/',
          'POST',
          props.token,
          props.removeToken,
        );
        if (!success) {
          setError(res.error);
          return;
        }
        setCode(res.code);
        setIsLoading(false);
      }
    };
    f();
  }, [attendancecode, props]);

  return (
    <>
      <Helmet>
        <title>Attendance</title>
        <meta name="description" content="Take attendance here" />
      </Helmet>
      {attendancecode ? (
        <>
          <h1>Attendance Code: {attendancecode}</h1>
        </>
      ) : (
        <Form>
          {isLoading ? (
            <StyledCircularProgress />
          ) : (
            <QRCodeCanvas
              id="qrCode"
              value={window.location + '/' + code}
              size={300}
              bgColor="#ffffff"
              level="H"
            />
          )}
        </Form>
      )}
      {error && <ErrorModal open={!!error} error={error} />}
    </>
  );
}

const Form = muiStyled(Paper)`
  min-height: 95%;
  width: 60%;
  min-width: 500px;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
`;

// const StyledStack = styled(Stack)`
//   width: 100%;
// `;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
