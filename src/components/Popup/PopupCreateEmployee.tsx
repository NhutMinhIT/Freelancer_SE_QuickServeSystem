import { XMarkIcon } from '@heroicons/react/16/solid';
// import { useAppDispatch } from '../../services/store/store';
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaEmployee } from '../../schemas/schemaEmployee';


type PopupCreateEmployeeProps = {
    isPopupOpen: boolean;
    closePopup: () => void;
}

type FormCreateEmployeeValues = {
    email: string;
    userName?: string;
    password?: string;
}

const PopupCreateEmployee: React.FC<PopupCreateEmployeeProps> = ({ isPopupOpen, closePopup }) => {
    // const dispatch = useAppDispatch();
    // const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        //  handleSubmit,
        //   reset,
        formState: { errors } } = useForm<FormCreateEmployeeValues>({
            resolver: yupResolver(schemaEmployee) as unknown as Resolver<FormCreateEmployeeValues>,
        });

    // const onSubmit = (data: FormCreateEmployeeValues) => {
    //     setIsLoading(true);
    //     dispatch(createEmployee(data))
    //         .unwrap()
    //         .then(() => {
    //             closePopup();
    //         })
    //         .catch((error: any) => console.log(error))
    //         .finally(() => setIsLoading(false));
    //     reset();

    // }

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
                        //  onSubmit={handleSubmit(onSubmit)}
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
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Tên Tài Khoản</label>
                                <input
                                    {...register('userName')}
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />

                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật Khẩu</label>
                                <input
                                    {...register('password')}
                                    type="text"
                                    name="password"
                                    id="password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />

                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                // disabled={isLoading}
                                >
                                    'Tạo'
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
