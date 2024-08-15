import {
  MRT_TableBodyCellValue,
  MRT_ToolbarAlertBanner,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
  MRT_RowData,
} from 'material-react-table';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  // InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  // TextField,
  Typography,
} from '@mui/material';

interface FilterConfig {
  name: string;
  roles: string;
  pageSize: number;
  pageNumber: number;
}

interface CommonTableFilterPaginationProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  filterConfig: FilterConfig;
  totalPages: number;
  totalItems: number;
  onFilterChange: (key: keyof FilterConfig, value: string | number) => void;
  onPageChange: (newPageIndex: number) => void;
  onRowDoubleClick?: (row: T) => void;
  rolesSelect?: { value: string; name: string }[];
  nameLabel?: string;
  roleLabel?: string;
  toolbarButtons?: React.ReactNode;
  isShowFilter?: boolean
}

const CommonTableFilterPagination = <T extends MRT_RowData>({
  columns,
  data,
  filterConfig,
  totalPages,
  totalItems,
  onFilterChange,
  onPageChange,
  onRowDoubleClick,
  rolesSelect,
  nameLabel = 'Tên',
  roleLabel = 'Chức vụ',
  toolbarButtons,
  isShowFilter = false,
}: CommonTableFilterPaginationProps<T>) => {
  const table = useMaterialReactTable({
    columns,
    data: data || [],
    enableRowSelection: false,
    initialState: {
      pagination: {
        pageSize: filterConfig?.pageSize,
        pageIndex: filterConfig?.pageNumber - 1,
      },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 20, 60],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });

  return (
    <Stack sx={{ m: '2rem 0' }}>
      <Box display={'flex'} gap={2} mx={2} justifyContent={!isShowFilter ? 'flex-end' : "space-between"}>
        {isShowFilter && <Box display={'flex'} gap={2}>
          <TextField
            label={nameLabel}
            value={filterConfig?.name}
            onChange={(e) => onFilterChange('name', e.target.value)}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel shrink>{roleLabel}</InputLabel>
            <Select
              value={filterConfig?.roles}
              onChange={(e) => onFilterChange('roles', e.target.value)}
              displayEmpty
              label={roleLabel}
            >
              <MenuItem value="">
                <>Tất cả</>
              </MenuItem>
              {rolesSelect && rolesSelect.map((role) => (
                <MenuItem value={role.value} key={role.value}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>}
        {toolbarButtons}
      </Box>
      <Typography
        variant="subtitle2"
        sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '14px', color: 'red' }}
      >
        * Vui lòng nhấn đúp vào 1 hàng để xem thông tin chi tiết
      </Typography>
      <TableContainer className="p-4">
        <Table>
          <TableHead className="bg-orange-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell align="left" variant="head" key={header.id}>
                    {header.isPlaceholder ? null : (
                      <Typography fontWeight={700} color={'black'}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {data && data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Không có dữ liệu
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  selected={row.getIsSelected()}
                  onDoubleClick={() =>
                    onRowDoubleClick && onRowDoubleClick(row.original)
                  }
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? "white" : "#d9d9d9",
                    cursor: onRowDoubleClick ? "pointer" : "default",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell align="left" variant="body" key={cell.id}>
                      <MRT_TableBodyCellValue cell={cell} table={table} staticRowIndex={rowIndex} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      <Box display="flex" justifyContent="space-between" mx={2}>
      <Typography alignContent={'center'} fontWeight={600}>Tổng số lượng: {totalItems}</Typography>
      <Box display={'flex'} gap={2} justifyContent={'flex-end'} textAlign={'center'} p={2}>
          <FormControl variant="outlined" size="small">
            <Select
              value={filterConfig?.pageSize}
              onChange={(e) => onFilterChange('pageSize', Number(e.target.value))}
            >
              {[5, 10, 20, 60].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            onClick={() => onPageChange(filterConfig?.pageNumber - 2)}
            disabled={filterConfig?.pageNumber === 1}
          >
            Trước
          </Button>
          <Typography alignContent={'center'}>{`Trang ${filterConfig?.pageNumber} của ${totalPages}`}</Typography>
          <Button
            variant="outlined"
            onClick={() => onPageChange(filterConfig?.pageNumber)}
            disabled={filterConfig?.pageNumber >= totalPages}
          >
            Kế
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default CommonTableFilterPagination;
