import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { User } from 'types/types';
import { useState } from 'react';
import { DeleteDialog } from 'app/components/DeleteDialog';
import { Delete } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { apiRequest } from 'utils/apiRequest';
import { Check } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

const positions = [
  'Developer',
  'Senior Advisor',
  'Project Manager',
  'Curriculum Instructor',
  'Alumni',
  'President',
  'VP of Public Relations',
  'VP of Curriculum',
  'VP of Projects',
  'VP of External',
  'VP of Internal',
  'Treasurer',
];

interface Props {
  user: User;
  onDelete: (id: string) => void;
}

export default function Row(props: Props) {
  const { user, onDelete } = props;

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>();
  const [currentPosition, setCurrentPosition] = useState<string>(
    user.current_position || '',
  );

  return (
    <>
      {showDelete && (
        <DeleteDialog
          open={showDelete}
          item="user"
          onClose={() => setShowDelete(false)}
          onDelete={() => onDelete(user.id)}
        />
      )}
      <TableRow
        key={user.id}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
        }}
      >
        <TableCell>
          {user.registered
            ? `${user.first_name} ${user.last_name}`
            : user.email}
        </TableCell>
        <TableCell align="center">
          <Checkbox
            checked={checked === undefined ? user.treasurer : checked}
            onChange={async event => {
              const isChecked = event.target.checked;
              await apiRequest('/members/', 'PUT', {
                user_id: user.id,
                treasurer: isChecked,
              });
              setChecked(isChecked);
            }}
          />
        </TableCell>
        <TableCell align="center">
          {user.registered ? <Check /> : <Close />}
        </TableCell>
        <TableCell align="center">
          <Select
            value={currentPosition}
            onChange={async event => {
              const position = event.target.value;
              await apiRequest('/members/', 'PUT', {
                user_id: user.id,
                current_position: position,
              });
              setCurrentPosition(position);
            }}
            size="small"
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            {positions.map(position => (
              <MenuItem value={position} key={position}>
                {position}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={() => setShowDelete(true)}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
