import { useEffect } from "react";
import { getBestSellingOfBrand } from "../../../services/features/revenueSlice";
import { useAppDispatch } from "../../../services/store/store";
import { formatAnyDate, formatMMDDYYYYDate } from "../../../utils";
import BestSellingOfBrand from "./BestSellingOfBrand";
import { getAllStore } from "../../../services/features/storeSlice";

type BestSellingFormData = {
    specificDate?: string;
    monthYear?: string;
    year?: string;
    startDate?: string;
    endDate?: string;
    storeId?: string;
};

const RevenueReportBrand = () => {
    const dispatch = useAppDispatch();

    const [, newMonth, newYear] = (formatAnyDate(new Date()) ?? '').split('-');

    useEffect(() => {
        const dateParams = `Month=${newMonth}&Year=${newYear}`;
        dispatch(getBestSellingOfBrand({data: dateParams }))
        dispatch(getAllStore())
    }, [dispatch, newMonth, newYear])

    const handleSubmitBestSellingOfBrandForm = (data: BestSellingFormData, action: string) => {
        if (action === 'month') {
            if (data.monthYear) {
                const [year, month] = data.monthYear.split('-');
                if(data.storeId !== ''){
                    dispatch(getBestSellingOfBrand({ data: `Month=${month}&Year=${year}&StoreId=${data.storeId}` }));
                }else{
                    dispatch(getBestSellingOfBrand({ data: `Month=${month}&Year=${year}` }));
                }
            }
        } else if (action === 'aboutTime') {
            if (data.startDate && data.endDate) {
                if(data.storeId !== ''){
                    dispatch(getBestSellingOfBrand({
                        data: `StartDate=${formatMMDDYYYYDate(new Date(data?.startDate))}&EndDate=${formatMMDDYYYYDate(new Date(data?.endDate))}&StoreId=${data.storeId}`
                    }));
                }else{
                    dispatch(getBestSellingOfBrand({
                        data: `StartDate=${formatMMDDYYYYDate(new Date(data?.startDate))}&EndDate=${formatMMDDYYYYDate(new Date(data?.endDate))}`
                    }));
                }
            }
        } else if (action === 'specificDate') {
            if (data.specificDate) {
                if(data.storeId !== ''){
                    dispatch(getBestSellingOfBrand({
                        data: `SpecificDate=${formatMMDDYYYYDate(new Date(data?.specificDate))}&StoreId=${data.storeId}`
                    }));
                }else{
                    dispatch(getBestSellingOfBrand({
                        data: `SpecificDate=${formatMMDDYYYYDate(new Date(data?.specificDate))}`
                    }));
                }
            }
        } else if (action === 'year') {
            if (data.year) {
                if(data.storeId !== ''){
                    dispatch(getBestSellingOfBrand({
                        data: `Year=${data.year}&StoreId=${data.storeId}`
                    }));
                }else{
                    dispatch(getBestSellingOfBrand({
                        data: `Year=${data.year}`
                    }));
                }
            }
        }
    }

    return (
        <div className='flex flex-col overflow-y-auto'>
            <BestSellingOfBrand onSubmit={handleSubmitBestSellingOfBrandForm} />
        </div>
    )
}

export default RevenueReportBrand