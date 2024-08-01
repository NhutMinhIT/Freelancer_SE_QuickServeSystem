import { useEffect } from "react";
import { getBestSellingOfBrand } from "../../../services/features/revenueSlice";
import { useAppDispatch } from "../../../services/store/store";
import { formatMMDDYYYYDate } from "../../../utils";
import BestSellingOfBrand from "./BestSellingOfBrand";

type BestSellingFormData = {
    specificDate?: string;
    monthYear?: string;
    year?: string;
    startDate?: string;
    endDate?: string;
};

const RevenueReportBrand = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBestSellingOfBrand({ data: `Month=08&Year=2024` }))
    }, [dispatch])

    const handleSubmitBestSellingOfBrandForm = (data: BestSellingFormData, action: string) => {
        if (action === 'month') {
            if (data.monthYear) {
                const [year, month] = data.monthYear.split('-');
                dispatch(getBestSellingOfBrand({ data: `Month=${month}&Year=${year}` }));
            }
        } else if (action === 'aboutTime') {
            if (data.startDate && data.endDate) {
                dispatch(getBestSellingOfBrand({
                    data: `StartDate=${formatMMDDYYYYDate(new Date(data?.startDate))}&EndDate=${formatMMDDYYYYDate(new Date(data?.endDate))}`
                }));
            }
        } else if (action === 'specificDate') {
            if (data.specificDate) {
                dispatch(getBestSellingOfBrand({
                    data: `SpecificDate=${formatMMDDYYYYDate(new Date(data?.specificDate))}`
                }));
            }
        } else if (action === 'year') {
            if (data.year) {
                dispatch(getBestSellingOfBrand({
                    data: `Year=${data.year}`
                }));
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