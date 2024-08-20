import adminIcon from '../../assets/icons/admin-report.png';
import storeManagementIcon from '../../assets/icons/store-management.png';
import chartRevenueIcon from '../../assets/icons/chart-revenue.png';
import feedbackIcon from '../../assets/icons/feedback.png';
import adminReportIcon from '../../assets/icons/admin-report.png';
import employeeManagementIcon from '../../assets/icons/employee.png';
import nutritionListIcon from '../../assets/icons/nutrition-list.png';
import transactionIcon from '../../assets/icons/transaction.png';
import orderManagementIcon from '../../assets/icons/order-icon.png';
//Icon StoreManagement
const listMenu = {
    adminMenu: [
        {
            title: 'QL. Tài Khoản',
            url: '/account-management',
            icon: adminIcon,
            subAdminMenu: [
                {
                    title: 'Ds. Tài khoản',
                    url: '/account-management',
                },
                {
                    title: 'Thống kê tài khoản',
                    url: '/account-statics',
                },
            ],
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
            // subAdminMenu: [
            //     {
            //         title: 'Doanh thu',
            //         url: '/admin-revenue-report',
            //         icon: chartRevenueIcon,
            //     },
            //     {
            //         title: 'Phản hồi',
            //         url: '/admin-feedback',
            //         icon: feedbackIcon,
            //     },
            // ],
        },
    ],
    storeManagementMenu: [
        {
            title: 'Thống Kê',
            url: '/dashboard',
            icon: chartRevenueIcon,
            subStoreMenu: [
                {
                    title: 'TK. Giao dịch',
                    url: '/list-payments',
                    icon: transactionIcon,
                },
                {
                    title: 'TK. Đơn hàng',
                    url: '/order-management',
                    icon: orderManagementIcon,
                }],
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

    ],
    brandManagementMenu: [
        {
            title: 'Thống Kê',
            url: '/dashboard',
            icon: chartRevenueIcon,
            submenu: [
                {
                    title: 'TK. Giao dịch',
                    url: '/list-payments-brand',
                    icon: transactionIcon,
                },
                {
                    title: 'TK. Đơn hàng',
                    url: '/order-management-brand',
                    icon: orderManagementIcon,
                }],
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
            icon: feedbackIcon,
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

    ],
};
export default listMenu;
