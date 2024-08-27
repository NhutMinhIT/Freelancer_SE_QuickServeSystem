import { useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../services/store/store";
import { CircularProgress } from '@mui/material';
import { formatAnyDate } from "../../../utils";
import BestSellingProduct from "./BestSellingProduct";
import BestSellingIngredient from "./BestSellingIngredient";

type BestSellingProps = {
  onSubmit: (data: any, action: string) => void;
};

type FormBestSellingValues = {
  specificDate: string;
  monthYear: string,
  year: string,
  startDate: string;
  endDate: string;

}

const BestSelling = ({ onSubmit }: BestSellingProps) => {
  const [showForm, setShowForm] = useState('month');
  const [, newMonth, newYear] = (formatAnyDate(new Date()) ?? '').split('-');
  const [tab, setTab] = useState(1);

  const { loadingBestSelling } = useAppSelector(state => state.revenues)
  const { register, handleSubmit, formState: { errors } } = useForm<FormBestSellingValues>({
    defaultValues: {
      monthYear: `${newYear}-${newMonth}`,
    }
  });

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
};

  const handleChange = (event: SelectChangeEvent) => {
    setShowForm(event.target.value as string);
  };

  const onSubmitForm = (data: FormBestSellingValues) => {
    const action = (document.activeElement as HTMLButtonElement)?.value;
    onSubmit(data, action);
  }

  return (
    <div className='mt-8 mr-2'>
      <h2 className='text-xl text-black font-bold'>Thống kê bán chạy</h2>
      <Grid container spacing={3} mb={2}>
        <Grid item md={9}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab value={1} label="Sản phẩm bán chạy" />
            <Tab value={2} label="Nguyên liệu bán chạy" />
          </Tabs>
          {tab === 1 && (
            <BestSellingProduct />
          )}
          {tab === 2 && (
            <BestSellingIngredient />
          )}
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
                  <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="specificDate" value="specificDate" disabled={loadingBestSelling}>
                    {loadingBestSelling ? <CircularProgress size={24} /> : 'Tìm kiếm'}
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
                  <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="month" value="month" disabled={loadingBestSelling}>
                    {loadingBestSelling ? <CircularProgress size={24} /> : 'Tìm kiếm'}
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
                  <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="year" value="year" disabled={loadingBestSelling}>
                    {loadingBestSelling ? <CircularProgress size={24} /> : 'Tìm kiếm'}
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
                  <button className="p-3 bg-orange-500 rounded-md mt-2 w-full" type="submit" name="aboutTime" value="aboutTime" disabled={loadingBestSelling}>
                    {loadingBestSelling ? <CircularProgress size={24} /> : 'Tìm kiếm'}
                  </button>
                </div>
              )}
            </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default BestSelling;
