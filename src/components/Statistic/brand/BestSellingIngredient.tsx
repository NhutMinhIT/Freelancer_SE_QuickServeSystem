import { useAppSelector } from "../../../services/store/store";
import { Box, Grid } from "@mui/material";

const BestSellingIngredient = () => {
    const { bestSellingOfBrand } = useAppSelector(state => state.revenues);

    return (
        <Box mt={2}>
            {bestSellingOfBrand?.soldIngredients.length === 0 && (
                <div className="text-center">Không có sản phẩm nào!</div>
            )}
            <Grid container spacing={2}>
                {bestSellingOfBrand && bestSellingOfBrand?.soldIngredients?.map((data: any) => (
                    <Grid item md={4} key={data?.id}>
                        <div className="bg-white border border-gray-900 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
                            <div className="bg-cover relative w-full h-48">
                                <img className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg" src={data?.urlImage} alt="Nguyên liệu" />
                            </div>
                            <div className="p-5">
                                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{data?.name}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <span className="font-bold">Số lượng đã bán:</span>
                                    <span className="ml-2">{data?.quantitySold}</span>
                                </p>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default BestSellingIngredient