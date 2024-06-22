// SidebarComponent.tsx
import { Link, useLocation } from "react-router-dom";
import menu from "./listMenu";
import NavbarComponent from "./NavbarComponent";
import { useAppSelector } from "../../services/store/store";

const SidebarComponent = () => {
  const location = useLocation();
  const activeMenuItem = menu.adminMenu.find(
    (item) => item.url === location.pathname,
  );
  const { account } = useAppSelector((state) => state.account);

  return (
    <div className="flex">
      <div className="fixed h-full w-56 bg-gray-800">
        <div className="my-2 mb-4">
          <h1 className="ml-4 text-2xl font-bold text-white-500">
            {activeMenuItem ? activeMenuItem.title : "Admin Dashboard"}
          </h1>
        </div>
        <hr />
        {account?.roles === "Admin" &&
          menu.adminMenu.map((item, index) => (
            <ul className="mt-3 font-bold text-white-500" key={index}>
              <Link to={item.url} className="">
                <li
                  className={`mb-2 flex cursor-pointer gap-6 rounded py-2 hover:bg-orange-500 hover:shadow ${item.url === location.pathname ? "text-orange-500" : ""}`}
                >
                  <img src={item.icon} className="ml-2 inline-block h-6 w-6" />
                  <span>{item.title}</span>
                </li>
              </Link>
            </ul>
          ))}
        {account?.roles === "Store_Manager" &&
          menu.storeManagementMenu.map((item, index) => (
            <ul className="mt-3 font-bold text-white-500" key={index}>
              <Link to={item.url} className="">
                <li
                  className={`mb-2 flex cursor-pointer gap-6 rounded py-2 hover:bg-orange-500 hover:shadow ${item.url === location.pathname ? "text-orange-500" : ""}`}
                >
                  <img src={item.icon} className="ml-2 inline-block h-6 w-6" />
                  <span>{item.title}</span>
                </li>
              </Link>
            </ul>
          ))}
        {account?.roles === "Brand_Manager" &&
          menu.brandManagementMenu.map((item, index) => (
            <ul className="mt-3 font-bold text-white-500" key={index}>
              <div className="group">
                <Link to={item.url}>
                  <li
                    className={`mb-2 flex cursor-pointer gap-6 rounded py-2 hover:bg-orange-500 hover:shadow ${item.url === location.pathname ? "text-orange-500" : ""}`}
                  >
                    <i className={item.icon} />
                    <span>{item.title}</span>
                  </li>
                </Link>
                {item.submenu &&
                  item.submenu.map((subItem, subIndex) => (
                    <div className="submenu hidden group-hover:block">
                      <Link to={subItem.url} className="" key={subIndex}>
                        <li
                          className={`mb-2 ml-8 flex cursor-pointer rounded py-2 transition-all duration-500 hover:bg-orange-500 hover:shadow hover:transition-opacity ${subItem.url === location.pathname ? "text-orange-500" : ""} pl-4`}
                        >
                          <span>{subItem.title}</span>
                        </li>
                      </Link>
                    </div>
                  ))}
              </div>
            </ul>
          ))}
      </div>
      <NavbarComponent />
    </div>
  );
};

export default SidebarComponent;
