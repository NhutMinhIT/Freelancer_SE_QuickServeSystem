import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../services/store/store';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IProductTemplate } from '../../models/ProductTemplate';
import CommonTable from '../CommonTable/CommonTable';
import { deleteProductTemplate, getAllProductTemplates, getProductTemplateById } from '../../services/features/productTemplateSlice';
import PopupDetailProductTemplate from '../Popup/PopupDetailProductTemplate';
import { formatAnyDate } from '../../utils';
import { useNavigate } from 'react-router-dom';
import PopupCerateProductTemplate from '../Popup/PopupCerateProductTemplate';
import PopupCheck from '../Popup/PopupCheck';
import PopupChangeImageProductTemplate from '../Popup/PopupChangeImageProductTemplate';
import PopupUpdateProductTemplate from '../Popup/PopupUpdateProductTemplate';

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
        accessorKey: 'size',
        header: 'Kích thước',
        Cell: ({ cell }) => cell.row.original.size === 'small' ? 'Nhỏ' : cell.row.original.size === 'medium' ? 'Vừa' : 'Lớn',
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        Cell: ({ cell }) => {
            const status = cell.row.original.status;
            return status === 1 ? (
                <span className="text-green-500 font-bold">Hoạt động</span>
            ) : (
                <span className="text-red-500 font-bold" >Không Hoạt động</span>
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
            return formatAnyDate(new Date(cell.row.original.created));
        },
    },
];

const ProductTemplateComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { productTemplates } = useAppSelector((state) => state.productTemplates);
    const productTemplateData = useAppSelector((state) => state.productTemplates.productTemplate);

    const [selectedProuctTemlateId, setSelectedProductTemplateId] = useState<number | null>(null);

    const [isPopupCareateOpen, setIsPopupCreateOpen] = useState(false);
    const [onPopupProductTemplateDetail, setOnPopupProductTemplateDetail] = useState<boolean>(false);
    const [onPopupCheckDelete, setOnPopupCheckDelete] = useState<boolean>(false);
    const [openPopupChangeImage, setOpenPopupChangeImage] = useState<boolean>(false);
    const [openPopupUpdateProductTemplate, setOpenPopupUpdateProductTemplate] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllProductTemplates());
    }, [dispatch]);

    const handleShowPopupProductTemplateDetail = (productTemplate: IProductTemplate) => {
        dispatch(getProductTemplateById({ id: productTemplate.id }))
        setOnPopupProductTemplateDetail(true);
    }

    const handleProductTemplateStep = (id: number) => {
        navigate(`/product-template-step/${id}`);
    }
    // handle show popup create product template
    const handleOpenPopupCreate = () => {
        setIsPopupCreateOpen(true);
    };
    const handleOpenPopupDeleteProductTemplate = (productTemplateId: number) => {
        setSelectedProductTemplateId(productTemplateId);
        setOnPopupCheckDelete(true);
    };

    const handleDeleteProductTemplate = () => {
        if (selectedProuctTemlateId !== null) {
            dispatch(deleteProductTemplate({ id: selectedProuctTemlateId }))
                .unwrap()
                .then(() => {
                    setOnPopupProductTemplateDetail(false);
                    setOnPopupCheckDelete(false);
                    dispatch(getAllProductTemplates());
                });
        }
    };
    // Handle change image ingredient
    const handleOpenPopupChangeImage = (productTemplateId: number) => {
        setSelectedProductTemplateId(productTemplateId)
        setOpenPopupChangeImage(true)
    };

    const handleOpenPopupUpdateProductTempalte = () => {
        setOpenPopupUpdateProductTemplate(true)
    };


    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={productTemplates || []}
                onRowDoubleClick={handleShowPopupProductTemplateDetail}
                toolbarButtons={
                    <Button

                        variant="contained"
                        onClick={handleOpenPopupCreate}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm mẫu sản phẩm
                    </Button>
                }
            />
            <PopupCerateProductTemplate
                isPopupOpen={isPopupCareateOpen}
                closePopup={() => setIsPopupCreateOpen(false)}
            />
            {productTemplateData && (
                <>
                    <PopupDetailProductTemplate
                        onPopupProductTemplateDetail={onPopupProductTemplateDetail}
                        setOnPopupProductTemplateDetail={setOnPopupProductTemplateDetail}
                        onProductTemplateStep={handleProductTemplateStep}
                        onDelete={() =>
                            handleOpenPopupDeleteProductTemplate(productTemplateData?.id)
                        }
                        onChangeImage={() =>
                            handleOpenPopupChangeImage(productTemplateData?.id)
                        }
                        onUpdate={() => {
                            handleOpenPopupUpdateProductTempalte()
                        }}
                    />
                    <PopupChangeImageProductTemplate
                        onClosePopupDetail={() =>
                            setOnPopupProductTemplateDetail(false)
                        }
                        open={openPopupChangeImage}
                        closePopup={() => setOpenPopupChangeImage(false)}
                        imageUrl={productTemplateData?.imageUrl ?? ''}
                        productTemplateID={productTemplateData?.id}
                        name={productTemplateData?.name ?? ''}
                    />
                    <PopupUpdateProductTemplate
                        onClosePopupDetail={() =>
                            setOnPopupProductTemplateDetail(false)
                        }
                        open={openPopupUpdateProductTemplate}
                        closePopup={() => setOpenPopupUpdateProductTemplate(false)}
                    />
                </>)}
            <PopupCheck
                open={onPopupCheckDelete}
                content="Bạn có chắc chắn muốn xoá mẫu sản phẩm này không?"
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleDeleteProductTemplate}
                onCancel={() => setOnPopupCheckDelete(false)}
            />
        </Stack>

    );
};

export default ProductTemplateComponent;
