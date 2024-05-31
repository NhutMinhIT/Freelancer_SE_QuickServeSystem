import SidebarComponent from "../../../components/ManagementComponent/SidebarComponent "

const Home = () => {
    return (
        <div>
            <div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
                <div className="md:col-span-2">
                    <SidebarComponent />
                </div>
                <div className="md:col-span-10">
                </div>
            </div>
        </div>
    )
}

export default Home
