import { useState } from "react";
import { useAppSelector } from "../../../services/store/store";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { formatAnyDate } from "../../../utils";
import AccountCard from "./AccountCard";

type StaticProps = {
    onSubmit: (data: any, action: string) => void;
};
type FormStaticValues = {
    specificDate: string;
    monthYear: string,
    year: string,
    startDate: string;
    endDate: string;
    storeId: string;
}

const StaticForm = ({ onSubmit }: StaticProps) => {
    const [showForm, setShowForm] = useState('month');
    const [, newMonth, newYear] = (formatAnyDate(new Date()) ?? '').split('-');

    const { loadingAcc } = useAppSelector(state => state.revenues)

    const { stores } = useAppSelector(state => state.stores)

    const { register, handleSubmit, formState: { errors }, control } = useForm<FormStaticValues>({
        defaultValues: {
            monthYear: `${newYear}-${newMonth}`,
            storeId: "",
        }
    });
    const handleChange = (event: SelectChangeEvent) => {
        setShowForm(event.target.value as string);
    };

    const onSubmitForm = (data: FormStaticValues) => {
        const action = (document.activeElement as HTMLButtonElement)?.value;
        onSubmit(data, action);
    }
    return (
        <div className='mt-8 mr-2'>
            <Grid container spacing={3}>

                <Grid item md={9}>
                    <AccountCard />
                </Grid>
                <Grid item md={3}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Tìm kiếm</InputLabel>
                        <Select
                            value={showForm}
                            label="Tìm kiếm"
                            onChange={handleChange}
                        >
                            <MenuItem value={'specificDate'}>Theo ngày</MenuItem>
                            <MenuItem value={'month'}>Theo tháng</MenuItem>
                            <MenuItem value={'year'}>Theo năm</MenuItem>
                            <MenuItem value={'aboutTime'}>Theo khoảng thời gian</MenuItem>
                        </Select>
                    </FormControl>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel shrink>Cửa hàng</InputLabel>
                            <Controller
                                name="storeId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Cửa hàng"
                                        {...field}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            Tất cả
                                        </MenuItem>
                                        {stores && stores.map((store) => (
                                            <MenuItem value={store.id}>{store.name}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        {showForm === 'specificDate' && (
                            <div className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2 mb-4">
                                <label htmlFor="date" className="mb-2 font-semibold">Tìm kiếm theo ngày</label>
                                <input
                                    type="date"
                                    id="date"
                                    {...register("specificDate", { required: "Vui lòng chọn ngày" })}
                                    className="border border-gray-500 rounded-md p-2 w-full"
                                />
                                {errors.specificDate && <span className="text-red-500">{errors.specificDate.message}</span>}
                                <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="specificDate" value="specificDate" disabled={loadingAcc}>
                                    {loadingAcc ? <CircularProgress size={24} /> : 'Tìm kiếm'}
                                </button>
                            </div>
                        )}
                        {showForm === 'month' && (
                            <div className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2 mb-4">
                                <label htmlFor="normal-search" className="mb-2 font-semibold">Tìm kiếm theo tháng</label>
                                <input
                                    type="month"
                                    id="normal-search"
                                    {...register("monthYear", { required: "Vui lòng chọn tháng" })}
                                    className="border border-gray-500 rounded-md p-2 w-full"
                                />
                                {errors.monthYear && <span className="text-red-500">{errors.monthYear.message}</span>}
                                <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="month" value="month" disabled={loadingAcc}>
                                    {loadingAcc ? <CircularProgress size={24} /> : 'Tìm kiếm'}
                                </button>
                            </div>
                        )}
                        {showForm === 'year' && (
                            <div className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2 mb-4">
                                <label htmlFor="year" className="mb-2 font-semibold">Tìm kiếm theo năm</label>
                                <select
                                    id="year"
                                    {...register("year", { required: "Vui lòng chọn năm" })}
                                    className="border border-gray-500 rounded-md p-2 w-full"
                                >
                                    <option value="">Chọn năm</option>
                                    {Array.from({ length: 10 }, (_, i) => 2019 + i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                {errors.year && <span className="text-red-500">{errors.year.message}</span>}
                                <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="year" value="year" disabled={loadingAcc}>
                                    {loadingAcc ? <CircularProgress size={24} /> : 'Tìm kiếm'}
                                </button>
                            </div>
                        )}
                        {showForm === 'aboutTime' && (
                            <div className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2">
                                <label htmlFor="advanced-search" className="mb-2 font-semibold">Tìm kiếm theo khoảng thời gian</label>
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col">
                                        <label htmlFor="start-date" className="font-bold">Từ</label>
                                        <input
                                            type="date"
                                            id="start-date"
                                            {...register("startDate", { required: "Vui lòng chọn ngày bắt đầu" })}
                                            className="border border-gray-500 rounded-md p-2 w-full"
                                        />
                                        {errors.startDate && <span className="text-red-500">{errors.startDate.message}</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="end-date" className="font-bold">Đến</label>
                                        <input
                                            type="date"
                                            id="end-date"
                                            {...register("endDate", { required: "Vui lòng chọn ngày kết thúc" })}
                                            className="border border-gray-500 rounded-md p-2 w-full"
                                        />
                                        {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}
                                    </div>
                                </div>
                                <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="aboutTime" value="aboutTime" disabled={loadingAcc}>
                                    {loadingAcc ? <CircularProgress size={24} /> : 'Tìm kiếm'}
                                </button>
                            </div>
                        )}
                    </form>
                </Grid>
            </Grid>

        </div>
    )
}

export default StaticForm
