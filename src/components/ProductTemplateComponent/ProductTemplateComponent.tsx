import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../services/store/store';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IProductTemplate } from '../../models/ProductTemplate';
import CommonTable from '../CommonTable/CommonTable';
import { getAllProductTemplates, getProductTemplateById } from '../../services/features/productTemplateSlice';
import PopupDetailProductTemplate from '../Popup/PopupDetailProductTemplate';

const columns: MRT_ColumnDef<IProductTemplate>[] = [
    {
        accessorKey: 'categoryId',
        header: 'Tên thể loại',
        Cell: ({ cell }) => {
            const typeName = cell.row.original.category.name;
            return typeName;
        },
    },
    {
        accessorKey: 'name',
        header: 'Tên sản phẩm',
    },
    {
        accessorKey: 'quantity',
        header: 'Số lượng',
    },
    {
        accessorKey: 'size',
        header: 'Kích thước',
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        Cell: ({ cell }) => {
            const status = cell.row.original.status;
            return status === 1 ? (
                <CheckCircleOutlineIcon className="text-green-500" />
            ) : (
                <HighlightOffIcon className="text-red-500" />
            );
        },
    },
    {
        accessorKey: 'price',
        header: 'Giá'
    },
    {
        accessorKey: 'description',
        header: 'Mô tả'
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

];

const ProductTemplateComponent = () => {
    const dispatch = useAppDispatch();
    const { productTemplates } = useAppSelector((state) => state.productTemplates);

    const [onPopupProductTemplateDetail, setOnPopupProductTemplateDetail] = useState<boolean>(false);

    useEffect(() => {
            dispatch(getAllProductTemplates());
    }, [dispatch]);

    const handleShowPopupProductTemplateDetail = (productTemplate: IProductTemplate) => {
        dispatch(getProductTemplateById({id: productTemplate.id}))
        setOnPopupProductTemplateDetail(true);
    }


    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={productTemplates || []}
                onRowDoubleClick={handleShowPopupProductTemplateDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={() => {}}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm mẫu sản phẩm
                    </Button>
                }
            />
            <PopupDetailProductTemplate
                onPopupProductTemplateDetail={onPopupProductTemplateDetail}
                setOnPopupProductTemplateDetail={setOnPopupProductTemplateDetail}
            />
        </Stack>
    );
};

export default ProductTemplateComponent;
