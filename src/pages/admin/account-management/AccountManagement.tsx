import { FaListAlt } from "react-icons/fa";
import AccountList from "../../../components/AccountList/AccountList";
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent ";

const AccountManagement = () => {
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
                            <h3 className="font-bold ml-6">Quản lí tài khoản</h3>
                        </div>
                       
                    </div>
                    <div className="w-full overflow-auto">
                        <AccountList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountManagement;