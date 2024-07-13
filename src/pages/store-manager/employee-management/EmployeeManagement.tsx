import { FaListAlt } from "react-icons/fa";
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent ";
import EmployeeListComponent from "../../../components/EmployeeComponent/EmployeeListComponent";

const EmployeeManagement = () => {
    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
                <div className="md:col-span-2">
                    <SidebarComponent />
                </div>

                <div className="md:col-span-10 mt-20">
                    <div className="flex">
                        <div className="flex flex-row text-3xl">
                            <FaListAlt className="text-orange-500" />
                            <h3 className="font-bold ml-6 uppercase">Quản lí nhân viên</h3>
                        </div>
                    </div>
                    <div className="w-full overflow-auto">
                        <EmployeeListComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeManagement;