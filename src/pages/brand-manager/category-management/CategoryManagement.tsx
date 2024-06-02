import { FaAcquisitionsIncorporated } from "react-icons/fa";
import CategoryListComponent from "../../../components/Category/CategoryComponent/CategoryListComponent";
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent ";

const CategoryManagement = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
            <div className="md:col-span-2">
                <SidebarComponent />
            </div>

            <div className="md:col-span-10 mt-20">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <FaAcquisitionsIncorporated className="text-3xl text-orange-500" />
                        <h3 className="text-3xl font-bold">Quản Lí Danh Sách Phân Loại</h3>
                    </div>
                </div>

                <CategoryListComponent />
            </div>
        </div>
    )
}

export default CategoryManagement;
