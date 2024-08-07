import { useEffect, useState } from 'react';
import {type MRT_ColumnDef,} from "material-react-table";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { FilterConfig, getAllUser, setFilterConfig } from "../../services/features/userSlice";
import { IUserInfo } from "../../models/UserInfor";
import PopupUserDetail from "../Popup/PopupUserDetail";
import CommonTableFilterPagination from '../CommonTable/CommonTableFilterPagination';
import { Stack } from '@mui/material';

const rolesSelect = [
  {
    value: "Brand_Manager",
    name: 'QL. Thương hiệu'
  },
  {
    value: "Admin",
    name: 'Quản trị viên'
  },
  {
    value: "Store_Manager",
    name: 'QL. Cửa hàng'
  },
  {
    value: "Staff",
    name: 'Nhân viên'
  },
  {
    value: "Customer",
    name: 'Khách hàng'
  },
]

const columns: MRT_ColumnDef<IUserInfo>[] = [
  {
    accessorKey: "userName",
    header: "Tên Đăng nhập",
  },
  {
    accessorKey: "email",
    header: "Email",
    Cell: ({ cell }) => {
      const email = cell.row.original.email;
      return email.length > 15 ? email.substring(0, 15) + "..." : email;
    },
  },
  {
    accessorKey: "role",
    header: "Chức danh",
    Cell: ({ cell }) => {
      const roles = cell.row.original.roles;
      if (!roles) return "No roles";
      if (roles === "Brand_Manager") return "QL. Thương hiệu";
      if (roles === "Admin") return "Quản trị viên";
      if (roles === "Store_Manager") return "QL. Cửa hàng";
      if (roles === "Staff") return "Nhân viên";
      if (roles === "Customer") return "Khách hàng";
      return roles;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "avatar",
    header: "Ảnh đại diện",
  },
  {
    accessorKey: "created",
    header: "Ngày tạo",
    Cell: ({ cell }) => {
      const created = cell.row.original.created;
      return typeof created === "string"
        ? created.split("T")[0]
        : new Date(created).toISOString().split("T")[0];
    },
  },
];

const AccountList = () => {
  const dispatch = useAppDispatch();
  const { users, filterConfig, totalPages, totalItems } = useAppSelector((state) => state.users);
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [onPopupDetail, setOnPopupDetail] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllUser(filterConfig));
  }, [dispatch, filterConfig]);

  const handleShowDetail = (user: IUserInfo) => {
    setUserData(user);
    setOnPopupDetail(true);
  };

  const handleFilterChange = (key: keyof FilterConfig, value: string | number) => {
    dispatch(setFilterConfig({ ...filterConfig, [key]: value }));
  };

  const handlePageChange = (newPageIndex: number) => {
    dispatch(setFilterConfig({
      ...filterConfig,
      pageNumber: newPageIndex + 1,
    }));
    dispatch(getAllUser({
      ...filterConfig,
      pageNumber: newPageIndex + 1,
    }));
  };

  return (
    <Stack>
      <CommonTableFilterPagination
        columns={columns}
        data={users || []}
        filterConfig={filterConfig}
        totalPages={totalPages}
        totalItems={totalItems}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        onRowDoubleClick={handleShowDetail}
        rolesSelect={rolesSelect}
      />
      <PopupUserDetail user={userData} onPopupDetail={onPopupDetail} setOnPopupDetail={setOnPopupDetail} />
    </Stack>
  );
};

export default AccountList;