// PopupUserDetail.tsx
import React from 'react';
import { IUserInfo } from '../../models/UserInfor';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface PopupUserDetailProps {
    user: IUserInfo | null;
    onPopupDetail: boolean;
    setOnPopupDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const isIUserInfo = (user: any): user is IUserInfo => {
    return (user as IUserInfo).name !== undefined;
};

const getRoleTitle = (role: string): string => {
    switch (role) {
        case 'Brand_Manager':
            return 'Quản lý thương hiệu';
        case 'Admin':
            return 'Quản trị viên';
        default:
            return role;
    }
}
const PopupUserDetail: React.FC<PopupUserDetailProps> = ({ user, onPopupDetail, setOnPopupDetail }) => {
    if (!user || !isIUserInfo(user)) return null;

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${onPopupDetail ? '' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="bg-white-700 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pb-2">
                                <div className='flex'>
                                    <h3 className="text-lg leading-6 w-full font-medium text-gray-900" id="modal-title">
                                        Thông tin chi tiết
                                    </h3>
                                    <XMarkIcon width={16} height={16} className='h-6 w-6 ml-auto cursor-pointer' onClick={() => setOnPopupDetail(false)} />
                                    <hr className='mt-2 text-black-700' />
                                </div>
                                <div className="mt-4 border-t grid grid-cols-2 gap-4 p-8">
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Tên
                                        </span>
                                    </div>
                                    <div>
                                        <span>{user?.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold divide-y divide-blue-500">
                                            Email
                                        </span>
                                    </div>
                                    <div>
                                        <span>{user?.email}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Tên đăng nhập
                                        </span>
                                    </div>
                                    <div>
                                        <span>{user?.userName}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Chức danh
                                        </span>
                                    </div>
                                    <div>
                                        <span>{user?.roles ? getRoleTitle(user.roles[0]) : 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Số điện thoại
                                        </span>
                                    </div>
                                    <div>
                                        <span>{user?.phoneNumber}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Ngày tạo tài khoản
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {typeof user?.created === 'string'
                                                ? new Date(user.created).toLocaleDateString('vi-VN')
                                                : user.created.toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Địa chỉ
                                        </span>
                                    </div>
                                    <div>
                                        <span>{user?.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupUserDetail;
