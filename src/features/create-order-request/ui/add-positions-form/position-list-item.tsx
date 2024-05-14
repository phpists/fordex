import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import { useWatch } from 'react-hook-form';

import { useAddPositionsFormContext } from '../../model/use-add-positions-form';

interface PositionListItemProps {
  index: number;
  isExpanded: boolean;
  isLastItem: boolean;
  onExpandClick: () => void;
  onRemoveClick: (index: number) => void;
}

const DEFAULT_MARKING_TEXT = 'Füllen Sie die Markierung';
const DEFAULT_DESCRIPTION_TEXT = 'Keine Beschreibung';

export function PositionListItem({
  index,
  isExpanded,
  isLastItem,
  onExpandClick,
  onRemoveClick,
}: PositionListItemProps) {
  const {
    form: { control, getFieldState },
  } = useAddPositionsFormContext();
  const [marking, description] = useWatch({
    control,
    name: [`positions.${index}.marking`, `positions.${index}.description`],
  });
  const { invalid } = getFieldState(`positions.${index}`);

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onRemoveClick(index)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton selected={isExpanded} onClick={onExpandClick}>
          <ListItemIcon
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                minWidth: 32,
              },
            })}
          >
            <Typography
              variant="h6"
              sx={{
                color: invalid ? 'error.main' : 'initial',
              }}
            >
              {index + 1}
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary={marking || DEFAULT_MARKING_TEXT}
            secondary={description || DEFAULT_DESCRIPTION_TEXT}
            primaryTypographyProps={{
              sx: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
            secondaryTypographyProps={{
              sx: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          />
          {invalid && <ErrorIcon sx={{ color: 'error.main' }} />}
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      {!isLastItem && !isExpanded && <Divider variant="inset" component="li" />}
    </>
  );
}
