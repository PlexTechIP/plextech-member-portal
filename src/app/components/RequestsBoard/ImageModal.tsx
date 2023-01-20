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
} from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { Image } from 'types/types';
import { styled as muiStyled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface Props {
  images: Image[] | undefined;
  onClose: () => void;
  open: boolean;
  itemDescription: string | undefined;
}

export function ImageModal(props: Props) {
  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <StyledPaper>
          <StyledStack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <H1>Receipts for {props.itemDescription}</H1>
            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </StyledStack>
          {props.images && (
            <ImageList cols={3} rowHeight={300} style={{ height: '100%' }}>
              {props.images!.map((image: Image) => (
                <ImageListItem key={image.name} cols={1}>
                  <a download={image.name} href={image.data as string}>
                    <Img
                      src={image.data as string}
                      alt="receipt"
                      loading="lazy"
                    />
                  </a>
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <Div>
            <Stack direction="row" alignItems="center" spacing={1}>
              <StyledInfoOutlinedIcon />
              <P>Click on an image to download it.</P>
            </Stack>
          </Div>
        </StyledPaper>
      </>
    </StyledModal>
  );
}

const P = styled.p`
  color: grey;
  margin: 0px;
`;

const StyledInfoOutlinedIcon = muiStyled(InfoOutlinedIcon)`
  color: grey;
  font-size: small;
`;

const StyledModal = styled(Modal)`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 64px;
`;

const StyledStack = muiStyled(Stack)`
  width: 100%;
  margin-bottom: 24px;
`;

const Div = styled.div`
  position: absolute;
  bottom: 108px;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  filter: brightness(100%);
  -webkit-filter: brightness(100%);
  &:hover {
    filter: brightness(75%);
    -webkit-filter: brightness(75%);
  }
  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  -ms-transition: all 0.25s ease;
  transition: all 0.25s ease;
`;

const StyledPaper = muiStyled(Paper)`
  padding: 48px;
  border-radius: 48px;
  height: 100%;
`;

const H1 = styled.h1`
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
