import { FaListAlt, FaPlus } from "react-icons/fa"
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent "
import SessionListComponent from "../../../components/SessionList/SessionListComponent"

const SessionManagement = () => {
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
                            <h3 className="font-bold ml-6">Quản lí thời gian nguyên liệu</h3>
                        </div>
                        <div className="ml-auto">
                            <button className="bg-green-500 hover:bg-organge-500 text-white font-bold p-3 rounded flex items-center justify-between mr-12">
                                <FaPlus className="text-base mr-2" />
                                <span>Thêm ca làm việc</span>
                            </button>

                        </div>
                    </div>
                    <div className="w-full overflow-auto">
                        <SessionListComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionManagement
