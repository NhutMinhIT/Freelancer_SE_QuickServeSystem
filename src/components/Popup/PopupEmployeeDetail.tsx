import React from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { IEmployee } from "../../models/Employee";

interface PopupEmployeeDetailProps {
  employee: IEmployee | null;
  onPopupDetail: boolean;
  setOnPopupDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const isEmployee = (employee: any): employee is IEmployee => {
  return (employee as IEmployee).name !== undefined;
};

const getRoleTitle = (roles: string): string => {
  switch (roles) {
    case "Store_Manager":
      return "QL. Cửa hàng";
    case "Staff":
      return "Nhân viên";
    default:
      return roles;
  }
};
const PopupEmployeeDetail: React.FC<PopupEmployeeDetailProps> = ({
  employee,
  onPopupDetail,
  setOnPopupDetail,
}) => {
  if (!employee || !isEmployee(employee)) return null;

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${onPopupDetail ? "" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="bg-white inline-block transform overflow-hidden rounded-lg bg-white-700 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full pb-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="flex">
                  <h3
                    className="w-full text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Thông tin chi tiết
                  </h3>
                  <XMarkIcon
                    width={16}
                    height={16}
                    className="ml-auto h-6 w-6 cursor-pointer"
                    onClick={() => setOnPopupDetail(false)}
                  />
                  <hr className="mt-2 text-black-700" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 border-t p-8">
                  <div>
                    <span className="text-back-500 text-sm font-bold">Tên</span>
                  </div>
                  <div>
                    <span>{employee?.name}</span>
                  </div>
                  <div>
                    <span className="text-back-500 divide-y divide-blue-500 text-sm font-bold">
                      Email
                    </span>
                  </div>
                  <div>
                    <span>{employee?.email}</span>
                  </div>
                  <div>
                    <span className="text-back-500 text-sm font-bold">
                      Tên đăng nhập
                    </span>
                  </div>
                  <div>
                    <span>{employee?.userName}</span>
                  </div>
                  <div>
                    <span className="text-back-500 text-sm font-bold">
                      Chức danh
                    </span>
                  </div>
                  <div>
                    <span>
                      {employee?.roles ? getRoleTitle(employee.roles) : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-back-500 text-sm font-bold">
                      Số điện thoại
                    </span>
                  </div>
                  <div>
                    <span>{employee?.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="text-back-500 text-sm font-bold">
                      Ngày tạo tài khoản
                    </span>
                  </div>
                  <div>
                    <span>
                      {typeof employee?.created === "string"
                        ? new Date(employee.created).toLocaleDateString("vi-VN")
                        : employee.created.toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-back-500 text-sm font-bold">
                      Địa chỉ
                    </span>
                  </div>
                  <div>
                    <span>{employee?.address}</span>
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

export default PopupEmployeeDetail;
