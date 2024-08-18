
import { useAppDispatch } from '../../../services/store/store';
import { getRevenueOfAdmin,  } from '../../../services/features/revenueSlice';
import { formatAnyDate, formatMMDDYYYYDate } from '../../../utils';
import { useEffect } from 'react';
import Revenue from './Revenue';

type RevenueFormData = {
    specificDate?: string;
    monthYear?: string;
    year?: string;
    startDate?: string;
    endDate?: string;
};

const RevenueReportAdmin = () => {
    const dispatch = useAppDispatch();

    const [, newMonth, newYear] = (formatAnyDate(new Date()) ?? '').split('-');

    useEffect(() => {
        const dateParams = `Month=${newMonth}&Year=${newYear}`;
        dispatch(getRevenueOfAdmin({ data: dateParams }))
    }, [dispatch, newMonth, newYear])

    const handleSubmitRevenueForm = (data: RevenueFormData, action: string) => {
        if (action === 'month') {
            if (data.monthYear) {
                const [year, month] = data.monthYear.split('-');
                dispatch(getRevenueOfAdmin({ data: `Month=${month}&Year=${year}` }));
            }
        } else if (action === 'aboutTime') {
            if (data.startDate && data.endDate) {
                dispatch(getRevenueOfAdmin({
                    data: `StartDate=${formatMMDDYYYYDate(new Date(data?.startDate))}&EndDate=${formatMMDDYYYYDate(new Date(data?.endDate))}`
                }));
            }
        } else if (action === 'specificDate') {
            if (data.specificDate) {
                dispatch(getRevenueOfAdmin({
                    data: `SpecificDate=${formatMMDDYYYYDate(new Date(data?.specificDate))}`
                }));
            }
        } else if (action === 'year') {
            if (data.year) {
                dispatch(getRevenueOfAdmin({
                    data: `Year=${data.year}`
                }));
            }
        }
    }

    return (
        <div className='flex flex-col overflow-y-auto'>
            <Revenue onSubmit={handleSubmitRevenueForm} />
        </div>
    );
};

export default RevenueReportAdmin;
