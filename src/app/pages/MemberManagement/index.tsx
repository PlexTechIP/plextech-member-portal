/**
 *
 * MemberManagement
 *
 */
import { ErrorModal } from 'app/components/ErrorModal';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Paper,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled as muiStyled } from '@mui/system';
import { Error, User } from 'types/types';
import Row from './Row';
import AddIcon from '@mui/icons-material/Add';
import { apiRequest } from 'utils/apiRequest';

export function MemberManagement() {
  const [, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [users, setUsers] = useState<User[]>([]);
  const [addUsers, setAddUsers] = useState<string>('');
  const [incorrect, setIncorrect] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      setLoading(true);
      const [success, res] = await apiRequest('/members/', 'GET', undefined);
      setLoading(false);

      if (!success) {
        setError({
          errorCode: res.error.errorCode,
          errorMessage: res.error.errorMessage,
        });
        return;
      }

      setUsers(res.users);
    };

    f();
  }, []);

  const onDelete = async (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    const [success, res] = await apiRequest(`/members/`, 'DELETE', {
      user_id: id,
    });
    if (!success) {
      setError({
        errorCode: res.error.errorCode,
        errorMessage: res.error.errorMessage,
      });
    }
  };

  const onAddUsers = async () => {
    setLoading(true);
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    for (const email of addUsers.split(', ')) {
      if (!validRegex.test(email)) {
        setIncorrect(true);
        setLoading(false);
        return;
      }
    }

    const [success, res] = await apiRequest('/profile/', 'POST', {
      emails: addUsers.split(', '),
    });
    if (!success) {
      setError({
        errorCode: res.error.errorCode,
        errorMessage: res.error.errorMessage,
      });
    } else {
      setUsers([...users, ...res.users]);
      setAddUsers('');
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Members</title>
        <meta name="description" content="Member management" />
      </Helmet>
      {error && <ErrorModal open={!!error} error={error} />}
      <Form>
        <Stack spacing={4}>
          <TextField
            label="Add User(s)"
            helperText="Enter emails as a comma-separated list with spaces."
            value={addUsers}
            onChange={e => setAddUsers(e.target.value)}
            error={incorrect}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onAddUsers} edge="end">
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Admin?</TableCell>
                  <TableCell>Registered?</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: User) => (
                  <Row key={user.id} user={user} onDelete={onDelete} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Form>
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
