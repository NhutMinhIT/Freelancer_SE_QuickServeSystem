// SidebarComponent.tsx
import { Link, useLocation } from 'react-router-dom';
import menu from './listMenu';
import NavbarComponent from './NavbarComponent';
import { useAppSelector } from '../../services/store/store';

const SidebarComponent = () => {
  const location = useLocation();
  const activeMenuItem = menu.adminMenu.find(item => item.url === location.pathname);
  const { account } = useAppSelector((state) => state.account);

  return (
    <div className='flex'>
      <div className="w-56 bg-gray-800 fixed h-full">
        <div className='my-2 mb-4'>
          <h1 className="text-2xl font-bold ml-4 text-white-500">{activeMenuItem ? activeMenuItem.title : 'Admin Dashboard'}</h1>
        </div>
        <hr />
        {account?.roles[0] === 'Admin' && menu.adminMenu.map((item, index) => (
          <ul className='mt-3 text-white-500 font-bold' key={index}>
            <Link to={item.url} className=''>
              <li className={`mb-2 gap-6 rounded hover:shadow hover:bg-orange-500 py-2 cursor-pointer flex ${item.url === location.pathname ? 'text-orange-500' : ''}`}>
                <img src={item.icon} className='w-6 h-6 inline-block ml-2' />
                <span>{item.title}</span>
              </li>
            </Link>
          </ul>
        ))}
        {account?.roles[0] === 'Store_Manager' && menu.storeManagementMenu.map((item, index) => (
          <ul className='mt-3 text-white-500 font-bold' key={index}>
            <Link to={item.url} className=''>
              <li className={`mb-2 gap-6 rounded hover:shadow hover:bg-orange-500 py-2 cursor-pointer flex ${item.url === location.pathname ? 'text-orange-500' : ''}`}>
                <img src={item.icon} className='w-6 h-6 inline-block ml-2' />
                <span>{item.title}</span>
              </li>
            </Link>
          </ul>
        ))}
        {account?.roles[0] === 'Brand_Manager' && menu.brandManagementMenu.map((item, index) => (
          <ul className='mt-3 text-white-500 font-bold' key={index}>
            <div className='group'>
              <Link to={item.url}>
                <li className={`mb-2 gap-6 rounded hover:shadow hover:bg-orange-500 py-2 cursor-pointer flex ${item.url === location.pathname ? 'text-orange-500' : ''}`}>
                  <i className={item.icon} />
                  <span>{item.title}</span>
                </li>
              </Link>
              {item.submenu && item.submenu.map((subItem, subIndex) => (
                <div className='submenu hidden group-hover:block'>
                  <Link to={subItem.url} className='' key={subIndex}>
                    <li className={`mb-2 ml-8 rounded hover:shadow hover:bg-orange-500 hover:transition-opacity transition-all duration-500 py-2 cursor-pointer flex ${subItem.url === location.pathname ? 'text-orange-500' : ''} pl-4`}>
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
  )
}

export default SidebarComponent;