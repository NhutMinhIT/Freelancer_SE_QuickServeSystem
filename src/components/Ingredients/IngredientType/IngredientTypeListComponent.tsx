
import { MRT_ColumnDef } from "material-react-table";
import { IIngredientType } from "../../../models/Ingredient";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteIngredientTypeById, getAllIngredientTypes, updateStatusIngredientTypeById } from "../../../services/features/ingredientTypeSlice";
import PopupCreateIngredientType from "../PopupCreate/PopupCreateIngredientType";
import CommonTable from "../../CommonTable/CommonTable";
import PopupDetailIngredientType from "../../Popup/PopupDetailIngredientType";
import PopupCheck from "../../Popup/PopupCheck";
import PopupRenameIngredientType from "../../Popup/PopupRenameIngredientType";

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
    const [ingredientTypeData, setIngredientTypeData] = useState<IIngredientType | null>(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [onPopupIngredientTypeDetail, setOnPopupIngredientTypeDetail] =
        useState<boolean>(false);
    const [selectedIngredientTypeId, setSelectedIngredientId] = useState<number | null>(null);
    const [onPopupCheckChangeStatus, setOnPopupCheckChangeStatus] =
        useState<boolean>(false);
    const [onPopupCheckDelete, setOnPopupCheckDelete] = useState<boolean>(false);
    const [openPopupRename, setOpenPopupRename] = useState<boolean>(false);

    //Sử lý hàm get all ingredientTypes
    // useEffect(() => {
    //     dispatch(getAllIngredientTypes());
    // }, [dispatch]);

    //Reload list ingredientType after create new IngredientType/Handle Action
    useEffect(() => {
        if (!isPopupOpen) {
            dispatch(getAllIngredientTypes());
        }
    }, [isPopupOpen, dispatch]);

    //handle open popup create
    const handleOpenPopupCreateIngredientType = () => {
        setIsPopupOpen(true);
    };
    //hanle close popup create
    const handleClosePopupCreateIngredientType = () => {
        setIsPopupOpen(false);
    };

    //Handele show popup detail of ingredientType
    const handleOpenPopupDetailIngredientType = (ingredientType: IIngredientType) => {
        setIngredientTypeData(ingredientType);
        setOnPopupIngredientTypeDetail(true)
    }
    //handle Status IngredientType
    const handleOpenPopupChangeStatusIngredientType = (id: number) => {
        // setOnPopupCheckDelete
        setSelectedIngredientId(id);
        setOnPopupCheckChangeStatus(true);
    }
    const handleChangeStatusIngredientType = () => {
        if (selectedIngredientTypeId !== null) {
            dispatch(updateStatusIngredientTypeById({ id: selectedIngredientTypeId }))
                .unwrap()
                .then(() => {
                    setOnPopupIngredientTypeDetail(false);
                    setOnPopupCheckChangeStatus(false);
                    dispatch(getAllIngredientTypes());
                })
                .catch((error) => console.log(error));
        }
    }

    //handle OpenPopup Delete IngredientType
    const handleOpenPopupDeleteIngredientType = (id: number) => {
        setSelectedIngredientId(id);
        setOnPopupCheckDelete(true);
    };
    //handle Delete IngredientType
    const handleDeleteIngredientType = () => {
        if (selectedIngredientTypeId !== null) {
            dispatch(deleteIngredientTypeById({ id: selectedIngredientTypeId }))
                .unwrap()
                .then(() => {
                    setOnPopupIngredientTypeDetail(false);
                    setOnPopupCheckDelete(false);
                    dispatch(getAllIngredientTypes());
                })
                .catch((error) => console.log(error));
        }
    }

    //handle Rename IngredientType
    const handleOpenPopupRenameIngredientType = (id: number) => {
        setSelectedIngredientId(id);
        setOpenPopupRename(true);
    };

    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={ingredientTypes || []}
                onRowDoubleClick={handleOpenPopupDetailIngredientType}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={handleOpenPopupCreateIngredientType}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm loại nguyên liệu
                    </Button>
                }
            />
            <PopupCreateIngredientType
                isPopupOpen={isPopupOpen}
                closePopup={handleClosePopupCreateIngredientType}
            />
            {ingredientTypeData && (
                <>
                    <PopupDetailIngredientType
                        ingredientType={ingredientTypeData}
                        onPopupDetail={onPopupIngredientTypeDetail}
                        setOnPopupDetail={setOnPopupIngredientTypeDetail}
                        onDelete={() =>
                            handleOpenPopupDeleteIngredientType(ingredientTypeData.id)
                        }
                        onChangeStatus={() =>
                            handleOpenPopupChangeStatusIngredientType(ingredientTypeData.id)
                        }
                        onRename={() =>
                            handleOpenPopupRenameIngredientType(ingredientTypeData.id)
                        }
                    />
                    <PopupRenameIngredientType
                        onClosePopupDetail={() =>
                            setOnPopupIngredientTypeDetail(false)
                        }
                        open={openPopupRename}
                        closePopup={() => setOpenPopupRename(false)}
                        ingredientTypeName={ingredientTypeData?.name ?? ''}
                        ingedientTypeId={ingredientTypeData?.id}
                    />
                </>
            )}
            <PopupCheck
                open={onPopupCheckChangeStatus}
                content="Bạn có chắc chắn muốn thay đổi trạng thái loại thành phần này không ?"
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleChangeStatusIngredientType}
                onCancel={() => setOnPopupCheckChangeStatus(false)}
            />

            {/* Delete */}
            <PopupCheck
                open={onPopupCheckDelete}
                content="Bạn có chắc chắn muốn xoá loại thành phần này không ?"
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleDeleteIngredientType}
                onCancel={() => setOnPopupCheckDelete(false)}
            />
        </Stack>
    )
}

export default IngredientTypeListComponent
