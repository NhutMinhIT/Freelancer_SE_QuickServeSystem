import { MRT_ColumnDef } from "material-react-table"
import { INutrition } from "../../models/Nutrition"
import { useAppDispatch, useAppSelector } from "../../services/store/store"
import { useEffect, useState } from "react"
import { deleteNutrition, getAllNutritions, getNutrition } from "../../services/features/nutritionSlice"
import { Button, Stack } from "@mui/material"
import CommonTable from "../CommonTable/CommonTable"
import PopupNutritionDetail from "./nutrition-popup/PopupNutritionDetail"
import PopupChangeImageNutrition from "./nutrition-popup/PopupChangeImageNutrition"
import PopupUpdateNutrition from "./nutrition-popup/PopupUpdateInfoNutrition"
import PopupCreateNutrition from "./nutrition-popup/PopupCreateNutrition"
import PopupCheck from "../Popup/PopupCheck"

const columns: MRT_ColumnDef<INutrition>[] = [
    {
        accessorKey: 'name',
        header: 'Tên dinh dưỡng',
    },
    {
        accessorKey: 'vitamin',
        header: 'Vitamin',
    },
    {
        accessorKey: 'healthValue',
        header: 'Giá trị dinh dưỡng',
    },
    {
        accessorKey: 'description',
        header: 'Mô tả',
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
        accessorKey: 'createdBy',
        header: 'Người tạo',
    },
    {
        accessorKey: 'created',
        header: 'Ngày tạo',
    },
    {
        accessorKey: 'lastModifiedBy',
        header: 'Người sửa cuối',
    },
    {
        accessorKey: 'lastModified',
        header: 'Ngày sửa cuối',
    },

]


const NutritionList = () => {
    const dispatch = useAppDispatch();
    const { nutritions } = useAppSelector(state => state.nutritions);
    // const nutritionById = useAppSelector(state => state.nutritions.nutrition);
    const [selectedNutritionId, setSelectedNutritionId] = useState<number | null>(null);

    const [isOpenPopupCreate, setIsOpenPopupCreate] = useState(false);
    const [onPopupNutritionDetail, setOnPopupNutritionDetail] = useState(false);

    const [nutritionData, setNutritionData] = useState<INutrition | null>(null);
    const [onPopupCheckDelete, setOnPopupCheckDelete] = useState(false);

    const [openPopupChangeImage, setOpenPopupChangeImage] = useState(false);
    const [openPopupUpdateNutrition, setOpenPopupUpdateNutrition] = useState<boolean>(false);



    useEffect(() => {
        if (!isOpenPopupCreate) {
            dispatch(getAllNutritions());
        }
    }, [isOpenPopupCreate, dispatch]);

    //Popup Create
    const handleOpenPopupCreate = () => {
        setIsOpenPopupCreate(true);
    };
    // const handleClosePopupCreate = () => {
    //     setIsOpenPopupCreate(false);
    // };

    //Popup Detail
    const handleShowNutritionDetail = (nutrition: INutrition) => {
        dispatch(getNutrition({ id: nutrition.id }))
        setNutritionData(nutrition);
        setOnPopupNutritionDetail(true);
    };

    //Popup ChangeImg
    const handleOpenPopupChangeImage = (nutrition: number) => {
        setSelectedNutritionId(nutrition)
        setOpenPopupChangeImage(true)
    };

    //Popup Update Nutrition
    const handleOpenPopupUpdateNutrition = () => {
        setOpenPopupUpdateNutrition(true)
    };
    //handle delete nutrition
    const handleOpenPopupDeleteNutrition = (id: number) => {
        setSelectedNutritionId(id);
        setOnPopupCheckDelete(true);
    };
    const handleDeleteNutrition = () => {
        if (selectedNutritionId !== null) {
            dispatch(deleteNutrition({ id: selectedNutritionId }))
                .unwrap()
                .then(() => {
                    setOnPopupNutritionDetail(false);
                    setOnPopupCheckDelete(false);
                    dispatch(getAllNutritions());
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <Stack>
            <CommonTable
                columns={columns}
                data={nutritions || []}
                onRowDoubleClick={handleShowNutritionDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={handleOpenPopupCreate}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm Dinh Dưỡng
                    </Button>
                }
            />
            <PopupCreateNutrition
                isOpen={isOpenPopupCreate}
                closePopup={() => setIsOpenPopupCreate(false)}
            />
            {nutritionData && (
                <>
                    <PopupNutritionDetail
                        nutri={nutritionData}
                        onPopupDetail={onPopupNutritionDetail}
                        setOnPopupDetail={setOnPopupNutritionDetail}
                        onChangeImage={() => handleOpenPopupChangeImage(nutritionData.id)}
                        onUpdateNutrition={() => handleOpenPopupUpdateNutrition()}
                        onDelete={() =>
                            handleOpenPopupDeleteNutrition(nutritionData.id)
                        } />
                    <PopupChangeImageNutrition
                        open={openPopupChangeImage}
                        name={nutritionData.name}
                        nutritionId={nutritionData.id}
                        closePopup={() => setOpenPopupChangeImage(false)}
                        imageUrl={nutritionData.imageUrl ?? ''}
                        onClosePopupDetail={() => { setOnPopupNutritionDetail(false) }}
                    />

                    <PopupUpdateNutrition open={openPopupUpdateNutrition} closePopup={() => setOpenPopupUpdateNutrition(false)} onClosePopupDetail={() => setOnPopupNutritionDetail(false)} />
                </>
            )}
            {/* Delete */}
            <PopupCheck
                open={onPopupCheckDelete}
                content="Bạn có chắc chắn muốn xoá dinh dưỡng này không ?"
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleDeleteNutrition}
                onCancel={() => setOnPopupCheckDelete(false)}
            />
        </Stack>
    )
}

export default NutritionList
