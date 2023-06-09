import { Paper, Stack } from '@mui/material';
import React from 'react';
import styled from 'styled-components/macro';
import { styled as muiStyled } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import PErrorImage from './PError.png';
import PRegularImage from './PRegular.png';

interface Props {
  attendanceTime: string;
  startTime: string;
}

export function QRLandingPage(props: Props) {
  const { attendanceTime, startTime } = props;

  const parseTime = (time: string): Dayjs => {
    const [hours, minutes, seconds] = time.split(':');
    const isPM = time.includes('PM');

    return dayjs()
      .hour((parseInt(hours) % 12) + (isPM ? 12 : 0))
      .minute(parseInt(minutes))
      .second(parseInt(seconds));
  };

  const isLate = parseTime(attendanceTime).isAfter(parseTime(startTime));

  return (
    <Form>
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={1}>
            {isLate ? (
              <H2 style={{ color: 'red' }}>You are late!</H2>
            ) : (
              <H2 style={{ color: 'green' }}>You are on time!</H2>
            )}

            <H2>Code scanned at: {attendanceTime}</H2>
            <H2>Meeting start time: {startTime}</H2>
          </Stack>
          {isLate ? (
            <Img src={PErrorImage} alt="Plexie sad" />
          ) : (
            <Img src={PRegularImage} alt="Plexie happy" />
          )}
        </Stack>
      </Stack>
    </Form>
  );
}
const Img = styled.img`
  max-height: 200px;
`;

const H2 = styled.h2`
  margin: 0;
`;

const Form = muiStyled(Paper)`
  min-height: 95%;
  width: 50%;
  min-width: 700px;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
  margin-top: 32px;
`;
