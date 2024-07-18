import React from "react"
import { useAppSelector } from "../../../services/store/store"
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Tooltip } from "@mui/material"
import CommonTable from "../../CommonTable/CommonTable"
import { MRT_ColumnDef } from "material-react-table"
import { INutritionFields } from "../../../models/Ingredientutrition"
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid"

type PopupGetAllNutritionIngredientIdProps = {
    openPopupNutrition: boolean
    handleCloseAllNutrition: () => void
}
const columns: MRT_ColumnDef<INutritionFields>[] = [
    {
        accessorKey: "name",
        header: "Tên nguyên liệu"
    },
    {
        accessorKey: "vitamin",
        header: "Vitamin"
    },
    {
        accessorKey: "healthValue",
        header: "Giá trị dinh dưỡng"
    },
    {
        accessorKey: "description",
        header: "Mô tả"
    },
    {
        accessorKey: 'function',
        header: 'Chức năng',
        Cell: ({ cell }) => {
            const id = cell.row.original.id;
            return (
                <div className="flex justify-center">
                    <Tooltip title="Xóa dinh dưỡng">
                        <TrashIcon
                            width={16}
                            height={16}
                            className="h-6 w-6 cursor-pointer text-red-600"
                        // onClick={() => {
                        //     setIsDeleteIngredientSessionByIngredientIdPopupCheck(true)
                        //     setSelectedId(id)
                        // }}
                        />
                    </Tooltip>
                </div>
            );
        },
    },
]
const PopupGetAllNutritionIngredientId: React.FC<PopupGetAllNutritionIngredientIdProps> = ({
    openPopupNutrition,
    handleCloseAllNutrition
}) => {
    const { ingredientNutritionById, loading } = useAppSelector((state) => state.ingredientNutritions)
    return (
        <Dialog
            open={openPopupNutrition}
            onClose={handleCloseAllNutrition}
            fullWidth
            maxWidth="lg"
        >
            <div className="flex items-center justify-between">
                <DialogTitle
                    className="uppercase"
                    sx={{
                        fontWeight: "bold",
                    }}
                >Loại dinh dưỡng của nguyên liệu</DialogTitle>
                <XMarkIcon
                    height={24}
                    width={24}
                    className="h-6 w-6 items-center flex mr-4 cursor-pointer"
                    onClick={handleCloseAllNutrition}
                />
            </div>
            <DialogContent>
                {loading ? (
                    <Box textAlign="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <CommonTable
                            columns={columns}
                            data={ingredientNutritionById?.nutritions || []}
                            isShowTitleDoubleClick={false}
                            toolbarButtons={
                                <Box display='flex' sx={{ gap: '8px' }}>
                                    {ingredientNutritionById?.nutritions !== undefined && (
                                        <Button
                                            variant="contained"
                                            // onClick={}
                                            sx={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                backgroundColor: 'red',
                                                '&:hover': {
                                                    backgroundColor: '#ad2518',
                                                },
                                                textTransform: 'none',
                                            }}
                                        >
                                            Xóa tất cả
                                        </Button>
                                    )}
                                </Box>
                            }
                        />
                        <Box display="flex" justifyContent="flex-end" mr={2}>
                            {ingredientNutritionById?.nutritions !== undefined && (
                                <Button
                                    variant="contained"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        backgroundColor: 'orange',
                                        '&:hover': {
                                            backgroundColor: '#f58f1b',
                                        },
                                        textTransform: 'none',
                                    }}
                                >
                                    Chỉnh sửa dinh dưỡng
                                </Button>
                            )}
                        </Box>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default PopupGetAllNutritionIngredientId
