/**
 *
 * AttendanceCard
 *
 */
import * as React from 'react';
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
import dayjs from 'dayjs';
import { User } from 'types/types';

interface Props {
  user: User;
}

const SLIP_DAYS = 3;

export function AttendanceCard(props: Props) {
  const { user } = props;

  return (
    <Card className="p-12 text-left flex flex-col !rounded-[32px] w-max">
      <Stack spacing={3}>
        <h1 className="m-0">Attendance</h1>
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack>
            <h2 className="m-0 pb-2">Absences</h2>
            <h3 className="m-0">{user.absences.length}</h3>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack>
            <h2 className="m-0 pb-2">Tardies</h2>
            <h3 className="m-0">{user.tardies.length}</h3>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack>
            <h2 className="m-0 pb-2">Strikes</h2>
            <h3 className="m-0">{user.strikes.length}</h3>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack>
            <h2 className="m-0 pb-2">Slip Days Left</h2>
            <h3 className="m-0">
              {user.absences.length + user.tardies.length < SLIP_DAYS
                ? SLIP_DAYS - user.absences.length - user.tardies.length
                : 0}
            </h3>
          </Stack>
        </Stack>
        {user.absences.length + user.tardies.length + user.strikes.length >
          0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.absences.map((absence: dayjs.Dayjs) => (
                <TableRow key={absence.toString()}>
                  <TableCell>Absence</TableCell>
                  <TableCell>{absence.format('MM/DD/YYYY')}</TableCell>
                </TableRow>
              ))}
              {user.tardies.map((tardy: dayjs.Dayjs) => (
                <TableRow key={tardy.toString()}>
                  <TableCell>Tardy</TableCell>
                  <TableCell>{tardy.format('MM/DD/YYYY')}</TableCell>
                </TableRow>
              ))}
              {user.strikes.map((strike: dayjs.Dayjs) => (
                <TableRow key={strike.toString()}>
                  <TableCell>Strike</TableCell>
                  <TableCell>{strike.format('MM/DD/YYYY')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Stack>
    </Card>
  );
}
