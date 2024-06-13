import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent "
import TemplateStepList from "../../../components/TemplateSteps/TemplateStepList"

const TemplateStep = () => {
    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
                <div className="md:col-span-2">
                    <SidebarComponent />
                </div>

                <div className="md:col-span-10 mt-20">
                    <TemplateStepList />
                </div>
            </div>
        </div>
    )
}

export default TemplateStep