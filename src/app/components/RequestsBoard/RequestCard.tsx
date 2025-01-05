import { Stack, Button, Card, useTheme, Tooltip } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import { Error, Image, Request } from '../../../types/types';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState } from 'react';
import { styled as muiStyled } from '@mui/system';
import { Visibility } from '@mui/icons-material';
import { ImageModal } from './ImageModal';
import { Draggable } from 'react-beautiful-dnd';
import { ErrorModal } from '../ErrorModal';
import { apiRequest } from 'utils/apiRequest';

interface Props {
  request: Request;
  onEdit: (mine: boolean) => void;
  mine: boolean;
  index: number;
  onClickName: () => void;
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
    const [success, res] = await apiRequest('/requests/', 'PUT', {
      images: true,
      request_id: props.request.id,
    });
    if (!success) {
      setError(res.error);
      return;
    }
    setImages(res.images);
    setLoading(false);
  };

  const theme = useTheme();

  return (
    <Draggable draggableId={props.request.id} index={props.index}>
      {(provided: any) => (
        <StyledCard
          elevation={2}
          key={props.request.id}
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
              itemDescription={props.request.item_description}
              loading={loading}
            />
          )}
          <Stack spacing={1}>
            <StyledStack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <H3>{props.request.item_description}</H3>
              <H3 style={{ flexShrink: 0, paddingLeft: '8px' }}>
                ${props.request.amount}
              </H3>
            </StyledStack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {props.mine ? (
                <Button
                  size="small"
                  startIcon={React.cloneElement(<ImageIcon />)}
                  onClick={onClick}
                  style={{ color: theme.palette.text.primary }}
                >
                  Receipt(s)
                </Button>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Tooltip
                    title={`Filter requests by ${props.request.first_name}`}
                  >
                    <P onClick={props.onClickName}>
                      {props.request.first_name}{' '}
                      {props.request.last_name?.charAt(0)}
                    </P>
                  </Tooltip>
                  {!props.request.bank_set && (
                    <Tooltip title="Bank info not set">
                      <P style={{ color: 'red' }}>!</P>
                    </Tooltip>
                  )}
                </Stack>
              )}
              {props.request.comments.length > 0 && (
                <CommentStack
                  direction="row"
                  spacing={1}
                  onClick={() => props.onEdit(props.mine)}
                  alignItems="center"
                >
                  <ChatBubbleOutlineIcon fontSize="small" />
                  <CommentLengthP>
                    {props.request.comments.length}
                  </CommentLengthP>
                </CommentStack>
              )}
              <Button
                style={{ color: theme.palette.text.primary, zIndex: 999 }}
                size="small"
                startIcon={React.cloneElement(
                  props.mine ? <EditIcon /> : <Visibility />,
                )}
                onClick={() => props.onEdit(props.mine)}
                disabled={false}
              >
                {props.mine ? 'Edit' : 'View'}
              </Button>
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
  width: 100%;
`;

const H3 = styled.h3`
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const P = styled.p`
  margin: 0;
  overflow: hidden;
`;

const CommentStack = styled(Stack)`
  color: grey;
`;

const CommentLengthP = styled.p`
  margin: 0;
  overflow: hidden;
  font-size: 12px;
`;
