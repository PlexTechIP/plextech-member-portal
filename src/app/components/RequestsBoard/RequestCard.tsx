import { Button, Card, IconButton, Modal, Paper } from '@material-ui/core';
import { Stack } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { Request } from '../../../types/types';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from '../../../types/types';

interface Props {
  request: Request;
  onEdit: () => void;
}

export function RequestCard(props: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false);
  };

  const onClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <StyledModal open={showModal} onClose={onClose}>
        <>
          <StyledPaper>
            <StyledStack2
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <H1>Receipts for {props.request.itemDescription}</H1>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </StyledStack2>
            {props.request.images.map((image: Image) => (
              <StyledStack direction="row">
                <img
                  key={image.name.substring(0, 20)}
                  src={image.data as string}
                  alt="receipt"
                  style={{ maxWidth: '50%', maxHeight: '100%' }}
                />
              </StyledStack>
            ))}
          </StyledPaper>
        </>
      </StyledModal>
      <StyledCard
        elevation={2}
        key={props.request._id}
        style={{ borderRadius: '10%' }}
      >
        <Stack spacing={1}>
          <StyledStack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <H3>{props.request.itemDescription}</H3>
            <H3>${props.request.amount}</H3>
          </StyledStack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <StyledButton
              size="small"
              startIcon={React.cloneElement(<ImageIcon />)}
              onClick={onClick}
            >
              View Receipts
            </StyledButton>
            <Button
              size="small"
              startIcon={React.cloneElement(<EditIcon />)}
              onClick={props.onEdit}
              disabled={
                props.request.status === 'underReview' ||
                props.request.status === 'approved'
              }
            >
              Edit
            </Button>
          </Stack>
        </Stack>
      </StyledCard>
    </>
  );
}

const StyledCard = styled(Card)`
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const H3 = styled.h3`
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 75%;
`;

const StyledButton = styled(Button)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const StyledPaper = styled(Paper)`
  padding: 48px;
`;

const H1 = styled.h1`
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const StyledStack2 = styled(StyledStack)`
  margin-bottom: 24px;
`;
