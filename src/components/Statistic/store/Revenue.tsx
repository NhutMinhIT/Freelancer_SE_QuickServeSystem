import { Bar } from 'react-chartjs-2';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../services/store/store';
import { formatNumberWithDots } from '../../../utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type RevenueProps = {
    onSubmit: (data: any, action: string) => void;
};

type FormRevenueValues = {
    specificDate?: string;
    monthYear: string,
    year?: string;
    startDate: string;
    endDate: string;
}

const Revenue = ({ onSubmit }: RevenueProps) => {
    const [showForm, setShowForm] = useState('month');

    const revenueOfStore = useAppSelector(state => state.revenues.revenueOfStore);

    const handleChange = (event: SelectChangeEvent) => {
        setShowForm(event.target.value as string);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormRevenueValues>({
        defaultValues: {
            monthYear: '2024-07',
        }
    });


    const onSubmitForm = (data: FormRevenueValues) => {
        const action = (document.activeElement as HTMLButtonElement)?.value;
        onSubmit(data, action);
    }

    const dataRevenue = {
        labels: ['Tháng'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [revenueOfStore?.totalRevenue || 0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barThickness: 30, // Adjust this value to make bars thinner
                maxBarThickness: 30, // You can also set a maximum thickness
            },
        ],
    };

    const dataOrder = {
        labels: ['Tháng'],
        datasets: [
            {
                label: 'Số lượng đơn hàng',
                data: [revenueOfStore?.totalOrderCount || 0],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                barThickness: 30,
                maxBarThickness: 30,
            }
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='mt-4 mr-2'>
            <h2 className='text-xl text-black font-bold'>Thống kê chi tiết</h2>
            <div className='flex flex-row mt-4 gap-10'>
                <div className='border border-gray-400 w-72 flex flex-col p-4 rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Đơn hàng cụ thể:</span>
                    <span className='text-xl font-semibold text-green-600'>{formatNumberWithDots(revenueOfStore?.specificOrderCount)}</span>
                </div>
                <div className='border border-gray-400 w-72 flex flex-col p-4 rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Doanh thu cụ thể:</span>
                    <span className='text-xl font-semibold text-green-600'>{formatNumberWithDots(revenueOfStore?.specificRevenue)} đ</span>
                </div>
                <div className='border border-gray-400 w-72 flex flex-col p-4 rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Tổng tất cả đơn hàng:</span>
                    <span className='text-xl font-semibold text-blue-600'>{formatNumberWithDots(revenueOfStore?.totalOrderCount)}</span>
                </div>
                <div className='border border-gray-400 w-72 flex flex-col p-4 rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Tổng tất cả doanh thu:</span>
                    <span className='text-xl font-semibold text-green-600'>{formatNumberWithDots(revenueOfStore?.totalRevenue)} đ</span>
                </div>
            </div>
            <div className="mt-3 flex flex-row py-2">
                <div className='flex flex-grow gap-4'>
                    <div className="w-3/4">
                        <Bar data={dataRevenue} options={options} />
                    </div>
                    <div className="w-3/4">
                        <Bar data={dataOrder} options={options} />
                    </div>
                    <div className='flex flex-col w-2/4'>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Tìm kiếm</InputLabel>
                            <Select
                                value={showForm}
                                label="search-in-chart"
                                onChange={handleChange}
                            >
                                <MenuItem value={'specificDate'}>Theo ngày cụ thể</MenuItem>
                                <MenuItem value={'month'}>Theo tháng</MenuItem>
                                <MenuItem value={'year'}>Theo năm</MenuItem>
                                <MenuItem value={'aboutTime'}>Theo khoảng thời gian</MenuItem>
                            </Select>
                        </FormControl>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            {showForm === 'month' && (
                                <div className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2 mb-4">
                                    <label htmlFor="normal-search-chart" className="mb-2 font-semibold">Tìm kiếm theo tháng</label>
                                    <input
                                        type="month"
                                        id="normal-search-chart"
                                        {...register("monthYear", { required: "Vui lòng chọn tháng" })}
                                        className="border border-gray-500 rounded-md p-2 w-full" />
                                    <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="month" value="month">Tìm kiếm</button>
                                </div>
                            )}
                            {showForm === 'specificDate' && (
                                <div className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2">
                                    <span className="mb-2 font-semibold">Tìm kiếm theo ngày cụ thể</span>
                                    <input
                                        type="date"
                                        {...register("specificDate", { required: "Vui lòng chọn ngày" })}
                                        className="border border-gray-500 rounded-md p-2 w-full"
                                    />
                                    {errors.specificDate && <span className="text-red-500">{errors.specificDate.message}</span>}
                                    <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="specificDate" value="specificDate">Tìm kiếm</button>
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
                                    <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="year" value="year">Tìm kiếm</button>
                                </div>
                            )}
                            {showForm === 'aboutTime' && (
                                <div className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2">
                                    <span className="mb-2 font-semibold">Tìm kiếm theo khoảng thời gian</span>
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="flex flex-col">
                                            <label htmlFor="start-date-chart" className="font-bold">Từ</label>
                                            <input
                                                type="date"
                                                id="start-date-chart"
                                                {...register("startDate", { required: "Vui lòng chọn ngày bắt đầu" })}
                                                className="border border-gray-500 rounded-md p-2 w-full"
                                            />
                                        </div>
                                        {errors.startDate && <span className="text-red-500">{errors.startDate.message}</span>}
                                        <div className="flex flex-col">
                                            <label htmlFor="end-date-chart" className="font-bold">Đến</label>
                                            <input
                                                type="date"
                                                id="end-date-chart"
                                                {...register("endDate", { required: "Vui lòng chọn ngày kết thúc" })}
                                                className="border border-gray-500 rounded-md p-2 w-full"
                                            />
                                        </div>
                                        {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}
                                    </div>
                                    <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="aboutTime" value="aboutTime">Tìm kiếm</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Revenue