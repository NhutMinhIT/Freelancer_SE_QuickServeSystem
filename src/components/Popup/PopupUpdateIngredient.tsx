import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { IIngredientType } from "../../models/Ingredient";
import { getAllIngredientTypes } from "../../services/features/ingredientTypeSlice";
import { getAllIngredients, updateIngredientById } from "../../services/features/ingredientSlice";
import { schemaUpdateIngredient } from "../../schemas/shcemaIngredient";

type PopupUpdateIngredientProps = {
    open: boolean;
    closePopup: () => void;
    onClosePopupDetail: () => void;
}

type FormUpdateIngredientValues = {
    name: string;
    price: number;
    calo: number;
    description: string;
    ingredientTypeId: number;
}

const PopupUpdateIngredient: React.FC<PopupUpdateIngredientProps> = ({
    open,
    closePopup,
    onClosePopupDetail,
}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    
    const { ingredientTypes } = useAppSelector((state) => state.ingredientTypes);
    const  ingredientData  = useAppSelector((state) => state.ingredients.ingredient);
    const [ingredientTypeData, setIngredientTypeData] = useState<IIngredientType[] | null>(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormUpdateIngredientValues>({
        resolver: yupResolver(schemaUpdateIngredient) as unknown as Resolver<FormUpdateIngredientValues>,
    });

    useEffect(() => {
        dispatch(getAllIngredientTypes());
    }, [dispatch]);

    useEffect(() => {
        setIngredientTypeData(ingredientTypes);
    }, [ingredientTypes]);

    useEffect(() => {
        if(ingredientData){
            setValue('name', ingredientData?.name);
            setValue('price', ingredientData?.price);
            setValue('calo', ingredientData?.calo);
            setValue('description', ingredientData?.description);
            setValue('ingredientTypeId', ingredientData?.ingredientTypeId);
        }
    }, [ingredientData, setValue])

    const onSubmit = (data: FormUpdateIngredientValues) => {
        setIsLoading(true);              

        dispatch(updateIngredientById({id: ingredientData?.id, data}))
            .unwrap()
            .then(() => {
                dispatch(getAllIngredients());
                closePopup();
                onClosePopupDetail();
                reset();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }

    return (
        open && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="px-2 relative bg-white border rounded-lg shadow-lg bg-white-400 overflow-y-scroll lg:h-[500px] lg:w-[500px] w-auto h-auto">
                    <button
                        onClick={closePopup}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <XMarkIcon width={24} height={24} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4 mt-2">Cập nhật nguyên liệu</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên nguyên liệu</label>
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
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá Nguyên Liệu</label>
                            <input
                                {...register('price')}
                                type="number"
                                name="price"
                                id="price"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.price && <p className='text-red-500 text-xs mt-2'>* {errors.price.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="calo" className="block text-sm font-medium text-gray-700">Calo Nguyên Liệu</label>
                            <input
                                {...register('calo')}
                                type="number"
                                name="calo"
                                id="calo"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.calo && <p className='text-red-500 text-xs mt-2'>* {errors.calo.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả nguyên liệu</label>
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
                            <label htmlFor="ingredientTypeId" className="block text-sm font-medium text-gray-700">Loại nguyên liệu</label>
                            <select
                                {...register('ingredientTypeId')}
                                name="ingredientTypeId"
                                id="ingredientTypeId"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                                <option value="">Chọn loại nguyên liệu</option>
                                {ingredientTypeData && ingredientTypeData.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                            {errors.ingredientTypeId && <p className='text-red-500 text-xs mt-2'>* {errors.ingredientTypeId.message}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                disabled={isLoading}
                            >
                                {isLoading ? (
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

export default PopupUpdateIngredient;
