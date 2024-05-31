import { FaUser } from "react-icons/fa";
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent "
import FormRegister from "../../../components/AuthComponent/FormRegister";

const RegisterAccount = () => {
    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
                <div className="md:col-span-2">
                    <SidebarComponent />
                </div>

                <div className="md:col-span-10 mt-20">
                    <div className="flex">
                        <FaUser className="text-3xl text-orange-500" />
                        <h3 className="text-3xl font-bold ml-6">Đăng ký tài khoản</h3>
                    </div>
                    <FormRegister />
                </div>
            </div>
        </div>
    )
}

export default RegisterAccount;
