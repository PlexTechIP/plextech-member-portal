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

interface Props {
  teams: string[];
}

const initialState: FormData = {
  itemDescription: '',
  amount: 0,
  teamBudget: 'No budget',
  isFood: false,
  images: [],
};

export function ReimbursementForm(props: Props) {
  const [formData, setFormData] = useState<FormData>(initialState);

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

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleFileUpload = (e: any) => {
    if (!e.target.files[0]) {
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState['images'], e.target.files[0]],
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

  return (
    <Form elevation={3}>
      <Stack spacing={3} alignItems="flex-start">
        <h2 style={{ margin: 0 }}>Reimbursement Request Form</h2>
        {/* Item Description Field */}
        <TextField
          onChange={onItemDescriptionChange}
          value={formData.itemDescription}
          label={'Item Description'}
          style={{ width: '100%' }}
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
        <Stack spacing={1} direction="row" alignItems="center">
          <Button variant="outlined" component="label">
            Upload Receipt(s)
            <input
              accept="image/*"
              onChange={handleFileUpload}
              type="file"
              hidden
            />
          </Button>

          {formData.images.map(image => (
            <p key={image.name}>
              {image.name.length > 20
                ? `${image.name.substring(0, 20)}...`
                : image.name}
            </p>
          ))}
        </Stack>

        <Divider variant="middle" style={{ width: '100%' }} light />
        <Stack spacing={1} direction="row">
          {/* Submit Button */}
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>

          {/* Reset Button */}
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

const Form = styled(Paper)`
  padding: 48px;
`;
