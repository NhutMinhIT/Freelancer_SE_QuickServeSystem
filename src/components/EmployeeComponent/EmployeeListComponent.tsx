import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../services/store/store';

import { IEmployee } from '../../models/Employee';
import CommonTable from '../CommonTable/CommonTable';
import { getAllEmployee } from '../../services/features/employeeSlice';
import PopupCreateEmployee from '../Popup/PopupCreateEmployee';



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
        header: 'Đỉa chỉ'
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
    const dispatch = useAppDispatch();
    const { employees } = useAppSelector((state) => state.employees);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [employeeData, setEmployeeData] = useState<IEmployee | null>(null);
    const [onPopupEmployeeDetail, setOnPopupEmployeeDetail] = useState<boolean>(false);

    useEffect(() => {
        if (!isPopupOpen) {
            dispatch(getAllEmployee());
        }
    }, [isPopupOpen, dispatch]);

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleClosePopupCreateEmployee = () => {
        setIsPopupOpen(false);
    };

    const handleShowEmployeeDetail = (employee: IEmployee) => {
        setEmployeeData(employee);
        setOnPopupEmployeeDetail(true);
    };
    

    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={employees || []}
                onRowDoubleClick={handleShowEmployeeDetail}
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
           
            {employeeData && (
                <>
                 
               
                </>
            )}
        </Stack>
    );
};

export default EmployeeListComponent;
