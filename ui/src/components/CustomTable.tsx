import * as React from 'react';
import { useState, useMemo } from "react";
import { 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  // TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  ChipPropsColorOverrides,
  Typography
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import { ToolbarActions, HeaderCellType, RowType, StatusType } from '@/templates/Interfaces';

//#region HELPER FUNCTIONS
type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
) : (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const getTableCells = (row:RowType, headers: HeaderCellType[],statusOpts: StatusType[]) => {
  const items: Array<JSX.Element> = [];

  headers.forEach((header) => {
    header.id == "status"? (
      items.push(<TableCell align="right" key={header.id}>{getRowStatus(row[header.id] ?? "", statusOpts)}</TableCell>)
    ):(
      items.push(<TableCell align="right" key={header.id}>{row[header.id]}</TableCell>)
    )
  });

  return items;
};

const getRowStatus = (status:string, statusOpts: StatusType[]) => {
  let chipColor: OverridableStringUnion<"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ChipPropsColorOverrides> | undefined = "success";
  const statusOpt = statusOpts.find((opt) => opt.id === status);
  if (statusOpt) chipColor = statusOpt.color;

  return (
    <Chip 
      size="small" 
      label={status} 
      color={chipColor}
    />
  );
};
//#endregion

interface CustomTableProps {
  tableID: string;
  tableTitle: string;
  rows: RowType[];
  headerCells: HeaderCellType[];
  defaultOrderBy: string;
  toolbarActions: ToolbarActions[];
  selectedToolbarActions: ToolbarActions[];
  statusOpts: StatusType[];
  componentCallback: () => void;
  dense: boolean;
  date: string;
}

export default function CustomTable(props:CustomTableProps) {
  const {
    tableID, 
    tableTitle,
    rows, 
    headerCells, 
    defaultOrderBy, 
    toolbarActions, 
    selectedToolbarActions, 
    statusOpts,
    componentCallback,
    dense,
    date
  } = props;
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<RowType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [total, setTotal] = useState(0);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RowType,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property as string);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      console.log(newSelected);
      setSelected(newSelected);
      setSelectedDetail(rows);
      return;
    }
    setSelected([]);
    setSelectedDetail([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: RowType) => {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected: string[] = [];
    let newSelectedDetail: RowType[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.id);
      newSelectedDetail = newSelectedDetail.concat(selectedDetail, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedDetail = newSelectedDetail.concat(selectedDetail.splice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedDetail = newSelectedDetail.concat(selectedDetail.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newSelectedDetail = newSelectedDetail.concat(
        selectedDetail.slice(0, selectedIndex),
        selectedDetail.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setSelectedDetail(newSelectedDetail);
  };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const handleToolbarActions = () => {
    const newSelected: string[] = [];
    setSelected(newSelected);
    setSelectedDetail([]);
    componentCallback();
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => {
      let newTotal = 0;
      rows.forEach((row) => {
        newTotal += parseInt(row.calories ?? "0"); 
      });
      setTotal(newTotal);

      return rows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    },
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          tableID={tableID} 
          numSelected={selected.length} 
          title={tableTitle} 
          toolbarActions={toolbarActions} 
          selectedToolbarActions={selectedToolbarActions}
          selected={selected}
          callback={handleToolbarActions}
          statusOpts={statusOpts}
          selectedDetail={selectedDetail}
          date={date}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small":"medium"}
          >
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headerCells={headerCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell key="CustomCheck1" padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {
                      getTableCells(row, headerCells, statusOpts)
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  key="CustomEmptyRow"
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} key="CustomEmptyCell" />
                </TableRow>
              )}
              {visibleRows.length > 0 && (
                <TableRow>
                  <TableCell colSpan={3}/>
                  <TableCell colSpan={1}>
                    <Typography
                      sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                      variant="subtitle1"
                      id="totalLabel"
                      component="div"
                    >
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                      variant="subtitle1"
                      id="totalLabel"
                      component="div"
                    >
                      {total}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
}
