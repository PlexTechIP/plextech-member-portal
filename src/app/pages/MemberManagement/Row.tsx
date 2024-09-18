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

interface Props {
  user: User;
  onDelete: (id: string) => void;
}

export default function Row(props: Props) {
  const { user, onDelete } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>();

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
        <TableCell component="th" scope="row">
          {user.registered ? `${user.firstName} ${user.lastName}` : user.email}
        </TableCell>
        <TableCell component="th" scope="row">
          <Checkbox
            checked={checked === undefined ? user.treasurer : checked}
            onChange={async event => {
              const isChecked = event.target.checked;
              await apiRequest('/members/', 'PUT', {
                user_id: user._id,
                treasurer: isChecked,
              });
              setChecked(isChecked);
            }}
          />
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
