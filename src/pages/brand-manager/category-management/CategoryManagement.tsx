import { FaAcquisitionsIncorporated } from "react-icons/fa";
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent "
import BrandCategoryComponent from "../../../components/CategoryComponent/BrandCategoryComponent";

const CategoryManagement = () => {
    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
                <div className="md:col-span-2">
                    <SidebarComponent />
                </div>

                <div className="md:col-span-10 mt-20">
                    <div className="flex">
                        <FaAcquisitionsIncorporated className="text-3xl text-orange-500" />
                        <h3 className="text-3xl font-bold ml-6">Quản Lí Danh Sách Phân Loại</h3>
                    </div>
                    <BrandCategoryComponent />
                </div>
            </div>
        </div>
    )
}

export default CategoryManagement;
