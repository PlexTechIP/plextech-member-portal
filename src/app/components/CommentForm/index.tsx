/**
 *
 * CommentForm
 *
 */
import { IconButton, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  comment: string;
  message: string;
  onChange: (comment: string) => void;
  onSubmit: (event: any) => void;
}

export function CommentForm(props: Props) {
  return (
    <form className="w-full">
      <TextField
        variant="outlined"
        onChange={(event: any) => props.onChange(event.target.value)}
        value={props.comment}
        label={props.message}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={props.onSubmit} type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
