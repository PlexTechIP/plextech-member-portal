/**
 *
 * ReimbursementForm
 *
 */
import * as React from 'react';
import styled from 'styled-components';
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
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Comment, Request } from '../../../types/types';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { FormData } from '../../../types/types';
import { Image } from '../../../types/types';
import { styled as muiStyled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import Compressor from 'compressorjs';
import { DeleteDialog } from '../DeleteDialog';
import { ImageModal } from '../RequestsBoard/ImageModal';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { CommentCard } from '../CommentCard';
import { CommentForm } from '../CommentForm';
import { apiRequest } from 'utils/apiRequest';
import { Error } from '../../../types/types';
import { getToken } from 'utils/useToken';

interface Props {
  teams: string[];
  setRequests: any;
  onClose: () => void;
  request: Request | null;
  onSubmit: (newRequest: Request, remove?: boolean) => void;
  onError: (error: Error) => void;
  canEdit: boolean;
  userName: { firstName: string; lastName: string };
}

export const initialState: FormData = {
  itemDescription: '',
  amount: '',
  teamBudget: 'No budget',
  isFood: false,
  images: [],
  status: 'pendingReview',
  comments: [],
};

export function ReimbursementForm(props: Props) {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [imagesLoading, setImagesLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!props.request) {
      handleReset();
      return;
    }
    const f = async () => {
      setImagesLoading(true);
      const [success, res] = await apiRequest('/requests/', 'PUT', {
        comment: true,
        request_id: props.request ? props.request._id : null,
      });

      if (!success) {
        props.onError(res.error);
        return;
      }

      setImagesLoading(false);
      setFormData({
        ...props.request!,
        amount: props.request!.amount.toString(),
        comments: res.comments.map((comment: any) => ({
          ...comment,
          date: dayjs(comment.date),
        })),
        images: [],
      });
      await loadImages();
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setFormData({ ...initialState, comments: [] });
  };

  const handleFileUpload = async (e: any) => {
    if (!e.target.files[0]) {
      return;
    }
    setImageLoading(true);
    let images = [...e.target.files];

    images.forEach((image: any, index: number) => {
      if (image.type === 'application/pdf') {
        setFormData(prevState => ({
          ...prevState,
          images: [
            ...prevState.images,
            {
              name: image.name,
              data: image,
              isBase64: false,
            },
          ],
        }));
        return;
      }

      new Compressor(image, {
        quality: 0.2,

        success(result: any) {
          setFormData(prevState => ({
            ...prevState,
            images: [
              ...prevState.images,
              {
                name: result.name,
                data: result,
                isBase64: false,
              },
            ],
          }));
          if (index === images.length - 1) {
            setImageLoading(false);
          }
        },
        error(err) {
          props.onError({
            errorMessage: 'Image compression failed',
          });
        },
      });
    });
    setImageLoading(false);
  };

  const onShowDeleteModal = () => {
    setDeleteModal(true);
  };

  const onDelete = async () => {
    setDeleteModal(false);
    apiRequest('/requests/', 'DELETE', {
      _id: props.request!._id,
    });
    props.onClose();
    props.onSubmit(props.request!, true);
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

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (
      isLoading ||
      formData.amount === '' ||
      formData.itemDescription === '' ||
      formData.images.length === 0 ||
      imageLoading
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
                data: (await getBase64(image.data)) as string,
                isBase64: true,
              }
            : image,
        ),
      ),
      amount: parseFloat(formData.amount),
    };

    const [success, res] = await apiRequest(
      '/requests/',
      props.request ? 'PUT' : 'POST',
      {
        ...bodyData,
        date: dayjs(),
        ...props.userName,
        request_id: props.request ? props.request._id : null,
      },
    );

    if (!success) {
      props.onError(res.error);
      return;
    }

    handleReset();
    setSubmitted(false);
    props.onClose();
    props.onSubmit({
      ...bodyData,
      _id: props.request ? props.request._id : (res._id as string),
      comments: [],
      date: dayjs(),
      user_id: props.request
        ? props.request.user_id
        : (jwt_decode(getToken()!) as { sub: string }).sub,
    });
    setIsLoading(false);
  };

  const onDeleteImage = (index: number) => {
    setFormData((prevState: FormData) => ({
      ...prevState,
      images: prevState.images.filter((image: any, i: number) => i !== index),
    }));
  };

  const onCommentSubmit = async (event: any) => {
    event.preventDefault();
    if (comment === '') {
      return;
    }
    const commentObj = {
      message: comment,
      date: dayjs(),
      user_id: (jwt_decode(getToken()!) as { sub: string }).sub,
      firstName: props.userName.firstName,
      lastName: props.userName.lastName,
    };
    formData.comments.push(commentObj);
    if (props.request) {
      apiRequest('/requests/', 'POST', {
        comment: commentObj,
        request_id: props.request!._id,
      });
    }
    setComment('');
  };

  const openImageModal = async () => {
    setImagesLoading(true);
    setShowImageModal(true);
    await loadImages();
    setImagesLoading(false);
  };

  const loadImages = async () => {
    const [success, res] = await apiRequest('/requests/', 'PUT', {
      images: true,
      request_id: props.request?._id,
    });
    if (!success) {
      props.onError(res.error);
      return;
    }
    setImages(res.images);
  };

  return (
    <Form elevation={3}>
      <DeleteDialog
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={onDelete}
        item="request"
      />
      <ImageModal
        loading={imagesLoading}
        open={showImageModal}
        onClose={() => setShowImageModal(false)}
        images={images}
        itemDescription={props.request?.itemDescription}
      />
      <StyledStack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: '16px' }}
      >
        <H1>Reimbursement Request Form</H1>
        {props.canEdit && props.request ? (
          <IconButton onClick={onShowDeleteModal}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        ) : (
          <P>*required</P>
        )}
      </StyledStack>
      <form>
        <Stack spacing={3} alignItems="flex-start">
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
            disabled={!props.canEdit}
          />

          {/* Amount Field */}
          <Stack direction="row" spacing={3} alignItems="center">
            <TextField
              variant="outlined"
              onChange={onAmountChange}
              type="number"
              value={formData.amount}
              label="Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              required
              error={submitted && formData.amount === ''}
              helperText={submitted && formData.amount === '' && 'Required'}
              disabled={!props.canEdit}
            />
            {imagesLoading && <StyledCircularProgress />}
          </Stack>
          <Divider />

          {/* Team Budget Select */}
          <FormControl>
            <FormLabel disabled={!props.canEdit}>Team Budget?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="No budget"
              onChange={onTeamBudgetChange}
            >
              <FormControlLabel
                value="No budget"
                control={<Radio disabled={!props.canEdit} />}
                label="No budget"
              />
              <FormControlLabel
                value="NMEP"
                control={<Radio disabled={!props.canEdit} />}
                label="NMEP"
              />
              {props.teams.map(team => (
                <FormControlLabel
                  key={team}
                  value={team}
                  control={<Radio disabled={!props.canEdit} />}
                  label={team}
                  disabled={!props.canEdit}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Is Food? */}
          {formData.teamBudget !== 'No budget' && (
            <Stack spacing={1} direction="row" alignItems="center">
              <FormLabel disabled={!props.canEdit}>Food?</FormLabel>
              <Checkbox
                disabled={!props.canEdit}
                checked={formData.isFood}
                onChange={onIsFoodChange}
              />
            </Stack>
          )}

          <StyledDivider variant="middle" light />

          {/* Receipt Upload */}
          <Stack spacing={1} alignItems="flex-start">
            <Stack direction="row" alignItems="center" spacing={3}>
              {props.canEdit ? (
                <Button
                  variant="contained"
                  component="label"
                  style={{
                    color:
                      submitted && formData.images.length === 0
                        ? 'red'
                        : 'rgb(255, 138, 0)',
                  }}
                  startIcon={React.cloneElement(<ImageIcon />)}
                >
                  {imageLoading ? (
                    <StyledCircularProgress size={20} />
                  ) : (
                    'Upload Receipt(s) *'
                  )}
                  <input
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    type="file"
                    multiple
                    hidden
                  />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={React.cloneElement(<ImageIcon />)}
                  onClick={openImageModal}
                >
                  Receipt(s)
                </Button>
              )}
              <p>
                {props.request
                  ? `Submitted ${props.request.date.format('MM/DD/YYYY')} by ${
                      props.request?.firstName
                    } ${props.request?.lastName}`
                  : dayjs().format('MM/DD/YYYY')}
              </p>
            </Stack>
            <Divider />
            {props.canEdit &&
              [...images, ...formData.images].map(
                (image: any, index: number) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    key={index}
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
                ),
              )}
          </Stack>

          <StyledDivider variant="middle" light />

          {formData.comments.length === 0 || (
            <>
              <H2>Comments</H2>
              {formData.comments
                .map((comment: Comment) => (
                  <CommentCard
                    key={comment.date.toString()}
                    id={(jwt_decode(getToken()!) as { sub: string }).sub}
                    comment={comment}
                  />
                ))
                .sort()}
              <StyledDivider variant="middle" light />
            </>
          )}
          <CommentForm
            comment={comment}
            onChange={setComment}
            onSubmit={onCommentSubmit}
            message="Add Comment (optional)"
          />

          <StyledStack direction="row" justifyContent="space-between">
            <Stack spacing={1} direction="row">
              {/* Submit Button */}
              <Button
                variant="contained"
                onClick={onSubmit}
                type="submit"
                disabled={!props.canEdit}
              >
                {isLoading ? <StyledCircularProgress size={20} /> : 'Submit'}
              </Button>

              {/* Reset Button */}
              <Button
                variant="contained"
                onClick={handleReset}
                disabled={!props.canEdit}
              >
                Reset
              </Button>
            </Stack>
            <Button
              variant="contained"
              onClick={() => {
                handleReset();
                props.onClose();
              }}
            >
              Cancel
            </Button>
          </StyledStack>
        </Stack>
      </form>
    </Form>
  );
}

const Form = muiStyled(Paper)`
  padding: 48px;
  border-radius: 48px;
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
  margin: 0;
  color: grey;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;

const H2 = styled.h3`
  margin: 0;
`;
