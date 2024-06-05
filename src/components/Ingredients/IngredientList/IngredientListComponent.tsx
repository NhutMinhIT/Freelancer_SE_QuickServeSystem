import { MRT_ColumnDef } from 'material-react-table';
import { IIngredient } from '../../../models/Ingredient';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { useEffect } from 'react';
import { getAllIngredients } from '../../../services/features/ingredientSlice';
import CommonTable from '../../CommonTable/CommonTable';

const columns: MRT_ColumnDef<IIngredient>[] = [
    {
        accessorKey: 'name',
        header: 'Tên nguyên liệu',
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        Cell: ({ cell }) => {
            const status = cell.row.original.status;
            return status === 1 ? (
                <CheckCircleOutline className="text-green-500" />
            ) : (
                <HighlightOff className="text-red-500" />
            );
        },
    },
    {
        accessorKey: 'price',
        header: 'Giá',
    },
    {
        accessorKey: 'calo',
        header: 'Calo',
    },
    {
        accessorKey: 'description',
        header: 'Mô tả',
    },
    {
        accessorKey: 'ingredientType',
        header: 'Loại nguyên liệu',
        Cell: ({ cell }) => {
            const typeName = cell.row.original.ingredientType.name;
            return typeName;
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

const IngredientListComponent = () => {
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector((state) => state.ingredients);

    useEffect(() => {
        dispatch(getAllIngredients());
    }, [dispatch]);

    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={ingredients || []}
                // onRowDoubleClick={handleShowCategoryDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        // onClick={handlePopupOpen}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm nguyên liệu
                    </Button>
                }
            />
        </Stack>
    );
};

export default IngredientListComponent;
