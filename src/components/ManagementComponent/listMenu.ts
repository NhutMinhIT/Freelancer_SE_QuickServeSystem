import adminIcon from '../../assets/icon/account-management.png';
import storeManagementIcon from '../../assets/icon/store-management.png';
import chartRevenueIcon from '../../assets/icon/chart-revenue.png';
import feedbackIcon from '../../assets/icon/feedback.png';
import adminReportIcon from '../../assets/icon/admin-report.png';
import employeeManagementIcon from '../../assets/icon/icon/employee.png';
import nutritionListIcon from '../../assets/icon/nutrition-list.png';
import transactionIcon from '../../assets/icon/transaction.png';

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
            title: 'Thống Kê',
            url: '/dashboard',
            icon: chartRevenueIcon,
        },
        {
            title: 'QL. Nhân Viên',
            url: '/employee-management',
            icon: employeeManagementIcon,
        },
        {
            title: 'QL. Thời Gian',
            url: '/time-management',
            icon: storeManagementIcon,
        },
        {
            title: 'QL. Giao dịch',
            url: '/list-payments',
            icon: transactionIcon,
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
                    title: 'QL. Nguyên Liệu',
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
            title: 'QL. Dinh Dưỡng',
            url: '/list-nutritions',
            icon: nutritionListIcon,
        },
        {
            title: 'QL. Giao dịch',
            url: '/list-payments',
            icon: transactionIcon,
        },
    ],
};
export default listMenu;
