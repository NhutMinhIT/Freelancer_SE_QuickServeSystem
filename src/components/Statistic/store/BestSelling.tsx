import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../services/store/store";

type BestSellingProps = {
  onSubmit: (data: any, action: string) => void;
};

type FormBestSellingValues = {
    monthYear: string,
    startDate: string;
    endDate: string;
}

const BestSelling = ({ onSubmit }: BestSellingProps) => {
  const [showForm, setShowForm] = useState('month');

  const bestSellingOfStore = useAppSelector(state => state.revenues.bestSellingOfStore)  

  const { register, handleSubmit, formState: { errors } } = useForm<FormBestSellingValues>({
    defaultValues: {
        monthYear: '2024-07',
    }
  });

  const handleChange = (event: SelectChangeEvent) => {
    setShowForm(event.target.value as string);
  };

  const onSubmitForm = (data: FormBestSellingValues) => {
    const action = (document.activeElement as HTMLButtonElement)?.value;
    onSubmit(data, action);
  }

  return (
    <div className='mt-8 mr-2'>
      <h2 className='text-xl text-black font-bold'>Sản phẩm bán chạy</h2>
      <div className="mt-3 flex flex-row py-2 gap-4">
        <div className='flex flex-grow gap-2'>
          <div className="w-3/4 grid grid-cols-3 gap-3">
            {/* Thêm các sản phẩm khác tương tự ở đây */}
            {bestSellingOfStore?.length === 0 && (
                <h1>Không có sản phẩm nào!</h1>
            )}
            {bestSellingOfStore && bestSellingOfStore[0]?.bestSellingProductTemplates?.map((data: any) => (
              <div className="bg-white border border-gray-900 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={data?.id}>
                <img className="rounded-t-lg" src={data?.urlImage} alt="" />
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{data?.name}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                    <span className="font-bold">Giá sản phẩm:</span>
                    <span className="ml-2">{data?.price}</span>
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                    <span className="font-bold">Đã bán:</span>
                    <span className="ml-2">{data?.sellingQuantity}</span>
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                    <span className="font-bold">Doanh thu:</span>
                    <span className="ml-2">{data?.totalRevenue}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-1/4">
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tìm kiếm</InputLabel>
              <Select
                value={showForm}
                label="Tìm kiếm"
                onChange={handleChange}
              >
                <MenuItem value={'month'}>Theo tháng</MenuItem>
                <MenuItem value={'aboutTime'}>Theo khoảng thời gian</MenuItem>
              </Select>
            </FormControl>
            <form onSubmit={handleSubmit(onSubmitForm)}>
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
                  <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="month" value="month">Tìm kiếm</button>
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

export default BestSelling;