import { Box, Grid } from "@mui/material"
import { useAppSelector } from "../../../services/store/store"

const BestSellingProduct = () => {
    const { bestSellingOfStore } = useAppSelector(state => state.revenues)

    return (
        <Box mt={2}>
            {bestSellingOfStore?.bestSellingProductTemplates.length === 0 && (
                <div className="text-center">Không có sản phẩm nào!</div>
            )}
            <Grid container spacing={2}>
                {bestSellingOfStore && bestSellingOfStore?.bestSellingProductTemplates?.map((data: any) => (
                    <Grid item md={4} key={data?.id}>
                        <div className="bg-white border border-gray-900 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
                            <div className="bg-cover relative w-full h-48">
                                <img className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg" src={data?.urlImage} alt="Sản phẩm" />
                            </div>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{data?.name}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <span className="font-bold">Tổng số lượng đã bán:</span>
                                    <span className="ml-2">{data?.sellingQuantity}</span>
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <span className="font-bold">Tổng đơn hàng:</span>
                                    <span className="ml-2">{data?.totalOrders}</span>
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <span className="font-bold">Doanh thu:</span>
                                    <span className="ml-2">{data?.totalRevenue}</span>
                                </p>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Box>
  )
}

export default BestSellingProduct