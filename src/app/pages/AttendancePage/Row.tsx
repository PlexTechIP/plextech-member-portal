import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { User } from 'types/types';
import { Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { DeleteDialog } from 'app/components/DeleteDialog';
import { Delete } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import { Error } from 'types/types';

const SLIP_DAYS = 3;

interface Props {
  user: User;
  date: Dayjs;
  setLoading: (newValue: boolean) => void;
  removeToken: () => void;
  setError: (newValue: Error) => void;
  token: string | null;
  onDelete: (id: string) => void;
}

export default function Row(props: Props) {
  const { user, date, setLoading, setError } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const onDelete = async (_id: string) => {
    setShowDelete(false);
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/attendance/`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ _id }),
      });
      setLoading(false);
      props.onDelete(_id);

      if (response.status === 401 || response.status === 422) {
        props.removeToken();
        return;
      } else if (!response.ok) {
        setError({
          errorCode: response.status,
          errorMessage: response.statusText,
        });
        console.error(response);
      }
    } catch (e: any) {
      setError({
        errorMessage: e,
      });
      console.error(e);
    }
  };

  const onDeleteDates = async (type: any, dat: Dayjs) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/attendance/`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ _id: user._id, date: dat, type }),
      });
      setLoading(false);
      if (type === 'tardy') {
        delete user.tardies[
          user.tardies.findIndex((d: Dayjs) => d.isSame(dat, 'day'))
        ];
        user.tardies = user.tardies.filter((user: any) => user !== undefined);
      } else if (type === 'absent') {
        delete user.absences[
          user.absences.findIndex((d: Dayjs) => d.isSame(dat, 'day'))
        ];
        user.absences = user.absences.filter((user: any) => user !== undefined);
      } else {
        delete user.strikes[
          user.strikes.findIndex((d: Dayjs) => d.isSame(dat, 'day'))
        ];
        user.strikes = user.strikes.filter((user: any) => user !== undefined);
      }

      if (response.status === 401 || response.status === 422) {
        props.removeToken();
        return;
      } else if (!response.ok) {
        setError({
          errorCode: response.status,
          errorMessage: response.statusText,
        });
        console.error(response);
      }
    } catch (e: any) {
      setError({
        errorMessage: e,
      });
      console.error(e);
    }
  };

  const onAdd = async (type: any) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/attendance/`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ _id: user._id, date, type }),
      });
      setLoading(false);

      if (type === 'tardy') {
        user.tardies.push(date);
      } else if (type === 'absent') {
        user.absences.push(date);
      } else {
        user.strikes.push(date);
      }

      if (response.status === 401 || response.status === 422) {
        props.removeToken();
        return;
      } else if (!response.ok) {
        setError({
          errorCode: response.status,
          errorMessage: response.statusText,
        });
        console.error(response);
      }
    } catch (e: any) {
      setError({
        errorMessage: e,
      });
      console.error(e);
    }
  };

  return (
    <>
      {showDelete && (
        <DeleteDialog
          open={showDelete}
          item="user"
          onClose={() => setShowDelete(false)}
          onDelete={() => onDelete(user._id)}
        />
      )}
      <TableRow
        key={user._id}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
        }}
      >
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            style={{ width: '10px', backgroundColor: 'transparent' }}
            disabled={!open && user.absences.length + user.tardies.length === 0}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.registered ? `${user.firstName} ${user.lastName}` : user.email}
        </TableCell>
        <TableCell align="right">
          <Button
            size="small"
            onClick={() => {
              onAdd('tardy');
            }}
          >
            {user.tardies.length}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            size="small"
            onClick={() => {
              onAdd('absent');
            }}
          >
            {user.absences.length}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            size="small"
            onClick={() => {
              onAdd('strike');
            }}
          >
            {user.strikes.length}
          </Button>
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={() => setShowDelete(true)}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={
              user.tardies.length + user.absences.length + user.strikes.length >
                0 && open
            }
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ margin: 1 }}>
              {
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  style={{ width: '100%' }}
                >
                  <Typography variant="subtitle1" gutterBottom component="div">
                    History
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Slip meetings left:{' '}
                    {Math.max(
                      0,
                      SLIP_DAYS -
                        user.tardies.length -
                        user.absences.length -
                        user.strikes.length,
                    )}
                  </Typography>
                </Stack>
              }
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Tardy/Absence/Strike?</TableCell>
                    <TableCell>Delete</TableCell>
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
                        <TableCell>
                          <IconButton
                            onClick={() => onDeleteDates('tardy', late)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                    .concat(
                      user.absences.map((absence: Dayjs) => (
                        <TableRow key={absence.toString()}>
                          <TableCell component="th" scope="row">
                            {dayjs(absence).format('MM/DD/YYYY')}
                          </TableCell>
                          <TableCell>Absence</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => onDeleteDates('absent', absence)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
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
                          <TableCell>
                            <IconButton
                              onClick={() => onDeleteDates('strike', s)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )),
                    )
                    .sort()}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
