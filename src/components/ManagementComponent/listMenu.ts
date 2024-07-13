import adminIcon from '../../assets/icon/account-management.png';
import storeManagementIcon from '../../assets/icon/store-management.png';
import chartRevenueIcon from '../../assets/icon/chart-revenue.png';
import feedbackIcon from '../../assets/icon/feedback.png';
import adminReportIcon from '../../assets/icon/admin-report.png';
import employeeManagementIcon from '../../assets/icon/icon/employee.png';
import nutritionListIcon from '../../assets/icon/nutrition-list.png';
//Icon StoreManagement
const listMenu = {
    adminMenu: [
        {
            title: 'QL. Tài Khoản',
            url: '/account-management',
            icon: adminIcon,
        },
        {
            title: 'QL. Cửa Hàng',
            url: '/store-management',
            icon: storeManagementIcon,
        },
        {
            title: 'QL. Báo Cáo',
            url: '/admin-revenue-report',
            icon: adminReportIcon,
            subAdminMenu: [
                {
                    title: 'Doanh thu',
                    url: '/admin-revenue-report',
                    icon: chartRevenueIcon,
                },
                {
                    title: 'Phản hồi',
                    url: '/admin-feedback',
                    icon: feedbackIcon,
                },
            ],
        },
    ],
    storeManagementMenu: [
        {
            title: 'DS. Nhân Viên',
            url: '/employee-management',
            icon: employeeManagementIcon,
        },
        {
            title: 'DS. Thời Gian',
            url: '/time-management',
            icon: storeManagementIcon,
        },
        {
            title: 'DS. Dinh Dưỡng',
            url: '/list-nutritions',
            icon: nutritionListIcon,
        },

    ],
    brandManagementMenu: [
        {
            title: 'Thống Kê',
            url: '/dashboard',
            icon: chartRevenueIcon,
        },
        {
            title: 'QL. Phân Loại',
            url: '/brand-category',
            icon: feedbackIcon,
        },
        {
            title: 'QL. Nguyên Liệu',
            url: '/ingredients/list-ingredients',
            submenu: [
                {
                    title: 'DS. Nguyên Liệu',
                    url: '/ingredients/list-ingredients',
                },
                {
                    title: 'Loại Nguyên Liệu',
                    url: '/ingredients/list-ingredients-type',
                },
            ],
        },
        {
            title: 'QL. Mẫu Sản Phẩm',
            url: '/product-template',
            icon: feedbackIcon,
        },
        {
            title: 'DS. Dinh Dưỡng',
            url: '/list-nutritions',
            icon: nutritionListIcon,
        },

    ],
};
export default listMenu;
