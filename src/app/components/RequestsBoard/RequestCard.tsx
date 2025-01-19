import { Stack, Button, Card, useTheme, Tooltip } from '@mui/material';
import * as React from 'react';
import { Error, Image, Request } from '../../../types/types';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState } from 'react';
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
        <Card
          elevation={2}
          key={props.request.id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 text-left flex flex-col !rounded-2xl w-full"
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="w-full"
            >
              <h3 className="m-0 overflow-hidden whitespace-nowrap text-ellipsis">
                {props.request.item_description}
              </h3>
              <h3 className="m-0 flex-shrink-0 pl-2">
                ${props.request.amount}
              </h3>
            </Stack>
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
                    <p
                      className="m-0 overflow-hidden cursor-pointer"
                      onClick={props.onClickName}
                    >
                      {props.request.first_name}{' '}
                      {props.request.last_name?.charAt(0)}
                    </p>
                  </Tooltip>
                  {!props.request.bank_set && (
                    <Tooltip title="Bank info not set">
                      <p className="m-0 overflow-hidden text-red-500">!</p>
                    </Tooltip>
                  )}
                </Stack>
              )}
              {props.request.comments.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  onClick={() => props.onEdit(props.mine)}
                  alignItems="center"
                  className="text-gray-500"
                >
                  <ChatBubbleOutlineIcon fontSize="small" />
                  <p className="m-0 overflow-hidden text-xs">
                    {props.request.comments.length}
                  </p>
                </Stack>
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
        </Card>
      )}
    </Draggable>
  );
}
