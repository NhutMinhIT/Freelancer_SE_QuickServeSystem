import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { IProductTemplate } from "../../models/ProductTemplate";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCreateProductTemplate } from "../../schemas/schemaProductTemplate";
import { getAllCategories } from "../../services/features/categorySlice";
import { createProductTemplate, getAllProductTemplates } from "../../services/features/productTemplateSlice";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Correct import path for the icon
import { ICategory } from "../../models/Categoty";

type PopupCreateProductTemplateProps = { // Corrected type name
    isPopupOpen: boolean;
    closePopup: () => void;
}

type FormCreateProductTemplate = {
    categoryId: number;
    name: string;
    size: string;
    image: FileList; // Ensure `image` is lowercase to match schema
    price: number;
    description: string;
}

const PopupCreateProductTemplate: React.FC<PopupCreateProductTemplateProps> = ({
    isPopupOpen,
    closePopup
}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { categories } = useAppSelector((state) => state.categories);
    const [categoryData, setCategoryData] = useState<ICategory[] | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormCreateProductTemplate>({
        resolver: yupResolver(schemaCreateProductTemplate) as unknown as Resolver<FormCreateProductTemplate>,
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        setCategoryData(categories);
    }, [categories]);

    const onSubmit = (data: FormCreateProductTemplate) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('categoryId', data.categoryId.toString());
        formData.append('name', data.name);
        formData.append('size', data.size.toString());
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        formData.append('price', data.price.toString());
        formData.append('description', data.description);

        dispatch(createProductTemplate(formData))
            .unwrap()
            .then(() => {
                dispatch(getAllProductTemplates());
                closePopup();
                reset();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }

    return (
        isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white-500 px-2 relative bg-white border rounded-lg shadow-lg overflow-y-scroll lg:h-[500px] lg:w-[500px] w-auto h-auto">
                    <button
                        onClick={closePopup}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <XMarkIcon width={24} height={24} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4 mt-2">Tạo Mẫu Sản Phẩm</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                        <div className="mb-4">
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Thể Loại</label>
                            <select
                                {...register('categoryId')}
                                name="categoryId"
                                id="categoryId"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                                <option value="">Chọn thể loại</option>
                                {categoryData && categoryData.map((cate) => (
                                    <option key={cate.id} value={cate.id}>{cate.name}</option>
                                ))}
                            </select>
                            {errors.categoryId && <p className='text-red-500 text-xs mt-2'>* {errors.categoryId.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên Mẫu Sản Phẩm</label>
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
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh nguyên liệu</label>
                            <input
                                {...register('image')}
                                type="file"
                                name="image"
                                id="image"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.image && <p className='text-red-500 text-xs mt-2'>* {errors.image.message}</p>}
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
                                    'Tạo mẫu sản phẩm'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default PopupCreateProductTemplate;
