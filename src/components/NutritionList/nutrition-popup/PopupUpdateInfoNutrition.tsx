import { XMarkIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { schemaNutrition } from "../../../schemas/schemaNutrition";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { getAllNutritions, updateInforNutrition } from "../../../services/features/nutritionSlice";


type PopupUpdateNutritionProps = {
    open: boolean;
    closePopup: () => void;
    onClosePopupDetail: () => void;
}


type FormUpdateNutritionValues = {
    id:number,
    name: string;
    description: string;
    vitamin: string;
    healthValue: string;
}


const PopupUpdateNutrition: React.FC<PopupUpdateNutritionProps> = ({
    open,
    closePopup,
    onClosePopupDetail,
})=> {
    const dispatch = useAppDispatch();



  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormUpdateNutritionValues>({
        resolver: yupResolver(schemaNutrition) as unknown as Resolver<FormUpdateNutritionValues>,
    });

    const {nutrition , loading} = useAppSelector((state) => state.nutritions)


    useEffect(() => {
        if (nutrition) {
            setValue('name', nutrition?.name);
            setValue('description', nutrition?.description);
            setValue('vitamin', nutrition?.vitamin);
            setValue('healthValue', nutrition?.healthValue);
            setValue("id", nutrition?.id)
        }
    }, [nutrition, setValue])




  const onSubmit = (data: FormUpdateNutritionValues) => {
        dispatch(updateInforNutrition(data))
            .unwrap()
            .then(() => {
                dispatch(getAllNutritions());
                closePopup();
                onClosePopupDetail();
                reset();
            })
            .catch((error) => console.log(error))
            // .finally(() => setIsLoading(false));
        console.log("123");
        
    }

  return (
       open &&  (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="px-2 relative bg-white border rounded-lg shadow-lg bg-white-400 overflow-y-scroll lg:h-[500px] lg:w-[500px] w-auto h-auto">
                    <button
                        onClick={closePopup}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <XMarkIcon width={24} height={24} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4 mt-2">Cập nhật dinh dưỡng</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                        <input
                                {...register('id')}
                                type="hidden"
                                name="id"
                                required
                                id="id"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên dinh dưỡng</label>
                            <input
                                {...register('name')}
                                type="text"
                                name="name"
                                required
                                id="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.name && <p className='text-red-500 text-xs mt-2'>* {errors.name.message}</p>}
                        </div>

                         <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả dinh dưỡng</label>
                            <textarea
                                {...register('description')}
                                name="description"
                                id="description"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.description && <p className='text-red-500 text-xs mt-2'>* {errors.description.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="vitamin" className="block text-sm font-medium text-gray-700">Vitamin</label>
                            <input
                                {...register('vitamin')}
                                type="text"
                                name="vitamin"
                                id="vitamin"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.vitamin && <p className='text-red-500 text-xs mt-2'>* {errors.vitamin.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="healthValue" className="block text-sm font-medium text-gray-700">Giá trị sức khỏe</label>
                            <input
                                {...register('healthValue')}
                                type="text"
                                name="healthValue"
                                id="healthValue"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.healthValue && <p className='text-red-500 text-xs mt-2'>* {errors.healthValue.message}</p>}
                        </div>
                       
                        

                        {/* Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    'Cập nhật'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}
export default PopupUpdateNutrition