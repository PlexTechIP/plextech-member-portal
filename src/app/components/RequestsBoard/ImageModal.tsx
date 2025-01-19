/**
 *
 * ImageModal
 *
 */
import {
  ImageList,
  ImageListItem,
  IconButton,
  Paper,
  Modal,
  Stack,
  CircularProgress,
} from '@mui/material';
import * as React from 'react';
import { Image } from 'types/types';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface Props {
  images: Image[] | undefined;
  onClose: () => void;
  open: boolean;
  itemDescription: string | undefined;
  loading: boolean;
}

export function ImageModal(props: Props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      className="w-1/2 h-full absolute inset-0 m-auto p-16"
    >
      <Paper className="p-12 !rounded-[48px] h-full">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="w-full mb-6"
        >
          <h1 className="m-0 overflow-hidden whitespace-nowrap text-ellipsis">
            Receipts for {props.itemDescription}
          </h1>
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {props.loading ? (
          <CircularProgress className="text-[rgb(255,138,0)]" />
        ) : (
          <>
            {props.images && (
              <ImageList cols={3} rowHeight={300} className="h-full">
                {props.images!.map((image: Image) => (
                  <ImageListItem key={image.name} cols={1}>
                    <a download={image.name} href={image.data as string}>
                      <img
                        src={image.data as string}
                        alt="receipt"
                        loading="lazy"
                        className="max-w-full max-h-full brightness-100 hover:brightness-75 transition-all duration-250"
                      />
                    </a>
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </>
        )}
        <div className="absolute bottom-[108px]">
          <Stack direction="row" alignItems="center" spacing={1}>
            <InfoOutlinedIcon className="text-gray-500 text-sm" />
            <p className="text-gray-500 m-0">
              Click on an image to download it.
            </p>
          </Stack>
        </div>
      </Paper>
    </Modal>
  );
}
