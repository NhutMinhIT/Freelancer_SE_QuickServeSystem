import { MRT_ColumnDef } from "material-react-table"
import { INutrition } from "../../models/Nutrition"
import { useAppDispatch, useAppSelector } from "../../services/store/store"
import { useEffect, useState } from "react"
import { getAllNutritions } from "../../services/features/nutritionSlice"
import { Button, Stack } from "@mui/material"
import CommonTable from "../CommonTable/CommonTable"
import PopupNutritionDetail from "./nutrition-popup/PopupNutritionDetail"

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
    const [selectedNutritionId, setSelectedNutritionId] = useState<number | null>(null);

    const [isOpenPopupCreate, setIsOpenPopupCreate] = useState(false);
    const [onPopupNutritionDetail, setOnPopupNutritionDetail] = useState(false);

    const [nutritionData, setNutritionData] = useState<INutrition | null>(null);
    const [onPopupCheckDelete, setOnPopupCheckDelete] = useState(false);

    useEffect(() => {
        if (!isOpenPopupCreate) {
            dispatch(getAllNutritions());
        }
    }, [isOpenPopupCreate, dispatch]);

    //Popup Create
    const handleOpenPopupCreate = () => {
        setIsOpenPopupCreate(true);
    };
    const handleClosePopupCreate = () => {
        setIsOpenPopupCreate(false);
    };

    //Popup Detail
    const handleShowNutritionDetail = (nutrition: INutrition) => {
        setNutritionData(nutrition);
        setOnPopupNutritionDetail(true);
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
            {nutritionData && (
                <>
                    <PopupNutritionDetail
                        nutri={nutritionData}
                        onPopupDetail={onPopupNutritionDetail}
                        setOnPopupDetail={setOnPopupNutritionDetail}
                    />
                </>
            )}
        </Stack>
    )
}

export default NutritionList
