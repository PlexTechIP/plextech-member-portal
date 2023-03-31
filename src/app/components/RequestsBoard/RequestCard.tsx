import { Stack, Button, Card } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { Error, Image, Request } from '../../../types/types';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import { styled as muiStyled } from '@mui/system';
import { Visibility } from '@mui/icons-material';
import { ImageModal } from './ImageModal';
import { Draggable } from 'react-beautiful-dnd';
import { ErrorModal } from '../ErrorModal';

interface Props {
  request: Request;
  onEdit: (mine: boolean) => void;
  mine: boolean;
  token: string | null;
  index: number;
}

export function RequestCard(props: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false);
  };

  const onClick = async () => {
    setLoading(true);
    setShowModal(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/requests/`;
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        images: true,
        request_id: props.request._id,
      }),
    });
    const res = await response.json();

    if (!response.ok) {
      setError({
        errorCode: response.status,
        errorMessage: response.statusText,
      });
    }
    setImages(res.images);
    setLoading(false);
  };

  return (
    <Draggable draggableId={props.request._id} index={props.index}>
      {(provided: any) => (
        <StyledCard
          elevation={2}
          key={props.request._id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {error && <ErrorModal open={!!error} error={error} />}
          {showModal && (
            <ImageModal
              images={images}
              onClose={onClose}
              open={showModal}
              itemDescription={props.request.itemDescription}
              loading={loading}
            />
          )}
          <Stack spacing={1}>
            <StyledStack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <H3>{props.request.itemDescription}</H3>
              <H3 style={{ flexShrink: 0, paddingLeft: '8px' }}>
                ${props.request.amount.toFixed(2)}
              </H3>
            </StyledStack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {props.mine ? (
                <StyledButton
                  size="small"
                  startIcon={React.cloneElement(<ImageIcon />)}
                  onClick={onClick}
                >
                  View Receipt(s)
                </StyledButton>
              ) : (
                <P>{props.request.firstName}</P>
              )}
              <StyledButton
                size="small"
                startIcon={React.cloneElement(
                  props.mine ? <EditIcon /> : <Visibility />,
                )}
                onClick={() => props.onEdit(props.mine)}
                disabled={
                  props.request.status === 'underReview' ||
                  props.request.status === 'approved'
                }
              >
                {props.mine ? 'Edit' : 'View'}
              </StyledButton>
            </Stack>
          </Stack>
        </StyledCard>
      )}
    </Draggable>
  );
}

const StyledCard = muiStyled(Card)`
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 0;
  min-width: 100%;
`;

const H3 = styled.h3`
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const P = styled.p`
  margin: 0;
  overflow: hidden;
`;
