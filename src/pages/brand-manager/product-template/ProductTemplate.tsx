import { FaProjectDiagram  } from "react-icons/fa";
import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent ";
import ProductTemplateComponent from "../../../components/ProductTemplateComponent/ProductTemplateComponent";

const ProductTemplate = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
            <div className="md:col-span-2">
                <SidebarComponent />
            </div>

            <div className="md:col-span-10 mt-20">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <FaProjectDiagram  className="text-3xl text-orange-500" />
                        <h3 className="text-3xl font-bold">Quản lí mẫu sản phẩm</h3>
                    </div>
                </div>
            <ProductTemplateComponent />
            </div>
        </div>
    )
}

export default ProductTemplate;
