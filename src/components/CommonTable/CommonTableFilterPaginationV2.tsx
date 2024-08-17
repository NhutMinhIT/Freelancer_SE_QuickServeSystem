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
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface FilterConfig {
  pageNumber: number;
  pageSize: number;
  storeId?: number | null;
  refOrderId: number | null;
  createdDate: string;
  last7Days: boolean;
  specificMonth: number | null;
  specificYear: number | null;
}

interface CommonTableFilterPaginationV2Props<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  filterConfig: FilterConfig;
  totalPages: number;
  totalItems: number;
  onFilterChange: (updates: Partial<FilterConfig>) => void;
  onPageChange: (newPageIndex: number) => void;
  onRowDoubleClick?: (row: T) => void;
  storesList?: { id: number; name: string }[];
  toolbarButtons?: React.ReactNode;
  isShowFilter?: boolean;
  isStoreId?: boolean;
}

const CommonTableFilterPaginationV2 = <T extends MRT_RowData>({
  columns,
  data,
  filterConfig,
  totalPages,
  totalItems,
  onFilterChange,
  onPageChange,
  onRowDoubleClick,
  storesList,
  toolbarButtons,
  isShowFilter = false,
  isStoreId = false,
}: CommonTableFilterPaginationV2Props<T>) => {
  const [showForm, setShowForm] = useState('lastDay');

  const handleChange = (event: SelectChangeEvent) => {
    const newShowForm = event.target.value as string;
    setShowForm(newShowForm);
  };

  useEffect(() => {
    onFilterChange({
      specificYear: null,
      specificMonth: null,
      last7Days: false,
      createdDate: '',
    });
  }, [showForm]);

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
      <Box display={'flex'} gap={2} mx={2} justifyContent={!isShowFilter ? 'flex-end' : 'space-between'}>
        {isShowFilter && (
          <Box display={'flex'} gap={2}>
            <TextField
              label={'Mã hóa đơn'}
              value={filterConfig?.refOrderId !== null ? filterConfig.refOrderId : ''}
              onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : null;
                onFilterChange({ refOrderId: value });
              }}
              type="number"
              inputProps={{ min: 0 }}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
            />
            {isStoreId && (
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel shrink>{'Cửa hàng'}</InputLabel>
                <Select
                  value={filterConfig?.storeId != null ? filterConfig.storeId : ''}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : null;
                    onFilterChange({ storeId: value })
                  }}
                  displayEmpty
                  label={'Cửa hàng'}
                >
                  <MenuItem value="">
                    <>Tất cả</>
                  </MenuItem>
                  {storesList &&
                    storesList.map((store) => (
                      <MenuItem value={store.id} key={store.id}>
                        {store.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Tìm kiếm</InputLabel>
              <Select value={showForm} label="search-in-chart" onChange={handleChange}>
                <MenuItem value={'specificDate'}>Theo ngày cụ thể</MenuItem>
                <MenuItem value={'month'}>Theo tháng</MenuItem>
                <MenuItem value={'year'}>Theo năm</MenuItem>
                <MenuItem value={'lastDay'}>Theo 7 ngày gần nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        {toolbarButtons}
        {showForm === 'lastDay' && (
          <FormControlLabel
            control={
              <Checkbox
                checked={filterConfig?.last7Days}
                onChange={(e) => onFilterChange({ last7Days: e.target.checked })}
              />
            }
            label="7 ngày gần nhất"
          />
        )}
        {showForm === 'month' && (
          <TextField
            type="month"
            variant="outlined"
            size="small"
            onChange={(e) => {
              const [year, month] = e.target.value.split('-');
              onFilterChange({ specificMonth: parseInt(month), specificYear: parseInt(year) });
            }}
            sx={{ borderColor: 'gray.500', borderRadius: 1, p: 1 }}
          />
        )}
        {showForm === 'specificDate' && (
          <TextField
            type="date"
            variant="outlined"
            size="small"
            value={filterConfig.createdDate}
            onChange={(e) => onFilterChange({ createdDate: e.target.value })}
            sx={{ borderColor: 'gray.500', borderRadius: 1, p: 1 }}
          />
        )}
        {showForm === 'year' && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel shrink>{'Chọn năm'}</InputLabel>
            <Select
              value={filterConfig?.specificYear != null ? filterConfig.specificYear : ''}
              onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : null;
                onFilterChange({ specificYear: value })
              }}
              displayEmpty
              label={'Chọn năm'}
            >
              <MenuItem value="">
                <>Chọn</>
              </MenuItem>
              {Array.from({ length: 10 }, (_, i) => 2019 + i).map((year) => (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      {/* <Typography
        variant="subtitle2"
        sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '14px', color: 'red' }}
      >
        * Vui lòng nhấn đúp vào 1 hàng để xem thông tin chi tiết
      </Typography> */}
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
                  onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(row.original)}
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? 'white' : '#d9d9d9',
                    cursor: onRowDoubleClick ? 'pointer' : 'default',
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
        <Typography alignContent={'center'} fontWeight={600}>
          Tổng số lượng: {totalItems}
        </Typography>
        <Box display={'flex'} gap={2} justifyContent={'flex-end'} textAlign={'center'} p={2}>
          <FormControl variant="outlined" size="small">
            <Select
              value={filterConfig?.pageSize}
              onChange={(e) => onFilterChange({ pageSize: Number(e.target.value) })}
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

export default CommonTableFilterPaginationV2;