import { MRT_ColumnDef } from 'material-react-table';
import { IIngredient } from '../../../models/Ingredient';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { useEffect, useState } from 'react';
import { deleteIngredient, getAllIngredients, getIngredientById } from '../../../services/features/ingredientSlice';
import CommonTable from '../../CommonTable/CommonTable';
import PopupCreateIngredient from '../../Popup/PopupCreateIngredient';
import PopupDetailIngredient from '../../Popup/PopupDetailIngredient';
import PopupCheck from '../../Popup/PopupCheck';
import PopupChangeImageIngredient from '../../Popup/PopupChangeImageIngredient';
import PopupUpdateIngredient from '../../Popup/PopupUpdateIngredient';

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
    const  ingredientData  = useAppSelector((state) => state.ingredients.ingredient);    

    const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [onPopupCheckDelete, setOnPopupCheckDelete] = useState<boolean>(false);
    const [openPopupChangeImage, setOpenPopupChangeImage] = useState<boolean>(false);
    const [openPopupUpdateIngredient, setOpenPopupUpdateIngredient] = useState<boolean>(false);

    // const [ingredientData, setIngredientData] = useState<IIngredient | null>(null);
    const [onPopupIngredientDetail, setOnPopupIngredientDetail] = useState<boolean>(false);


    useEffect(() => {
        dispatch(getAllIngredients());
    }, [dispatch]);

    // Handle open popup create ingredient
    const handleOpenPopupCreateIngredient = () => {
        setIsPopupOpen(true);
    }
    const handleClosePopupCreateIngredient = () => {
        setIsPopupOpen(false);
    }

    // Handle show ingredient detail
    const handleShowPopupIngredientDetail = (ingredient: IIngredient) => {
        dispatch(getIngredientById({id: ingredient.id}))
        setOnPopupIngredientDetail(true);
    }

    // Handle open popup delete ingredient
    const handleOpenPopupDeleteIngredient = (ingredientId: number) => {
        setSelectedIngredientId(ingredientId);
        setOnPopupCheckDelete(true);
    };

    const handleDeleteIngredient = () => {
        if (selectedIngredientId !== null) {
            dispatch(deleteIngredient({ id: selectedIngredientId }))
                .unwrap()
                .then(() => {
                    setOnPopupIngredientDetail(false);
                    setOnPopupCheckDelete(false);
                    dispatch(getAllIngredients());
                });
        }
    };
    // Handle change image ingredient
    const handleOpenPopupChangeImage = (ingredientId: number) => {
        setSelectedIngredientId(ingredientId)
        setOpenPopupChangeImage(true)
    };

    const handleOpenPopupUpdateIngredient = () => {
        setOpenPopupUpdateIngredient(true)
    };

    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={ingredients || []}
                onRowDoubleClick={handleShowPopupIngredientDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={handleOpenPopupCreateIngredient}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm nguyên liệu
                    </Button>
                }
            />
            <PopupCreateIngredient
                isPopupOpen={isPopupOpen}
                closePopup={handleClosePopupCreateIngredient}
            />
            {ingredientData && (
                <>
                    <PopupDetailIngredient
                        ingredient={ingredientData}
                        onPopupIngredientDetail={onPopupIngredientDetail}
                        setOnPopupIngredientDetail={setOnPopupIngredientDetail}
                        onDelete={() =>
                            handleOpenPopupDeleteIngredient(ingredientData.id)
                        }
                        onChangeImage={() =>
                            handleOpenPopupChangeImage(ingredientData.id)
                        }
                        onUpdate={() => {
                            handleOpenPopupUpdateIngredient()
                        }}
                    />
                    <PopupChangeImageIngredient
                        onClosePopupDetail={() =>
                            setOnPopupIngredientDetail(false)
                        }
                        open={openPopupChangeImage}
                        closePopup={() => setOpenPopupChangeImage(false)}
                        imageUrl={ingredientData?.imageUrl ?? ''}
                        ingredientId={ingredientData?.id}
                        name={ingredientData?.name ?? ''}
                    />
                    <PopupUpdateIngredient
                        onClosePopupDetail={() =>
                            setOnPopupIngredientDetail(false)
                        }
                        open={openPopupUpdateIngredient}
                        closePopup={() => setOpenPopupUpdateIngredient(false)}
                    />

                </>
            )}
            <PopupCheck
                open={onPopupCheckDelete}
                content="Bạn có chắc chắn muốn xoá nguyên liệu này không?"
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleDeleteIngredient}
                onCancel={() => setOnPopupCheckDelete(false)}
            />
        </Stack>
    );
};

export default IngredientListComponent;
