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
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Request } from '../RequestsBoard/types';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import FormData from './types';
import { Image } from '../RequestsBoard/types';

interface Props {
  teams: string[];
  setRequests: any;
  onClose: () => void;
  request: Request | null;
  onSubmit: (newRequest: Request) => void;
  onError: () => void;
}

const initialState: FormData = {
  itemDescription: '',
  amount: '',
  teamBudget: 'No budget',
  isFood: false,
  images: [],
  status: 'pendingReview',
};

export function ReimbursementForm(props: Props) {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (props.request) {
      setFormData({
        ...props.request,
        amount: props.request.amount.toString(),
      });
    }
  }, [props.request]);

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

  const getBase64 = (file: any) => {
    return new Promise(resolve => {
      let baseURL = '';
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result! as string;
        resolve(baseURL);
      };
    });
  };

  const onSubmit = async () => {
    if (
      isLoading ||
      formData.amount === '' ||
      formData.itemDescription === '' ||
      formData.images.length === 0
    ) {
      setSubmitted(true);
      return;
    }
    setIsLoading(true);

    const bodyData = {
      ...formData,
      images: await Promise.all(
        formData.images.map(async (image: Image) =>
          !image.isBase64
            ? {
                name: image.name,
                data: (await getBase64(image)) as string,
                isBase64: true,
              }
            : image,
        ),
      ),
      amount: parseFloat(formData.amount),
    };

    const url = `http://localhost:${process.env.PORT || 3000}/requests/${
      props.request ? props.request._id : ''
    }`;
    const response = await fetch(url, {
      method: props.request ? 'PUT' : 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      props.onError();
    }

    const res = await response.json();

    handleReset();
    setSubmitted(false);
    props.onClose();
    props.onSubmit({
      ...bodyData,
      _id: props.request ? props.request._id : (res._id as string),
    });
    setIsLoading(false);
  };

  const onDeleteImage = (index: number) => {
    setFormData((prevState: FormData) => ({
      ...prevState,
      images: prevState.images.filter((image: any, i: number) => i !== index),
    }));
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
          {formData.images.map((image: any, index: number) => (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              key={props.request ? image.name : image}
            >
              <ImageIcon />
              <p>
                {image.name.length > 20
                  ? `${image.name.substring(0, 20)}...`
                  : image.name}
              </p>
              <IconButton onClick={() => onDeleteImage(index)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        <StyledDivider variant="middle" light />
        <StyledStack direction="row" justifyContent="space-between">
          <Stack spacing={1} direction="row">
            {/* Submit Button */}
            <Button variant="contained" onClick={onSubmit}>
              {isLoading ? <CircularProgress size={20} /> : 'Submit'}
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
