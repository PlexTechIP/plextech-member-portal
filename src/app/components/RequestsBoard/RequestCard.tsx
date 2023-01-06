import { Stack, Button, Card } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { Request } from '../../../types/types';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import { styled as muiStyled } from '@mui/system';
import { ImageModal } from '../ImageModal';

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
      <ImageModal
        request={props.request}
        onClose={onClose}
        showModal={showModal}
      />
      <StyledCard elevation={2} key={props.request._id}>
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
            <StyledButton
              size="small"
              startIcon={React.cloneElement(<EditIcon />)}
              onClick={props.onEdit}
              disabled={
                props.request.status === 'underReview' ||
                props.request.status === 'approved'
              }
            >
              Edit
            </StyledButton>
          </Stack>
        </Stack>
      </StyledCard>
    </>
  );
}

const StyledCard = muiStyled(Card)`
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  border-radius: 10%;
`;

const H3 = styled.h3`
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 75%;
`;

const StyledButton = muiStyled(Button)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: white;
  color: black;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;
