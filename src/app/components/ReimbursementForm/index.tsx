/**
 *
 * ReimbursementForm
 *
 */
import * as React from 'react';
import {
  Button,
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
import { categories } from '../../pages/CategoriesPage/index';
import { toast, Toaster } from 'react-hot-toast';

interface Props {
  setRequests: any;
  onClose: () => void;
  request: Request | null;
  onSubmit: (newRequest: Request, remove?: boolean) => void;
  onError: (error: Error) => void;
  canEdit: boolean;
  userName: { first_name: string; last_name: string };
  receiptRequired: boolean;
}

export const initialState: FormData = {
  item_description: '',
  amount: '',
  team_budget: '',
  is_food: false,
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
        request_id: props.request ? props.request.id : null,
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
      item_description: target.value,
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
      id: props.request!.id,
    });
    props.onClose();
    props.onSubmit(props.request!, true);
  };

  const onTeamBudgetChange = ({ target }) => {
    setFormData(prevState => ({
      ...prevState,
      team_budget: target.value,
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
      formData.item_description === '' ||
      (props.receiptRequired && formData.images.length === 0) ||
      imageLoading ||
      formData.team_budget === ''
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
        request_id: props.request ? props.request.id : null,
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
      id: props.request ? props.request.id : (res.id as string),
      comments: [],
      date: dayjs(),
      user_id: props.request
        ? props.request.user_id
        : (jwt_decode(getToken()!) as { sub: string }).sub,
    });
    toast.success('Submitted!');
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
      first_name: props.userName.first_name,
      last_name: props.userName.last_name,
    };
    formData.comments.push(commentObj);
    if (props.request) {
      apiRequest('/requests/', 'POST', {
        comment: commentObj,
        request_id: props.request!.id,
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
      request_id: props.request?.id,
    });
    if (!success) {
      props.onError(res.error);
      return;
    }
    setImages(res.images);
  };

  return (
    <Paper className="p-12 !rounded-[48px]" elevation={3}>
      <Toaster />
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
        itemDescription={props.request?.item_description}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="w-full mb-4"
      >
        <h1 className="m-0 text-2xl">Reimbursement Request Form</h1>
        {props.canEdit && props.request ? (
          <IconButton onClick={onShowDeleteModal}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        ) : (
          <p className="m-0 text-gray-500">*required</p>
        )}
      </Stack>
      <form>
        <Stack spacing={3} alignItems="flex-start">
          {/* Item Description Field */}
          <TextField
            className="w-full"
            variant="outlined"
            onChange={onItemDescriptionChange}
            value={formData.item_description}
            label={'Item Description'}
            required
            error={submitted && formData.item_description === ''}
            helperText={
              submitted && formData.item_description === '' && 'Required'
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
            {imagesLoading && (
              <CircularProgress className="text-[rgb(255,138,0)]" />
            )}
          </Stack>
          <Divider />

          {/* Team Budget Select */}
          <FormControl>
            <FormLabel disabled={!props.canEdit}>Team Budget?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={onTeamBudgetChange}
            >
              {categories.map(c => (
                <FormControlLabel
                  key={c}
                  value={c}
                  control={<Radio disabled={!props.canEdit} />}
                  label={c}
                  disabled={!props.canEdit}
                  required
                />
              ))}
              <FormControlLabel
                value="Miscellaneous"
                control={<Radio disabled={!props.canEdit} />}
                label="Miscellaneous"
                disabled={!props.canEdit}
                required
              />
            </RadioGroup>
          </FormControl>
          <Divider className="w-full" variant="middle" light />

          {/* Receipt Upload */}
          <Stack spacing={1} alignItems="flex-start">
            <Stack direction="row" alignItems="center" spacing={3}>
              {props.canEdit ? (
                <Button
                  variant="contained"
                  component="label"
                  style={{
                    color:
                      submitted &&
                      formData.images.length === 0 &&
                      props.receiptRequired
                        ? 'red'
                        : 'rgb(255, 138, 0)',
                  }}
                  startIcon={React.cloneElement(<ImageIcon />)}
                >
                  {imageLoading ? (
                    <CircularProgress
                      className="text-[rgb(255,138,0)]"
                      size={20}
                    />
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
                      props.request?.first_name
                    } ${props.request?.last_name}`
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

          <Divider className="w-full" variant="middle" light />

          {formData.comments.length === 0 || (
            <>
              <h3 className="m-0">Comments</h3>
              {formData.comments
                .map((comment: Comment) => (
                  <CommentCard
                    key={comment.date.toString()}
                    id={(jwt_decode(getToken()!) as { sub: string }).sub}
                    comment={comment}
                  />
                ))
                .sort()}
              <Divider className="w-full" variant="middle" light />
            </>
          )}
          <CommentForm
            comment={comment}
            onChange={setComment}
            onSubmit={onCommentSubmit}
            message="Add Comment (optional)"
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            className="w-full"
          >
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                onClick={() => {
                  handleReset();
                  props.onClose();
                }}
              >
                Cancel
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
            {/* Submit Button */}
            <Button
              variant="contained"
              style={{
                backgroundColor: 'rgb(255, 138, 0)',
                color: 'white',
              }}
              onClick={onSubmit}
              type="submit"
              disabled={!props.canEdit}
            >
              {isLoading ? (
                <CircularProgress className="text-[rgb(255,138,0)]" size={20} />
              ) : (
                'Submit'
              )}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
