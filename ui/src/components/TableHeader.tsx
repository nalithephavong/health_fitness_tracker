import { 
    TableHead,
    TableSortLabel,
    TableRow,
    TableCell,
    Checkbox,
    Box
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';

import { HeaderCellType, RowType } from "@/templates/Interfaces";

type Order = 'asc' | 'desc';

interface TableHeaderProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RowType) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headerCells: HeaderCellType[];
}
  
export default function TableHeader(props: TableHeaderProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headerCells } =
      props;
    const createSortHandler =
      (property: keyof RowType) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow key="CustomHeaderRow1">
          <TableCell padding="checkbox" key="HeaderCustomCheckbox1">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all',
              }}
            />
          </TableCell>
          {headerCells.map((headerCell) => (
            <TableCell
              key={headerCell.id}
              align={headerCell.numeric ? 'right' : 'left'}
              padding={headerCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headerCell.id ? order : false}
              sx={{ width: headerCell.width }}
            >
              <TableSortLabel
                active={orderBy === headerCell.id}
                direction={orderBy === headerCell.id ? order : 'asc'}
                onClick={createSortHandler(headerCell.id)}
              >
                {headerCell.label}
                {orderBy === headerCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}