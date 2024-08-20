import { useEffect } from "react";
import { useAppDispatch } from "../../../services/store/store";
import { formatAnyDate, formatMMDDYYYYDate } from "../../../utils";
import { getAllStore } from "../../../services/features/storeSlice";
import { getAccountStatic } from "../../../services/features/revenueSlice";
import StaticForm from "./StaticsForm";

type FormData = {
    specificDate?: string;
    monthYear?: string;
    year?: string;
    startDate?: string;
    endDate?: string;
    storeId?: string;
};

const Statics = () => {
    const dispatch = useAppDispatch();

    const [, newMonth, newYear] = (formatAnyDate(new Date()) ?? '').split('-');

    useEffect(() => {
        const dateParams = `Month=${newMonth}&Year=${newYear}`;
        dispatch(getAccountStatic({ data: dateParams }))
        dispatch(getAllStore())
    }, [dispatch, newMonth, newYear])

    const handleSubmitForm = (data: FormData, action: string) => {
        if (action === 'month') {
            if (data.monthYear) {
                const [year, month] = data.monthYear.split('-');
                if (data.storeId !== '') {
                    dispatch(getAccountStatic({ data: `Month=${month}&Year=${year}&StoreId=${data.storeId}` }));
                } else {
                    dispatch(getAccountStatic({ data: `Month=${month}&Year=${year}` }));
                }
            }
        } else if (action === 'aboutTime') {
            if (data.startDate && data.endDate) {
                if (data.storeId !== '') {
                    dispatch(getAccountStatic({
                        data: `StartDate=${formatMMDDYYYYDate(new Date(data?.startDate))}&EndDate=${formatMMDDYYYYDate(new Date(data?.endDate))}&StoreId=${data.storeId}`
                    }));
                } else {
                    dispatch(getAccountStatic({
                        data: `StartDate=${formatMMDDYYYYDate(new Date(data?.startDate))}&EndDate=${formatMMDDYYYYDate(new Date(data?.endDate))}`
                    }));
                }
            }
        } else if (action === 'specificDate') {
            if (data.specificDate) {
                if (data.storeId !== '') {
                    dispatch(getAccountStatic({
                        data: `SpecificDate=${formatMMDDYYYYDate(new Date(data?.specificDate))}&StoreId=${data.storeId}`
                    }));
                } else {
                    dispatch(getAccountStatic({
                        data: `SpecificDate=${formatMMDDYYYYDate(new Date(data?.specificDate))}`
                    }));
                }
            }
        } else if (action === 'year') {
            if (data.year) {
                if (data.storeId !== '') {
                    dispatch(getAccountStatic({
                        data: `Year=${data.year}&StoreId=${data.storeId}`
                    }));
                } else {
                    dispatch(getAccountStatic({
                        data: `Year=${data.year}`
                    }));
                }
            }
        }
    }
    return (
        <div>
            <StaticForm onSubmit={handleSubmitForm} />
        </div>
    )
}

export default Statics