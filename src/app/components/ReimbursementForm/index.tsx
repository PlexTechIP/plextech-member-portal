/**
 *
 * ReimbursementForm
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { Stack } from '@mui/material';
import { useState } from 'react';
import FormData from './types';
import { Request } from '../RequestsBoard/types';
import { v4 as uuidv4 } from 'uuid';
import ImageIcon from '@mui/icons-material/Image';

interface Props {
  teams: string[];
  setRequests: any;
  onClose: () => void;
}

const initialState: FormData = {
  itemDescription: '',
  amount: '',
  teamBudget: 'No budget',
  isFood: false,
  images: [],
};

export function ReimbursementForm(props: Props) {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onItemDescriptionChange = ({ target }) =>
    setFormData(prevState => ({
      ...prevState,
      itemDescription: target.value,
    }));

  const onAmountChange = ({ target }) =>
    setFormData(prevState => ({
      ...prevState,
      amount: target.value,
    }));

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleFileUpload = (e: any) => {
    if (!e.target.files[0]) {
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState['images'], ...e.target.files],
    }));
  };

  const onTeamBudgetChange = ({ target }) => {
    setFormData(prevState => ({
      ...prevState,
      teamBudget: target.value,
    }));
  };

  const onIsFoodChange = () => {
    setFormData(prevState => ({
      ...prevState,
      isFood: !prevState.isFood,
    }));
  };

  const onSubmit = () => {
    if (
      formData.amount === '' ||
      formData.itemDescription === '' ||
      formData.images.length === 0
    ) {
      setSubmitted(true);
      return;
    }
    props.setRequests((prevState: Request[]) => [
      ...prevState,
      { ...formData, id: uuidv4(), amount: parseFloat(formData.amount) },
    ]);
    handleReset();
    setSubmitted(false);
    props.onClose();
  };

  return (
    <Form elevation={3}>
      <Stack spacing={3} alignItems="flex-start">
        <StyledStack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <H2>Reimbursement Request Form</H2>
          <P>* = required</P>
        </StyledStack>
        {/* Item Description Field */}
        <StyledTextField
          onChange={onItemDescriptionChange}
          value={formData.itemDescription}
          label={'Item Description'}
          required
          error={submitted && formData.itemDescription === ''}
        />

        {/* Amount Field */}
        <TextField
          onChange={onAmountChange}
          type="number"
          value={formData.amount}
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          required
          error={submitted && formData.amount === ''}
        />

        <Divider />

        {/* Team Budget Select */}
        <FormControl>
          <FormLabel>Team Budget?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="No budget"
            onChange={onTeamBudgetChange}
          >
            <FormControlLabel
              value="No budget"
              control={<Radio />}
              label="No budget"
            />
            {props.teams.map(team => (
              <FormControlLabel
                key={team}
                value={team}
                control={<Radio />}
                label={team}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Is Food? */}
        {formData.teamBudget !== 'No budget' && (
          <Stack spacing={1} direction="row" alignItems="center">
            <FormLabel>Food?</FormLabel>
            <Checkbox checked={formData.isFood} onChange={onIsFoodChange} />
          </Stack>
        )}

        {/* Receipt Upload */}
        <Stack spacing={1} alignItems="flex-start">
          <Button
            variant="outlined"
            component="label"
            style={
              submitted && formData.images.length === 0 ? { color: 'red' } : {}
            }
          >
            Upload Receipt(s) *
            <input
              accept="image/*"
              onChange={handleFileUpload}
              type="file"
              multiple
              hidden
            />
          </Button>
          <Divider />
          {formData.images.map(image => (
            <Stack direction="row" alignItems="center" spacing={1}>
              <ImageIcon />
              <p key={image.name}>
                {image.name.length > 20
                  ? `${image.name.substring(0, 20)}...`
                  : image.name}
              </p>
            </Stack>
          ))}
        </Stack>

        <StyledDivider variant="middle" light />
        <StyledStack direction="row" justifyContent="space-between">
          <Stack spacing={1} direction="row">
            {/* Submit Button */}
            <Button variant="contained" onClick={onSubmit}>
              Submit
            </Button>

            {/* Reset Button */}
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
          <Button variant="contained" onClick={props.onClose}>
            Cancel
          </Button>
        </StyledStack>
      </Stack>
    </Form>
  );
}

const Form = styled(Paper)`
  padding: 48px;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  width: 100%;
`;

const H2 = styled.h2`
  margin: 0;
`;

const P = styled.p`
  color: grey;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;
