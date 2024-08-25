import { useEffect, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import CommonTableFilterPagination from '../CommonTable/CommonTableFilterPagination';
import { Stack, Button } from '@mui/material';

import { IEmployee } from '../../models/Employee';
import PopupCreateEmployee from '../Popup/PopupCreateEmployee';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { FilterConfig, getAllEmployees, setFilterConfig } from '../../services/features/employeeSlice';
import PopupEmployeeDetail from '../Popup/PopupEmployeeDetail';

const rolesSelect = [
    {
        value: "Staff",
        name: 'Nhân viên'
    },
    {
        value: "Store_Manager",
        name: 'QL. Cửa hàng'
    },
]

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
    const dispatch = useAppDispatch();
    const { employees, filterConfig, totalItems, totalPages } = useAppSelector((state) => state.employees);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [emplpyeeData, setEmployeeData] = useState<IEmployee | null>(null);
    const [onPopupDetail, setOnPopupDetail] = useState<boolean>(false);


    useEffect(() => {
        dispatch(getAllEmployees(filterConfig));
    }, [dispatch, filterConfig]);

    const handleShowDetail = (user: IEmployee) => {
        setEmployeeData(user);
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
        dispatch(getAllEmployees({
            ...filterConfig,
            pageNumber: newPageIndex + 1,
        }));
    };


    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopupCreateEmployee = () => {
        setIsPopupOpen(false);
    };

    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTableFilterPagination
                columns={columns}
                data={employees || []}
                filterConfig={filterConfig}
                totalPages={totalPages}
                totalItems={totalItems}
                onFilterChange={handleFilterChange}
                onPageChange={handlePageChange}
                onRowDoubleClick={handleShowDetail}
                rolesSelect={rolesSelect}
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
            <PopupEmployeeDetail employee={emplpyeeData} onPopupDetail={onPopupDetail} setOnPopupDetail={setOnPopupDetail} />

        </Stack>
    );
};

export default EmployeeListComponent;
