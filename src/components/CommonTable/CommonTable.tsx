import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_RowData,
  MRT_TableBodyCellValue,
  MRT_ToolbarAlertBanner,
  flexRender,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  LabelDisplayedRowsArgs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

interface CommonTableProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  onRowDoubleClick?: (row: T) => void;
  enableRowSelection?: boolean;
  toolbarButtons?: React.ReactNode;
  isShowTitleDoubleClick?: boolean;
}

const CommonTable = <T extends MRT_RowData>({
  columns,
  data,
  onRowDoubleClick,
  enableRowSelection = false,
  toolbarButtons,
  isShowTitleDoubleClick = true,
}: CommonTableProps<T>) => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: "outlined",
      getItemAriaLabel: (type) => {
        switch (type) {
          case 'first':
            return 'Trang đầu';
          case 'last':
            return 'Trang cuối';
          case 'next':
            return 'Trang tiếp theo';
          case 'previous':
            return 'Trang trước';
          default:
            return '';
        }
      },
    },
    paginationDisplayMode: "pages",
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <MRT_GlobalFilterTextField
          table={table}
          placeholder="Tìm kiếm"
        />
        {toolbarButtons}
      </Box>
      {isShowTitleDoubleClick && (
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "left",
            marginLeft: "16px",
            fontSize: "14px",
            color: "red",
          }}
        >
          * Vui lòng nhấn đúp vào 1 hàng để xem thông tin chi tiết
        </Typography>
      )}
      <TableContainer className="p-4">
        <Table>
          <TableHead className="bg-orange-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell align="left" variant="head" key={header.id}>
                    {header.isPlaceholder ? null : (
                      <Typography fontWeight={700} color={"black"}>
                        {flexRender(
                          header.column.columnDef.Header ?? header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
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
                      <MRT_TableBodyCellValue
                        cell={cell}
                        table={table}
                        staticRowIndex={rowIndex}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      padding: "2rem",
                      color: "gray",
                    }}
                  >
                    Chưa có dữ liệu
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      <TablePagination
        component="div"
        count={table.getPageCount() * table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, newPage) => table.setPageIndex(newPage)}
        rowsPerPage={table.getState().pagination.pageSize}
        onRowsPerPageChange={(event) => table.setPageSize(parseInt(event.target.value, 10))}
        labelRowsPerPage="Số hàng mỗi trang"
        labelDisplayedRows={({ from, to, count }: LabelDisplayedRowsArgs) => `${from}-${to} trong tổng số ${count}`}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </>
  );
};

export default CommonTable;