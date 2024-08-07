import { XMarkIcon } from '@heroicons/react/16/solid';
// import { useAppDispatch } from '../../services/store/store';
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaEmployee } from '../../schemas/schemaEmployee';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { useState } from 'react';
import { createEmployee, getAllEmployees } from '../../services/features/employeeSlice';


type PopupCreateEmployeeProps = {
    isPopupOpen: boolean;
    closePopup: () => void;
}

type FormCreateEmployeeValues = {
    email: string;
    name: string
    userName?: string;
    password?: string;
}

const PopupCreateEmployee: React.FC<PopupCreateEmployeeProps> = ({ isPopupOpen, closePopup }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { filterConfig, } = useAppSelector((state) => state.employees);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors } } = useForm<FormCreateEmployeeValues>({
            resolver: yupResolver(schemaEmployee) as unknown as Resolver<FormCreateEmployeeValues>,
        });

    const onSubmit = (data: FormCreateEmployeeValues) => {
        setIsLoading(true);
        dispatch(createEmployee(data))
            .unwrap()
            .then(() => {
                closePopup();
                dispatch(getAllEmployees(filterConfig)); // Call getAllEmployees here

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
                        <h2 className="text-xl font-bold mb-4">Tạo Nhân Viên</h2>
                    </div>
                    <div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    {...register('email')}
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.email && <p className='text-red-500 text-xs mt-2'>* {errors.email.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên Nhân Viên</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.name && <p className='text-red-500 text-xs mt-2'>* {errors.name.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Tên Tài Khoản</label>
                                <input
                                    {...register('userName')}
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.userName && <p className='text-red-500 text-xs mt-2'>* {errors.userName.message}</p>}

                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật Khẩu</label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.password && <p className='text-red-500 text-xs mt-2'>* {errors.password.message}</p>}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                    disabled={isLoading}
                                >
                                    Tạo Nhân Viên
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default PopupCreateEmployee;
