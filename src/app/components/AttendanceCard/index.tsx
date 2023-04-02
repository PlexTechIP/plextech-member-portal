/**
 *
 * AttendanceCard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { styled as muiStyled } from '@mui/system';
import {
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { User } from 'types/types';

interface Props {
  user: User;
}

const SLIP_DAYS = 3;

export function AttendanceCard(props: Props) {
  const { user } = props;

  return (
    <StyledCard>
      <Stack spacing={3}>
        <H1>Attendance</H1>
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack>
            <H2>Absences</H2>
            <H3>{user.absences.length}</H3>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack>
            <H2>Tardies</H2>
            <H3>{user.tardies.length}</H3>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack>
            <H2>Strikes</H2>
            <H3>{user.strikes.length}</H3>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack>
            <H2>Slip Days Left</H2>
            <H3>
              {user.absences.length + user.tardies.length < SLIP_DAYS
                ? SLIP_DAYS - user.absences.length - user.tardies.length
                : 0}
            </H3>
          </Stack>
        </Stack>
        {user.absences.length + user.tardies.length + user.strikes.length >
          0 && (
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Tardy/Absence/Strike?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.tardies
                .map((late: Dayjs) => (
                  <TableRow key={late.toString()}>
                    <TableCell component="th" scope="row">
                      {dayjs(late).format('MM/DD/YYYY')}
                    </TableCell>
                    <TableCell>Tardy</TableCell>
                  </TableRow>
                ))
                .concat(
                  user.absences.map((absence: Dayjs) => (
                    <TableRow key={absence.toString()}>
                      <TableCell component="th" scope="row">
                        {dayjs(absence).format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell>Absence</TableCell>
                    </TableRow>
                  )),
                )
                .concat(
                  user.strikes.map((s: Dayjs) => (
                    <TableRow key={s.toString()}>
                      <TableCell component="th" scope="row">
                        {dayjs(s).format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell>Strike</TableCell>
                    </TableRow>
                  )),
                )
                .sort()}
            </TableBody>
          </Table>
        )}
      </Stack>
    </StyledCard>
  );
}

const StyledCard = muiStyled(Card)`
  padding: 48px;
  text-align: left;
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  width: max-content;  
`;

const H1 = styled.h1`
  margin: 0;
`;

const H2 = styled.h2`
  margin: 0;
  padding-bottom: 8px;
`;

const H3 = styled.h3`
  margin: 0;
`;
