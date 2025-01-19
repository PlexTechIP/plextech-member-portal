/**
 *
 * ApproveMFA
 *
 */
import * as React from 'react';
import {
  Button,
  Divider,
  Dialog,
  Stack,
  TextField,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';
import { Error } from 'types/types';
import { apiRequest } from 'utils/apiRequest';
import { ErrorModal } from '../ErrorModal';
import { SuccessDialog } from '../SuccessDialog';

interface Props {
  open: boolean;
  onClose: (success: boolean) => void;
}

export function ApproveMFA(props: Props) {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async () => {
    const [success, res] = await apiRequest(`/approval/_/`, 'POST', { code });

    if (!success) {
      setError(res.error);
      return;
    }
    setSuccess(true);
  };

  return (
    <>
      {error && <ErrorModal error={error} open={!!error} />}
      <Dialog
        onClose={() => props.onClose(false)}
        open={props.open}
        PaperProps={{
          className: '!rounded-[48px] p-12',
        }}
      >
        {success ? (
          <SuccessDialog open={success} onClose={() => props.onClose(true)} />
        ) : (
          <>
            <Stack spacing={3}>
              <h1 className="m-0 overflow-hidden whitespace-nowrap text-ellipsis text-3xl">
                Reimbursement Request Approval
              </h1>
              <Divider />
              <h3 className="m-0 text-xl">
                An MFA code has been sent from BlueVine. Please enter the code
                below to approve the reimbursement request.
              </h3>
              <TextField
                label="MFA Code"
                variant="outlined"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </Stack>
            <DialogActions>
              <Button onClick={() => props.onClose(false)}>Cancel</Button>
              <Button onClick={onSubmit} variant="contained">
                Submit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
