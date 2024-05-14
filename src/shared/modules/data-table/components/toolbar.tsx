import {
  Box,
  IconButton,
  Toolbar as MUIToolbar,
  TextField,
  Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export function DataTableToolbar() {
  return (
    <MUIToolbar
      sx={{
        flexShrink: 1,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Box
        flexGrow={1}
        sx={{
          paddingTop: { xs: 1, md: 0 },
        }}
      >
        <TextField size="small" label="Suchen" type="search" />
      </Box>
      <Box>
        <Box display="flex" gap={1} alignItems="center">
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </MUIToolbar>
  );
}
