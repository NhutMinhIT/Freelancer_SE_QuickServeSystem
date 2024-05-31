import { useEffect, useState } from "react";
import { useAppDispatch } from "../../services/store/store";
import { useForm } from "react-hook-form";
import { registerAccountByAdmin, setError } from "../../services/features/authSlice";

type FormRegisterProps = {
    email: string,
    username: string,
    role: string,
    password: string,
    confirmPassword: string
}

const FormRegister = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const handleShowPass = () => {
        setShowPassword(!showPassword);
    }
    const handleShowConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass);
    }

    const form = useForm<FormRegisterProps>({
        defaultValues: {
            email: '',
            username: '',
            role: '',
            password: '',
            confirmPassword: ''
        }
    });
    const { register, handleSubmit, formState, reset, watch } = form;
    const { errors } = formState;
    const password = watch('password');

    const onSubmit = (data: FormRegisterProps) => {
        setIsLoading(true);
        dispatch(registerAccountByAdmin(data))
            .unwrap()
            .then(() => {
                reset({
                    email: '',
                    username: '',
                    role: '',
                    password: '',
                    confirmPassword: ''
                });
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <div className='mt-12'>
            <form method='POST' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col md:flex-row md:gap-12'>
                    <div className='mb-6 md:w-1/3'>
                        <div className="flex">
                            <label htmlFor="email" className='text-base font-semibold'>Email: </label>
                            {errors.email && <p className='text-sm text-red-500'>* {errors.email.message}</p>}
                        </div>
                        <input {...register('email', { required: 'Bạn Chưa Nhập Email' })}
                            type="email" name="email" required placeholder="Nhập Email Của Nhân Viên...."
                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row md:gap-12'>
                    <div className='mb-6 md:w-1/3'>
                        <div className="flex">
                            <label htmlFor="username" className='text-base font-semibold'>Tên đăng nhập: </label>
                            {errors.username && <p className='text-sm text-red-500'>* {errors.username.message}</p>}
                        </div>
                        <input {...register('username', { required: 'Bạn Chưa Nhập Tên' })}
                            type="text" required name="username" placeholder="Tên đăng nhập...."
                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                    </div>
                    <div className='mb-6 md:w-1/3'>
                        <div className="flex">
                            <label htmlFor="role" className='text-base font-semibold'>Chức vụ nhân viên: </label>
                            {errors.role && <p className='text-sm text-red-500'>* {errors.role.message}</p>}
                        </div>
                        <select {...register('role', { required: 'Bạn Chưa Chọn Chức Vụ' })}
                            name="role" required
                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full'>
                            <option value="" disabled selected>- - Chọn - - </option>
                            <option value="Admin">Admin</option>
                            <option value="Store_Manager">QL. Cửa hàng</option>
                            <option value="Brand_Manager">Brand</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row md:gap-12'>
                    <div className='mb-6 md:w-1/3'>
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className='text-base font-semibold'>Mật khẩu: </label>
                            {errors.password && <p className='text-sm text-red-500'>* {errors.password.message}</p>}
                            <button type="button" onClick={handleShowPass} className="text-sm text-blue-500">
                                {showPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                        <input {...register('password', { required: 'Bạn Chưa Nhập Mật Khẩu' })}
                            type={showPassword ? "text" : "password"} name="password" placeholder="Nhập mật khẩu...."
                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                    </div>
                    <div className='mb-6 md:w-1/3'>
                        <div className="flex justify-between items-center">
                            <label htmlFor="confirmPassword" className='text-base font-semibold'>Xác nhận mật khẩu: </label>
                            {errors.confirmPassword && <p className='text-sm text-red-500'>* {errors.confirmPassword.message}</p>}
                            <button type="button" onClick={handleShowConfirmPass} className="text-sm text-blue-500">
                                {showConfirmPass ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                        <input {...register('confirmPassword', {
                            required: 'Bạn Chưa Xác Nhận Mật Khẩu',
                            validate: value => value === password || 'Xác nhận mật khẩu không đúng'
                        })}
                            type={showConfirmPass ? "text" : "password"} name="confirmPassword" placeholder="Xác nhận mật khẩu...."
                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                    </div>
                </div>

                <div className=''>
                    <div className='mb-6 md:w-1/4 ml-auto mr-36'>
                        <button type='submit' className='p-3 bg-green-600 text-white rounded-md shadow-sm hover:bg-orange-500'>{isLoading ? 'Loading...' : 'Đăng Ký'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormRegister;
