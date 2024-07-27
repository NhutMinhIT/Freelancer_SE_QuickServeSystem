import Revenue from './store/Revenue';
import BestSelling from './store/BestSelling';
import { useAppDispatch } from '../../services/store/store';
import { getBestSellingOfStore, getRevenueOfStore } from '../../services/features/revenueSlice';
import { formatMMDDYYYYDate } from '../../utils';
import { useEffect } from 'react';

type BestSellingFormData = {
    specificDate?: string;
    monthYear?: string;
    year?: string;
    startDate?: string;
    endDate?: string;
};

const RevenueReportStore = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRevenueOfStore({ data: `Month=07&Year=2024` }))
        dispatch(getBestSellingOfStore({ data: `Month=07&Year=2024` }))
    }, [dispatch])

    const handleSubmitRevenueForm = (data: BestSellingFormData, action: string) => {
        if (action === 'month') {
            if (data.monthYear) {
                const [year, month] = data.monthYear.split('-');
                dispatch(getRevenueOfStore({ data: `Month=${month}&Year=${year}` }));
            }
        } else if (action === 'aboutTime') {
            if (data.startDate && data.endDate) {
                dispatch(getRevenueOfStore({
                    data: `StartDate=${formatMMDDYYYYDate(new Date(data?.startDate))}&EndDate=${formatMMDDYYYYDate(new Date(data?.endDate))}`
                }));
            }
        } else if (action === 'specificDate') {
            if (data.specificDate) {
                dispatch(getRevenueOfStore({
                    data: `SpecificDate=${formatMMDDYYYYDate(new Date(data?.specificDate))}`
                }));
            }
        } else if (action === 'year') {
            if (data.year) {
                dispatch(getRevenueOfStore({
                    data: `Year=${data.year}`
                }));
            }
        }

    }

    const handleSubmitBestSellingForm = (data: BestSellingFormData, action: string) => {
        if (action === 'month') {
            if (data.monthYear) {
                const [year, month] = data.monthYear.split('-');
                dispatch(getBestSellingOfStore({ data: `Month=${month}&Year=${year}` }));
            }
        } else if (action === 'aboutTime') {
            if (data.startDate && data.endDate) {
                dispatch(getBestSellingOfStore({
                    data: `StartDate=${formatMMDDYYYYDate(new Date(data?.startDate))}&EndDate=${formatMMDDYYYYDate(new Date(data?.endDate))}`
                }));
            }
        } else if (action === 'specificDate') {
            if (data.specificDate) {
                dispatch(getBestSellingOfStore({
                    data: `SpecificDate=${formatMMDDYYYYDate(new Date(data?.specificDate))}`
                }));
            }
        } else if (action === 'year') {
            if (data.year) {
                dispatch(getBestSellingOfStore({
                    data: `Year=${data.year}`
                }));
            }
        }
    }

    return (
        <div className='flex flex-col overflow-y-auto'>
            <Revenue onSubmit={handleSubmitRevenueForm} />
            <BestSelling onSubmit={handleSubmitBestSellingForm} />
        </div>
    );
};

export default RevenueReportStore;
