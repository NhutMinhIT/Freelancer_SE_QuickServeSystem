import { MRT_ColumnDef, MRT_GlobalFilterTextField, MRT_TableBodyCellValue, MRT_TablePagination, MRT_ToolbarAlertBanner, flexRender, useMaterialReactTable } from 'material-react-table';
import { useEffect, useState } from 'react';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { getAllCategories } from '../../../services/features/categorySlice';
import { ICategory } from '../../../models/Categoty';
import PopupCreateCategory from '../CreateCategory/PopupCreateCategory';

const columns: MRT_ColumnDef<ICategory>[] = [
    {
        accessorKey: 'name',
        header: 'Tên thể loại',
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        Cell: ({ cell }) => {
            const status = cell.row.original.status;
            return status === 1 ? 'Active' : 'Inactive';
        }
    },
    {
        accessorKey: 'created',
        header: 'Ngày tạo',
        Cell: ({ cell }) => {
            const created = cell.row.original.created;
            return typeof created === 'string' ? created.split('T')[0] : new Date(created).toISOString().split('T')[0];
        },
    },
    {
        accessorKey: 'lastModified',
        header: 'Ngày chỉnh sửa cuối',
        Cell: ({ cell }) => {
            const lastModified = cell.row.original.lastModified;
            return typeof lastModified === 'string' ? lastModified.split('T')[0] : new Date(lastModified).toISOString().split('T')[0];
        },
    }
];

const CategoryListComponent = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(state => state.categories);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (!isPopupOpen) {
            dispatch(getAllCategories());
        }
    }, [isPopupOpen, dispatch]);

    const table = useMaterialReactTable({
        columns,
        data: categories || [],
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

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

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
                <Button variant="contained" onClick={handlePopupOpen} sx={{
                    color: 'black',
                    backgroundColor: 'orange',
                }}>
                    Thêm thể loại
                </Button>
            </Box>
            <Typography variant="subtitle2" sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '14px', color: 'red' }}>
                * Vui lòng nhấn đúp vào 1 hàng để xem thông tin chi tiết
            </Typography>
            <TableContainer className='p-4'>
                <Table>
                    <TableHead className='bg-orange-500'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell align="left" variant="head" key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <Typography fontWeight={700} color={'black'}>
                                                {flexRender(header.column.columnDef.Header ?? header.column.columnDef.header, header.getContext())}
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
                                // onDoubleClick={() => handleShowDetail(row.original)}
                                style={{ backgroundColor: rowIndex % 2 === 0 ? 'white' : '#d9d9d9', cursor: 'pointer' }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell align="left" variant="body" key={cell.id}>
                                        <MRT_TableBodyCellValue cell={cell} table={table} staticRowIndex={rowIndex} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
            <PopupCreateCategory isPopupOpen={isPopupOpen} closePopup={handlePopupClose} />
        </Stack>
    );
}

export default CategoryListComponent;
