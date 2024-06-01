import { FaAcquisitionsIncorporated, FaPlus } from "react-icons/fa";
import CategoryListComponent from "../../../components/Category/CategoryComponent/CategoryListComponent";
import { useState } from "react";
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent ";
import PopupCreateCategory from "../../../components/Category/CreateCategory/PopupCreateCategory";

const CategoryManagement = () => {
    const [isPopupOpen, setIsPopoupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopoupOpen(!isPopupOpen);
    };

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
                    <div className="flex items-center">
                        <button
                            onClick={togglePopup}
                            className="mr-4 rounded-lg bg-orange-500 py-2 px-4 text-center font-sans
                            text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10
                            transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none
                            active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            <FaPlus className="inline-block" />
                            Thêm Thể Loại
                        </button>
                        <PopupCreateCategory isPopupOpen={isPopupOpen} closePopup={togglePopup} />
                    </div>
                </div>

                <CategoryListComponent />
            </div>
        </div>
    )
}

export default CategoryManagement;
