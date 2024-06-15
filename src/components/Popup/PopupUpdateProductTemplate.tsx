import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { ICategory } from "../../models/Categoty";
import { Resolver, useForm } from "react-hook-form";
import { schemaUpdateProductTemplate } from "../../schemas/schemaProductTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllCategories } from "../../services/features/categorySlice";
import { getAllProductTemplates, updateProductTemplateById } from "../../services/features/productTemplateSlice";
import { XMarkIcon } from "@heroicons/react/16/solid";

type PopupUpdateProductTemplateProps = {
    open: boolean;
    closePopup: () => void;
    onClosePopupDetail: () => void;
}
type FormUpdateProductTemplateValues = {
    categoryId: number,
    name: string;
    size: string;
    price: number;
    description: string;
}

const PopupUpdateProductTemplate = ({
    open,
    closePopup,
    onClosePopupDetail
}: PopupUpdateProductTemplateProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { categories } = useAppSelector(state => state.categories);
    const productTemplateData = useAppSelector(state => state.productTemplates.productTemplate);
    const [categoryData, setCategoryData] = useState<ICategory[] | null>(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormUpdateProductTemplateValues>({
        resolver: yupResolver(schemaUpdateProductTemplate) as unknown as Resolver<FormUpdateProductTemplateValues>,
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        setCategoryData(categories);
    }, [categories]);

    useEffect(() => {
        if (productTemplateData) {
            setValue('categoryId', productTemplateData?.categoryId);
            setValue('name', productTemplateData?.name);
            setValue('size', productTemplateData?.size);
            setValue('price', productTemplateData?.price);
            setValue('description', productTemplateData?.description);
        }
    }
        , [productTemplateData, setValue]);

    const onSubmit = (data: FormUpdateProductTemplateValues) => {
        setIsLoading(true);
        dispatch(updateProductTemplateById({ id: productTemplateData?.id as number, data }))
            .unwrap()
            .then(() => {
                dispatch(getAllProductTemplates());
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
                        <h2 className="text-xl font-bold mb-4 mt-2">Cập nhật mẫu sản phẩm</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên mẫu</label>
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
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
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
                            <label htmlFor="size" className="block text-sm font-medium text-gray-700">Kích cỡ</label>
                            <select
                                {...register('size')}
                                name="size"
                                id="size"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            >
                                <option value="">Chọn kích cỡ</option>
                                <option value="small">Nhỏ</option>
                                <option value="medium">Trung bình</option>
                                <option value="large">Lớn</option>
                            </select>
                            {errors.size && <p className='text-red-500 text-xs mt-2'>* {errors.size.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
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
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Phân loại</label>
                            <select
                                {...register('categoryId')}
                                name="categoryId"
                                id="category"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                                <option value="">Chọn Phân Loại</option>
                                {categoryData && categoryData.map((cate) => (
                                    <option key={cate.id} value={cate.id}>{cate.name}</option>
                                ))}
                            </select>
                            {errors.categoryId && <p className='text-red-500 text-xs mt-2'>* {errors.categoryId.message}</p>}
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
    )
}

export default PopupUpdateProductTemplate