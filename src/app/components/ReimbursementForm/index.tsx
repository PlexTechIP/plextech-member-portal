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
import { Request } from '../../../types/types';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import FormData from '../../../types/types';
import { Image } from '../../../types/types';
import { styled as muiStyled } from '@mui/system';
import imageCompression from 'browser-image-compression';

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
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(false);

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

  const handleFileUpload = async (e: any) => {
    if (!e.target.files[0]) {
      return;
    }
    let image = e.target.files[0];

    setFormData(prevState => ({
      ...prevState,
      images: [
        ...prevState.images,
        { name: image.name, data: image, isBase64: false },
      ],
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
          <H1>Reimbursement Request Form</H1>
          <P>* = required</P>
        </StyledStack>

        {/* Item Description Field */}
        <StyledTextField
          variant="outlined"
          onChange={onItemDescriptionChange}
          value={formData.itemDescription}
          label={'Item Description'}
          required
          error={submitted && formData.itemDescription === ''}
          helperText={
            submitted && formData.itemDescription === '' && 'Required'
          }
        />

        {/* Amount Field */}
        <TextField
          variant="outlined"
          onChange={onAmountChange}
          type="number"
          value={formData.amount}
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          required
          error={submitted && formData.amount === ''}
          helperText={submitted && formData.amount === '' && 'Required'}
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
            variant="contained"
            component="label"
            style={{
              backgroundColor: 'white',
              color:
                submitted && formData.images.length === 0
                  ? 'red'
                  : 'rgb(255, 138, 0)',
              fontWeight:
                submitted && formData.images.length === 0 ? 'normal' : 'bold',
            }}
          >
            {imageIsLoading ? 'Loading' : 'Upload Receipt(s) *'}
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
            <StyledButton variant="contained" onClick={onSubmit}>
              {isLoading ? <StyledCircularProgress size={20} /> : 'Submit'}
            </StyledButton>

            {/* Reset Button */}
            <StyledButton variant="contained" onClick={handleReset}>
              Reset
            </StyledButton>
          </Stack>
          <StyledButton variant="contained" onClick={props.onClose}>
            Cancel
          </StyledButton>
        </StyledStack>
      </Stack>
    </Form>
  );
}

const Form = muiStyled(Paper)`
  padding: 48px;
  border-radius: 5%;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  width: 100%;
`;

const H1 = styled.h1`
  margin: 0;
`;

const P = styled.p`
  color: grey;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledButton = muiStyled(Button)`
  background-color: white;
  color: rgb(255, 138, 0);
  font-weight: bold;
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
