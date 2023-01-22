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
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { DeleteDialog } from 'app/components/DeleteDialog';
import { Delete } from '@mui/icons-material';

interface Props {
  user: User;
  date: Dayjs;
  setLoading: (newValue: boolean) => void;
  removeToken: () => void;
  setError: (newValue: boolean) => void;
  token: string | null;
  onDelete: (id: string) => void;
}

export default function Row(props: Props) {
  const { user, date, setLoading, setError } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const [tardy, setTardy] = useState<boolean>(false);
  const [absence, setAbsence] = useState<boolean>(false);
  const [strike, setStrike] = useState<boolean>(false);

  useEffect(() => {
    setTardy(user.tardies.includes(date));
    setAbsence(user.absences.includes(date));
    setStrike(user.strikes.includes(date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

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
        setError(true);
        console.error(response);
      }
    } catch (e: any) {
      setError(true);
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
            disabled={user.absences.length + user.tardies.length === 0 && !open}
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
              if (tardy) {
                user.tardies = user.tardies.filter(
                  (late: Dayjs) => late !== date,
                );
              } else {
                user.tardies.push(date);
                if (absence) {
                  user.absences = user.absences.filter(
                    (absence: Dayjs) => absence !== date,
                  );
                  setAbsence(false);
                }
              }
              setTardy(!tardy);
            }}
            color={tardy ? 'error' : 'primary'}
          >
            {user.tardies.length}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            size="small"
            onClick={() => {
              if (absence) {
                user.absences = user.absences.filter(
                  (absence: Dayjs) => absence !== date,
                );
              } else {
                user.absences.push(date);
                if (tardy) {
                  user.tardies = user.tardies.filter(
                    (late: Dayjs) => late !== date,
                  );
                  setTardy(false);
                }
              }
              setAbsence(!absence);
            }}
            color={absence ? 'error' : 'primary'}
          >
            {user.absences.length}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            size="small"
            onClick={() => {
              if (strike) {
                user.strikes = user.strikes.filter(
                  (strike: Dayjs) => strike !== date,
                );
              } else {
                user.strikes.push(date);
              }
              setStrike(!strike);
            }}
            color={strike ? 'error' : 'primary'}
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle1" gutterBottom component="div">
                History
              </Typography>
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
                          {late.format('MM/DD/YYYY')}
                        </TableCell>
                        <TableCell>Tardy</TableCell>
                      </TableRow>
                    ))
                    .concat(
                      user.absences.map((absence: Dayjs) => (
                        <TableRow key={absence.toString()}>
                          <TableCell component="th" scope="row">
                            {absence.format('MM/DD/YYYY')}
                          </TableCell>
                          <TableCell>Absence</TableCell>
                        </TableRow>
                      )),
                    )
                    .concat(
                      user.strikes.map((strike: Dayjs) => (
                        <TableRow key={strike.toString()}>
                          <TableCell component="th" scope="row">
                            {strike.format('MM/DD/YYYY')}
                          </TableCell>
                          <TableCell>Strike</TableCell>
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
