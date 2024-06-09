import { XMarkIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import { useAppDispatch } from '../../services/store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCategory } from '../../schemas/schemaCategory';
import { createCategory } from '../../services/features/categorySlice';

type PopupCreateCategoryProps = {
    isPopupOpen: boolean;
    closePopup: () => void;
}

type FormCreateCategoryValues = {
    name: string;
}

const PopupCreateCategory: React.FC<PopupCreateCategoryProps> = ({ isPopupOpen, closePopup }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormCreateCategoryValues>({
        resolver: yupResolver(schemaCategory)
    });

    const onSubmit = (data: FormCreateCategoryValues) => {
        setIsLoading(true);
        dispatch(createCategory(data))
            .unwrap()
            .then(() => {
                closePopup();
            })
            .catch((error: any) => console.log(error))
            .finally(() => setIsLoading(false));
        reset();

    }

    return (
        isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div
                    className="relative p-6 bg-white border rounded-lg shadow-lg w-96 bg-white-400"
                >
                    <button
                        onClick={closePopup}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <XMarkIcon width={24} height={24} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">Create Category</h2>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.name && <p className='text-red-500 text-xs mt-2'>* {errors.name.message}</p>}
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
                                        'Create'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default PopupCreateCategory;
