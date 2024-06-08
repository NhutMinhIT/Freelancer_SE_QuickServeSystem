
import { MRT_ColumnDef } from "material-react-table";
import { IIngredientType } from "../../../models/Ingredient";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllIngredientTypes } from "../../../services/features/ingredientTypeSlice";
import PopupCreateIngredientType from "../PopupCreate/PopupCreateIngredientType";
import CommonTable from "../../CommonTable/CommonTable";
import PopupDetailIngredientType from "../../Popup/PopupDetailIngredientType";

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
                <PopupDetailIngredientType
                    ingredientType={ingredientTypeData}
                    onPopupDetail={onPopupIngredientTypeDetail}
                    setOnPopupDetail={setOnPopupIngredientTypeDetail}
                />
            )}
        </Stack>
    )
}

export default IngredientTypeListComponent
