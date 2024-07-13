import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';

import { IEmployee } from '../../models/Employee';
import CommonTable from '../CommonTable/CommonTable';
import PopupCreateEmployee from '../Popup/PopupCreateEmployee';
import { useAppSelector } from '../../services/store/store';



const columns: MRT_ColumnDef<IEmployee>[] = [
    {
        accessorKey: 'name',
        header: 'Tên nhân viên',
    },
    {
        accessorKey: 'userName',
        header: 'Tài khoản nhân viên',
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Số điện thoại'
    },
    {
        accessorKey: 'address',
        header: 'Địa chỉ'
    },
    {
        accessorKey: 'roles',
        header: 'Chức danh',
        Cell: ({ cell }) => {
            const roles = cell.row.original.roles;
            if (!roles) return 'Không có';
            if (roles.includes('Store_Manager')) return 'QL. Cửa hàng';
            if (roles.includes('Staff')) return 'Nhân viên';
            return roles;
        },
    },
    {
        accessorKey: 'created',
        header: 'Ngày tạo',
        Cell: ({ cell }) => {
            const created = cell.row.original.created;
            return typeof created === 'string' ? created.split('T')[0] : new Date(created).toISOString().split('T')[0];
        },
    }
];

const EmployeeListComponent = () => {
    const { employees } = useAppSelector((state) => state.employees);
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopupCreateEmployee = () => {
        setIsPopupOpen(false);
    };

    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={employees || []}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={handlePopupOpen}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm Nhân Viên
                    </Button>
                }
            />
            <PopupCreateEmployee
                isPopupOpen={isPopupOpen}
                closePopup={handleClosePopupCreateEmployee}
            />

        </Stack>
    );
};

export default EmployeeListComponent;
