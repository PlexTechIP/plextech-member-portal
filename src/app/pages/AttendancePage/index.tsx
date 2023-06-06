/**
 *
 * AttendancePage
 *
 */
import { ErrorModal } from 'app/components/ErrorModal';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
// import dayjs, { Dayjs } from 'dayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
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
import { apiRequest } from 'utils/apiRequest';
import jwt_decode from 'jwt-decode';

interface Props {
  token: string | null;
  removeToken: () => void;
}

interface AttendeeData {
  name: string;
  time: Date;
}

export function AttendancePage(props: Props) {
  const [code, setCode] = useState<string>('hi');
  const [meetingId, setMeetingId] = useState<string>('');
  const [attendees, setAttendees] = useState<AttendeeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(10);

  const handleSessionButtonClick = async () => {
    setIsLoading(true);
    if (!isSessionActive) {
      // Start session
      setIsSessionActive(true);

      // Make a POST request to /attendance to start the session
      const [success, res] = await apiRequest(
        '/attendance/',
        'POST',
        props.token,
        props.removeToken,
        {
          name: 'GM 0',
          meetingLeader: (jwt_decode(props.token!) as { sub: string }).sub,
          startTime: new Date(),
        },
      );

      if (!success) {
        setError(res.error);
        setIsSessionActive(false);
        return;
      }

      setCode(res.code);
      setMeetingId(res.id);
      setAttendees(res.attendees);
    } else {
      // Stop session
      setIsSessionActive(false);

      // Make a DELETE request to /attendance to stop the session
      const [success, res] = await apiRequest(
        '/attendance/',
        'DELETE',
        props.token,
        props.removeToken,
        { id: meetingId },
      );

      if (!success) {
        setError(res.error);
        setIsSessionActive(true);
        return;
      }
    }
    setIsLoading(false);
  };

  const searchParams = new URLSearchParams(window.location.search);
  const attendancecode = searchParams.get('attendancecode');

  useEffect(() => {
    if (!attendancecode) return;
    const f = async () => {
      setIsLoading(true);
      const [success, res] = await apiRequest(
        '/attendance/',
        'PUT',
        props.token,
        props.removeToken,
        { attendancecode },
      );
      if (!success) {
        setError(res.error);
        return;
      }
      setIsLoading(false);
    };
    f();
  }, [attendancecode, props]);

  useEffect(() => {
    let qrCodeUpdateInterval: NodeJS.Timeout | null = null;
    let timerUpdateInterval: NodeJS.Timeout | null = null;

    if (!isSessionActive || !meetingId) return;

    const updateQRCode = async () => {
      setIsLoading(true);
      const [success, res] = await apiRequest(
        '/attendance/',
        'POST',
        props.token,
        props.removeToken,
        { id: meetingId },
      );

      if (!success) {
        setError(res.error);
        setIsSessionActive(false);
        clearInterval(qrCodeUpdateInterval!);
        return;
      }

      setCode(res.code);
      setAttendees(res.attendees);
      setRemainingTime(10);
      setIsLoading(false);
    };

    if (isSessionActive) {
      updateQRCode();
      qrCodeUpdateInterval = setInterval(updateQRCode, 10000); // update every 10 seconds
      timerUpdateInterval = setInterval(
        () =>
          setRemainingTime((prevTime: number) =>
            prevTime ? prevTime - 1 : prevTime,
          ),
        1000,
      ); // update every 1 seconds
    }

    return () => {
      clearInterval(qrCodeUpdateInterval!);
      clearInterval(timerUpdateInterval!);
    };
  }, [isSessionActive, meetingId, props]);

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
        <Stack spacing={2} alignItems="center">
          <Form>
            {isLoading ? (
              <StyledCircularProgress />
            ) : (
              <Stack spacing={3} alignItems="center">
                {!isSessionActive ? (
                  <Button
                    variant="contained"
                    onClick={handleSessionButtonClick}
                  >
                    Start Session
                  </Button>
                ) : (
                  <>
                    <P>
                      Code will change in {remainingTime} second
                      {remainingTime !== 1 ? 's' : ''}
                    </P>
                    <QRCodeCanvas
                      id="qrCode"
                      value={window.location + '/?attendance=' + code}
                      size={300}
                      bgColor="#ffffff"
                      level="H"
                    />
                    <Button
                      variant="contained"
                      onClick={handleSessionButtonClick}
                    >
                      Stop Session
                    </Button>
                  </>
                )}

                <P>Scan the QR code and log in to mark yourself present.</P>
              </Stack>
            )}
          </Form>
          <div />
          <Form>
            <Stack spacing={3} alignItems="center">
              <h1>Attendees</h1>
              <Stack spacing={1} alignItems="center">
                {Object.keys(attendees).map(id => (
                  <P key={attendees[id].name}>
                    {attendees[id].name} -{' '}
                    {attendees[id].time.format('h:mm:ss a')}
                  </P>
                ))}
              </Stack>
            </Stack>
          </Form>
        </Stack>
      )}
      {error && <ErrorModal open={!!error} error={error} />}
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

// const StyledStack = styled(Stack)`
//   width: 100%;
// `;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;

const P = styled.p`
  margin: 0;
`;
