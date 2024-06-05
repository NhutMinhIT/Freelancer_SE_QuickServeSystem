import SidebarComponent from '../../../components/ManagementComponent/SidebarComponent '
import { FaDatabase } from 'react-icons/fa'
import IngredientTypeListComponent from '../../../components/Ingredients/IngredientType/IngredientTypeListComponent'

const IngredientType = () => {
    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
                <div className="md:col-span-2">
                    <SidebarComponent />
                </div>

                <div className="md:col-span-10 mt-20">
                    <div className="flex">
                        <FaDatabase className="text-3xl text-orange-500" />
                        <h3 className="text-3xl font-bold ml-6">Quản lí loại nguyên liệu</h3>
                    </div>
                    <IngredientTypeListComponent />
                </div>
            </div>
        </div>
    )
}

export default IngredientType
