import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import {
    deleteCategoryById,
    getAllCategories,
    updateStatusCategoryById,
} from '../../../services/features/categorySlice';
import PopupCreateCategory from '../CreateCategory/PopupCreateCategory';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ICategory } from '../../../models/Categoty';
import PopupCategoryDetail from '../../Popup/PopupCategoryDetail';
import PopupCheck from '../../Popup/PopupCheck';
import PopupRenameCategory from '../../Popup/PopupRenameCategory';
import CommonTable from '../../CommonTable/CommonTable';

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
            return status === 1 ? (
                <CheckCircleOutlineIcon className="text-green-500" />
            ) : (
                <HighlightOffIcon className="text-red-500" />
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

const CategoryListComponent = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.categories);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [cateData, setCateData] = useState<ICategory | null>(null);
    const [onPopupCategoryDetail, setOnPopupCategoryDetail] =
        useState<boolean>(false);
    const [onPopupCheckChangeStatus, setOnPopupCheckChangeStatus] =
        useState<boolean>(false);
    const [onPopupCheckDelete, setOnPopupCheckDelete] =
        useState<boolean>(false);
    const [openPopupRename, setOpenPopupRename] = useState<boolean>(false);
    const [selectedCateId, setSelectedCateId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (!isPopupOpen) {
            dispatch(getAllCategories());
        }
    }, [isPopupOpen, dispatch]);

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleShowCategoryDetail = (cate: ICategory) => {
        setCateData(cate);
        setOnPopupCategoryDetail(true);
    };

    const handleOpenPopupUpdateCategory = (id: number) => {
        setSelectedCateId(id);
        setOnPopupCheckChangeStatus(true);
    };

    const handleOpenPopupDeleteCategory = (id: number) => {
        setSelectedCateId(id);
        setOnPopupCheckDelete(true);
    };
    const handleOpenPopupRenameCategory = (id: number) => {
        setSelectedCateId(id);
        setOpenPopupRename(true);
    };

    const handleUpdateStatusCategory = () => {
        if (selectedCateId !== null) {
            dispatch(updateStatusCategoryById({ id: selectedCateId }))
                .unwrap()
                .then(() => {
                    setOnPopupCategoryDetail(false);
                    setOnPopupCheckChangeStatus(false);
                    dispatch(getAllCategories());
                })
                .catch((error) => console.log(error));
        }
    };

    const handleDeleteCategory = () => {
        if (selectedCateId !== null) {
            dispatch(deleteCategoryById({ id: selectedCateId }))
                .unwrap()
                .then(() => {
                    setOnPopupCategoryDetail(false);
                    setOnPopupCheckDelete(false);
                    dispatch(getAllCategories());
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={categories || []}
                onRowDoubleClick={handleShowCategoryDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={handlePopupOpen}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm thể loại
                    </Button>
                }
            />

            <PopupCreateCategory
                isPopupOpen={isPopupOpen}
                closePopup={handlePopupClose}
            />
            {cateData && (
                <>
                    <PopupCategoryDetail
                        cate={cateData}
                        onPopupDetail={onPopupCategoryDetail}
                        setOnPopupDetail={setOnPopupCategoryDetail}
                        onChangeStatus={() =>
                            handleOpenPopupUpdateCategory(cateData.id)
                        }
                        onDelete={() =>
                            handleOpenPopupDeleteCategory(cateData.id)
                        }
                        onRename={() =>
                            handleOpenPopupRenameCategory(cateData.id)
                        }
                    />
                    <PopupRenameCategory
                        onClosePopupDetail={() =>
                            setOnPopupCategoryDetail(false)
                        }
                        open={openPopupRename}
                        closePopup={() => setOpenPopupRename(false)}
                        name={cateData?.name ?? ''}
                        cateId={cateData.id}
                    />
                </>
            )}

            {/* Update Status */}
            <PopupCheck
                open={onPopupCheckChangeStatus}
                content="Bạn có chắc chắn muốn thay đổi trạng thái thể loại này không ?"
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleUpdateStatusCategory}
                onCancel={() => setOnPopupCheckChangeStatus(false)}
            />

            {/* Delete */}
            <PopupCheck
                open={onPopupCheckDelete}
                content="Bạn có chắc chắn muốn xoá thể loại này không ?"
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleDeleteCategory}
                onCancel={() => setOnPopupCheckDelete(false)}
            />
        </Stack>
    );
};

export default CategoryListComponent;
