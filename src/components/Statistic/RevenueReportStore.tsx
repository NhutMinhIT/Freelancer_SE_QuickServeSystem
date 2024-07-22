import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RevenueReportStore = () => {
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [3000000, 2500000, 3200000, 4000000, 4500000, 5000000, 4800000, 5200000, 5300000, 6000000, 6500000, 7000000],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Số lượng đơn hàng',
                data: [30, 25, 32, 40, 45, 50, 48, 52, 53, 60, 65, 70],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
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
        <div className='flex flex-col overflow-y-auto'>
            <div className='mt-4'>
                <h2 className='text-xl text-black font-bold'>Thống kê chi tiết</h2>
                <div className='flex flex-row mt-4 gap-10'>
                    <div className='border border-gray-400 w-72 flex flex-col p-4 rounded-lg shadow-md'>
                        <span className='text-xl font-semibold text-gray-700'>Tổng tất cả đơn hàng:</span>
                        <span className='text-xl font-semibold text-blue-600'>100</span>
                    </div>
                    <div className='border border-gray-400 w-72 flex flex-col p-4 rounded-lg shadow-md'>
                        <span className='text-xl font-semibold text-gray-700'>Tổng tất cả doanh thu:</span>
                        <span className='text-xl font-semibold text-green-600'>100</span>
                    </div>
                </div>
                <div className="mt-3 flex flex-row py-2">
                    <div className='flex flex-grow  gap-4'>
                        <div className="w-3/4">
                            <Bar data={data} options={options} />
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <form id="form-normal-chart" className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2 mb-4">
                                <label htmlFor="normal-search-chart" className="mb-2 font-semibold">Tìm kiếm theo tháng</label>
                                <input type="month" id="normal-search-chart" name="normal-search-chart" className="border border-gray-500 rounded-md p-2 w-full" />
                                <button className="p-3 bg-orange-500 rounded-md mt-2 w-full">Tìm kiếm</button>
                            </form>
                            <form id="form-advanced-chart" className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2">
                                <span className="mb-2 font-semibold">Tìm kiếm theo khoảng thời gian</span>
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col">
                                        <label htmlFor="start-date-chart" className="font-bold">Từ</label>
                                        <input type="date" id="start-date-chart" name="start-date-chart" className="border border-gray-500 rounded-md p-2 w-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="end-date-chart" className="font-bold">Đến</label>
                                        <input type="date" id="end-date-chart" name="end-date-chart" className="border border-gray-500 rounded-md p-2 w-full" />
                                    </div>
                                </div>
                                <button className="p-3 bg-orange-500 rounded-md mt-2 w-full">Tìm kiếm</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <h2 className='text-xl text-black font-bold'>Sản phẩm bán chạy</h2>
                <div className="mt-3 flex flex-row py-2 gap-4">
                    <div className='flex flex-grow gap-2'>
                        <div className="w-3/4 grid grid-cols-3 gap-3">
                            {/* Thêm các sản phẩm khác tương tự ở đây */}
                            <div className="bg-white border border-gray-900 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg" src="https://lamsonfood.com/wp-content/uploads/2022/02/com-tam-duoc-nhieu-nguoi-yeu-thich.jpg" alt="" />
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Cơm Tấm Đầy Đủ</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Giá sản phẩm:</span>
                                        <span className="ml-2">50.000 VND</span>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Đã bán:</span>
                                        <span className="ml-2">100</span>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Doanh thu:</span>
                                        <span className="ml-2">5.000.000 VND</span>
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-900 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg" src="https://lamsonfood.com/wp-content/uploads/2022/02/com-tam-duoc-nhieu-nguoi-yeu-thich.jpg" alt="" />
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Cơm Tấm Đầy Đủ</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Giá sản phẩm:</span>
                                        <span className="ml-2">50.000 VND</span>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Đã bán:</span>
                                        <span className="ml-2">100</span>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Doanh thu:</span>
                                        <span className="ml-2">5.000.000 VND</span>
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-900 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg" src="https://lamsonfood.com/wp-content/uploads/2022/02/com-tam-duoc-nhieu-nguoi-yeu-thich.jpg" alt="" />
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Cơm Tấm Đầy Đủ</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Giá sản phẩm:</span>
                                        <span className="ml-2">50.000 VND</span>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Đã bán:</span>
                                        <span className="ml-2">100</span>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                        <span className="font-bold">Doanh thu:</span>
                                        <span className="ml-2">5.000.000 VND</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/4">
                            <form id="form-normal" className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2 mb-4">
                                <label htmlFor="normal-search" className="mb-2 font-semibold">Tìm kiếm theo tháng</label>
                                <input type="month" id="normal-search" name="normal-search" className="border border-gray-500 rounded-md p-2 w-full" />
                                <button className="p-3 bg-orange-500 rounded-md mt-2 w-full">Tìm kiếm</button>
                            </form>
                            <form id="form-advanced" className="flex flex-col items-start border-2 border-black-500 rounded-lg p-2">
                                <label htmlFor="advanced-search" className="mb-2 font-semibold">Tìm kiếm theo khoảng thời gian</label>
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col">
                                        <label htmlFor="start-date" className="font-bold">Từ</label>
                                        <input type="date" id="start-date" name="start-date" className="border border-gray-500 rounded-md p-2 w-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="end-date" className="font-bold">Đến</label>
                                        <input type="date" id="end-date" name="end-date" className="border border-gray-500 rounded-md p-2 w-full" />
                                    </div>
                                </div>
                                <button className="p-3 bg-orange-500 rounded-md mt-2 w-full">Tìm kiếm</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueReportStore;
