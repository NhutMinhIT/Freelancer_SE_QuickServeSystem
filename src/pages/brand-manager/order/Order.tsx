import { FaPaypal } from "react-icons/fa"
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent "
import OrderBrandComponent from "../../../components/OrderComponent/brand/OrderBrandComponent"

const Order = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
            <div className="md:col-span-2">
                <SidebarComponent />
            </div>

            <div className="md:col-span-10 mt-20">
                <div className="flex">
                    <div className="flex flex-row text-3xl">
                        <FaPaypal className="text-orange-500" />
                        <h3 className="font-bold ml-6 uppercase">Danh sách đơn hàng</h3>
                    </div>
                </div>
                <div className="w-full overflow-auto">
                    <OrderBrandComponent />
                </div>
            </div>
        </div>
    )
}

export default Order