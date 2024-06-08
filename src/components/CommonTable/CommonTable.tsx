import {
    MRT_ColumnDef,
    MRT_GlobalFilterTextField,
    MRT_RowData,
    MRT_TableBodyCellValue,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    flexRender,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

interface CommonTableProps<T extends MRT_RowData> {
    columns: MRT_ColumnDef<T>[];
    data: T[];
    onRowDoubleClick?: (row: T) => void;
    enableRowSelection?: boolean;
    toolbarButtons?: React.ReactNode;
}

const CommonTable = <T extends MRT_RowData>({
    columns,
    data,
    onRowDoubleClick,
    enableRowSelection = false,
    toolbarButtons,
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
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
    });

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                }}
            >
                <MRT_GlobalFilterTextField table={table} />
                <MRT_TablePagination table={table} />
                {toolbarButtons}
            </Box>
            <Typography
                variant="subtitle2"
                sx={{
                    textAlign: 'left',
                    marginLeft: '16px',
                    fontSize: '14px',
                    color: 'red',
                }}
            >
                * Vui lòng nhấn đúp vào 1 hàng để xem thông tin chi tiết
            </Typography>
            <TableContainer className="p-4">
                <Table>
                    <TableHead className="bg-orange-500">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell
                                        align="left"
                                        variant="head"
                                        key={header.id}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <Typography
                                                fontWeight={700}
                                                color={'black'}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .Header ??
                                                    header.column.columnDef
                                                        .header,
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
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <TableRow
                                key={row.id}
                                selected={row.getIsSelected()}
                                onDoubleClick={() =>
                                    onRowDoubleClick &&
                                    onRowDoubleClick(row.original)
                                }
                                style={{
                                    backgroundColor:
                                        rowIndex % 2 === 0
                                            ? 'white'
                                            : '#d9d9d9',
                                    cursor: onRowDoubleClick
                                        ? 'pointer'
                                        : 'default',
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        align="left"
                                        variant="body"
                                        key={cell.id}
                                    >
                                        <MRT_TableBodyCellValue
                                            cell={cell}
                                            table={table}
                                            staticRowIndex={rowIndex}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </>
    );
};

export default CommonTable;
