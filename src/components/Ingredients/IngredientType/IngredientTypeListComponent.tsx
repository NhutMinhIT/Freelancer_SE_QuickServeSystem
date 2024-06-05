
import { MRT_ColumnDef, MRT_GlobalFilterTextField, MRT_TableBodyCellValue, MRT_TablePagination, MRT_ToolbarAlertBanner, flexRender, useMaterialReactTable } from "material-react-table";
import { IIngredientType } from "../../../models/Ingredient";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { getAllIngredientTypes } from "../../../services/features/ingredientTypeSlice";

const columns: MRT_ColumnDef<IIngredientType>[] = [
    {
        accessorKey: 'name',
        header: 'Tên loại nguyên liệu',
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        Cell: ({ cell }) => {
            const status = cell.row.original.status;
            return status === 1 ? (
                <CheckCircleOutlineIcon className="text-green-500" />
            ) : (
                <HighlightOffIcon className='text-red-500' />
            );
        },
    },
    {
        accessorKey: 'created',
        header: 'Ngày tạo',
        Cell: ({ cell }) => {
            const created = cell.row.original.created;
            return typeof created === 'string'
                ? created.split('T')[0]
                : new Date(created).toISOString().split('T')[0];
        },
    },
    {
        accessorKey: 'lastModified',
        header: 'Ngày chỉnh sửa cuối',
        Cell: ({ cell }) => {
            const lastModified = cell.row.original.lastModified;
            if (!lastModified) {
                return 'Chưa có thay đổi';
            }
            return typeof lastModified === 'string'
                ? lastModified.split('T')[0]
                : new Date(lastModified).toISOString().split('T')[0];
        },
    },
];
const IngredientTypeListComponent = () => {
    //Khai báo các hàm để sử dụng
    const dispatch = useAppDispatch();
    const { ingredientTypes } = useAppSelector((state) => state.ingredientTypes)

    //Phần khai báo các state/các tham số cần thiết

    //Sử lý hàm
    useEffect(() => {
        dispatch(getAllIngredientTypes());
    }, [dispatch]);

    const table = useMaterialReactTable({
        columns,
        data: ingredientTypes || [],
        enableRowSelection: false,
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
        <Stack sx={{ m: '2rem 0' }}>
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
                <Button
                    variant="contained"
                    // onClick={handlePopupOpen}
                    sx={{
                        color: 'black',
                        backgroundColor: 'orange',
                    }}
                >
                    Thêm Nguyên Liệu
                </Button>
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
                                // onDoubleClick={() =>
                                //     handleShowCategoryDetail(row.original)
                                // }
                                style={{
                                    backgroundColor:
                                        rowIndex % 2 === 0
                                            ? 'white'
                                            : '#d9d9d9',
                                    cursor: 'pointer',
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
        </Stack>
    )
}

export default IngredientTypeListComponent
