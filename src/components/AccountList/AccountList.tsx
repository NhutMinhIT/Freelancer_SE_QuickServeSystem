import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/features/userSlice";
import { IUserInfo } from "../../models/UserInfor";
import PopupUserDetail from "../Popup/PopupUserDetail";

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
    accessorKey: "roles",
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
  const { users } = useAppSelector((state) => state.users);
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [onPopupDetail, setOnPopupDetail] = useState<boolean>(false);

  const handleShowDetail = (user: IUserInfo) => {
    setUserData(user);
    setOnPopupDetail(true);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const table = useMaterialReactTable({
    columns,
    data: users || [],
    enableRowSelection: false,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });

  return (
    <Stack sx={{ m: "2rem 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <MRT_GlobalFilterTextField table={table} />
        <MRT_TablePagination table={table} />
      </Box>
      <Typography
        variant="subtitle2"
        sx={{
          textAlign: "left",
          marginLeft: "16px",
          fontSize: "14px",
          color: "red",
        }}
      >
        * Vui lòng nhấn đúp vào 1 hàng để xem thông tin chi tiết
      </Typography>
      <TableContainer className="p-4">
        <Table>
          <TableHead className="bg-orange-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell align="left" variant="head" key={header.id}>
                    {header.isPlaceholder ? null : (
                      <Typography fontWeight={700} color={"black"}>
                        {flexRender(
                          header.column.columnDef.Header ??
                            header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                selected={row.getIsSelected()}
                onDoubleClick={() => handleShowDetail(row.original)}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? "white" : "#d9d9d9",
                  cursor: "pointer",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell align="left" variant="body" key={cell.id}>
                    <MRT_TableBodyCellValue
                      cell={cell}
                      table={table}
                      staticRowIndex={rowIndex}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      <PopupUserDetail
        user={userData}
        onPopupDetail={onPopupDetail}
        setOnPopupDetail={setOnPopupDetail}
      />
    </Stack>
  );
};

export default AccountList;
