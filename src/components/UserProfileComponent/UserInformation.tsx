type UserInformationProps = {
    // userId: string;
    username: string;
    email: string;
    role: string;
    phoneNumber?: string;
    name: string;
    address?: string;
    avatar?: string;
    created: Date | string;
}

const UserInformation = ({
    // userId,
    username,
    email,
    role,
    phoneNumber,
    name,
    address,
    avatar,
    created
}: UserInformationProps) => {
    return (
        <div className="mx-auto bg-white shadow-lg overflow-hidden">
            <div className="container mx-auto py-6">
                <h4 className="font-bold py-3 mb-2">Account settings</h4>
                <div className="bg-white shadow rounded-lg p-4">
                    <div className="flex">
                        <div className="w-1/4 p-4">
                            <div className="flex items-center mb-4">
                                <img src={avatar ?? 'https://bootdey.com/img/Content/avatar/avatar1.png'} alt="avatar" className="w-20 h-20 rounded-full" />
                                <div className="ml-4">
                                    <label className="border border-orange-500 p-1 rounded-md font-bold bg-orange-500 cursor-pointer">
                                        Upload new photo
                                        <input type="file" className="hidden" />
                                    </label>
                                    <p className="text-gray-500 mt-3">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>
                            <div className="mt-4 text-left">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-md font-bold mr-4">Save changes</button>
                                <button className="bg-gray-500 text-white py-2 px-4 rounded-md font-bold">Cancel</button>
                            </div>
                        </div>
                        <div className="w-3/4 p-4 flex flex-col ml-6">
                            <div className='flex flex-col md:flex-col'>
                                <div className="flex gap-12">
                                    <div className='mb-6 md:w-1/3'>
                                        <div className="flex">
                                            <label htmlFor="fullname" className='text-base font-semibold'>
                                                Họ Và tên
                                            </label>
                                        </div>
                                        <input
                                            value={name}
                                            type="text" required name="fullname" placeholder="Họ và tên...."
                                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                                    </div>
                                    <div className='mb-6 md:w-1/3'>
                                        <label htmlFor="role" className='text-base font-semibold'>Chức danh nhân viên: </label>
                                        <input readOnly
                                            value={role}
                                            type="text" required name="role" placeholder="Chức danh....."
                                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-col'>
                                <div className="flex gap-12">
                                    <div className='mb-6 md:w-1/3'>
                                        <div className="flex">
                                            <label htmlFor="username" className='text-base font-semibold'>Tên đăng nhập: </label>
                                        </div>
                                        <input
                                            value={username}
                                            type="text" required name="username" placeholder="Tên đăng nhập...."
                                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                                    </div>
                                    <div className='mb-6 md:w-1/3'>
                                        <label htmlFor="email" className='text-base font-semibold'>Email: </label>
                                        <input
                                            type="email"
                                            required
                                            name="email"
                                            value={email}
                                            placeholder="Email đăng nhập...."
                                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-col'>
                                <div className="flex gap-12">
                                    <div className='mb-6 md:w-1/3'>
                                        <div className="flex">
                                            <label htmlFor="phone" className='text-base font-semibold'>Số điện thoại: </label>
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            name="phone"
                                            value={phoneNumber}
                                            placeholder="Số điện thoại...."
                                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                                    </div>
                                    <div className='mb-6 md:w-1/3'>
                                        <label htmlFor="storeAddress" className='text-base font-semibold'>Cửa Hàng Làm Việc: </label>
                                        <input
                                            readOnly
                                            type="text"
                                            required
                                            name="storeAddress"
                                            placeholder="Nơi làm việc...."
                                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-col'>
                                <div className="flex gap-12">
                                    <div className='mb-6 w-1/3'>
                                        <div className="flex">
                                            <label htmlFor="address" className='text-base font-semibold'>Nơi ở hiện tại: </label>
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            name="phone"
                                            value={address}
                                            placeholder="Nơi ở hiện tại...."
                                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                                    </div>
                                    <div className='mb-6 w-1/3'>
                                        <div className="flex">
                                            <label htmlFor="created" className='text-base font-semibold'>Ngày tạo tài khoản: </label>
                                        </div>
                                        <input
                                            readOnly
                                            value={new Date(created).toLocaleDateString('vi-VN')}
                                            type="text"
                                            required
                                            name="created"
                                            placeholder="Ngày tạo tài khoản...."
                                            className='mt-2 p-2 border-2 border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInformation;
