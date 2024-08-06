import { useEffect, useState } from 'react';
import {
  MRT_TableBodyCellValue,
  MRT_ToolbarAlertBanner,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { FilterConfig, getAllUser, setFilterConfig } from "../../services/features/userSlice";
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
    accessorKey: "role",
    header: "Chức danh",
    Cell: ({ cell }) => {
      const roles = cell.row.original.role;
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

  const table = useMaterialReactTable({
    columns,
    data: users || [],
    enableRowSelection: false,
    initialState: {
      pagination: {
        pageSize: filterConfig.pageSize,
        pageIndex: filterConfig.pageNumber - 1,
      },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 20, 60],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });

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
    <Stack sx={{ m: '2rem 0' }}>
      <Box display={'flex'} gap={2} ml={2}>
        <TextField
          label="Tên"
          value={filterConfig.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <FormControl  sx={{ minWidth: 200 }}>
          <InputLabel shrink>Chức vụ</InputLabel>
          <Select
            value={filterConfig.roles}
            onChange={(e) => handleFilterChange('roles', e.target.value)}
            displayEmpty
            label="Chức vụ"
          >
            <MenuItem value={null}>
              <>Tất cả</>
            </MenuItem>
            <MenuItem value="Brand_Manager">QL. Thương hiệu</MenuItem>
            <MenuItem value="Admin">Quản trị viên</MenuItem>
            <MenuItem value="Store_Manager">QL. Cửa hàng</MenuItem>
            <MenuItem value="Staff">Nhân viên</MenuItem>
            <MenuItem value="Customer">Khách hàng</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Typography
        variant="subtitle2"
        sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '14px', color: 'red' }}
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
                      <Typography fontWeight={700} color={'black'}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
           <TableBody>
            {users && users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Không có dữ liệu
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  selected={row.getIsSelected()}
                  onDoubleClick={() => handleShowDetail(row.original)}
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? 'white' : '#d9d9d9',
                    cursor: 'pointer',
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell align="left" variant="body" key={cell.id}>
                      <MRT_TableBodyCellValue cell={cell} table={table} staticRowIndex={rowIndex} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      <Box display="flex" justifyContent="space-between" mx={2}>
        <Typography alignContent={'center'}>Tổng số lượng: {totalItems}</Typography>
        <Box display={'flex'} gap={2}  justifyContent={'flex-end'} textAlign={'center'} p={2}>
          <FormControl variant="outlined" size="small">
              <Select
                value={filterConfig.pageSize}
                onChange={(e) => handleFilterChange('pageSize', Number(e.target.value))}
              >
                {[5, 10, 20, 60].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => handlePageChange(filterConfig.pageNumber - 2)}
              disabled={filterConfig.pageNumber === 1}
            >
              Trước
            </Button>
            <Typography alignContent={'center'}>{`Trang ${filterConfig.pageNumber} của ${totalPages}`}</Typography>
            <Button
              variant="outlined"
              onClick={() => handlePageChange(filterConfig.pageNumber)}
              disabled={filterConfig.pageNumber >= totalPages}
            >
              Kế
            </Button>
        </Box>
      </Box>

      <PopupUserDetail user={userData} onPopupDetail={onPopupDetail} setOnPopupDetail={setOnPopupDetail} />
    </Stack>
  );
};

export default AccountList;

