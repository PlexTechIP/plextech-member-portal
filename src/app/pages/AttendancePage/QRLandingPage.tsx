import { Paper, Stack } from '@mui/material';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { PError } from 'images';
import { PCold } from 'images';
import { PRegular } from 'images';
import { Error } from 'types/types';

interface Props {
  attendanceTime: string;
  startTime: string;
  error?: Error;
}

export function QRLandingPage(props: Props) {
  if (props.error?.errorCode === 402) {
    return (
      <Paper className="min-h-[95%] w-1/2 min-w-[700px] mx-auto p-16 !rounded-[48px] mt-8">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2 className="m-0">
            Sorry! This code is invalid, please try scanning it again.
          </h2>
          <img src={PCold} alt="Plexie cold" className="max-h-[200px]" />
        </Stack>
      </Paper>
    );
  }

  const parseTime = (time: string): Dayjs => {
    const [hours, minutes, seconds] = time.split(':');
    const isPM = time.includes('PM');

    return dayjs()
      .hour((parseInt(hours) % 12) + (isPM ? 12 : 0))
      .minute(parseInt(minutes))
      .second(parseInt(seconds));
  };

  const isLate = parseTime(props.attendanceTime).isAfter(
    parseTime(props.startTime),
  );

  return (
    <Paper className="min-h-[95%] w-1/2 min-w-[700px] mx-auto p-16 !rounded-[48px] mt-8">
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={1}>
            {isLate ? (
              <h2 className="m-0 text-red-500">You are late!</h2>
            ) : (
              <h2 className="m-0 text-green-500">You are on time!</h2>
            )}

            <h2 className="m-0">Code scanned at: {props.attendanceTime}</h2>
            <h2 className="m-0">Meeting start time: {props.startTime}</h2>
          </Stack>
          {isLate ? (
            <img src={PError} alt="Plexie sad" className="max-h-[200px]" />
          ) : (
            <img src={PRegular} alt="Plexie happy" className="max-h-[200px]" />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
