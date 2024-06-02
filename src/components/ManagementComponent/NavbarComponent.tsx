import { FaSearch, FaUserCircle } from "react-icons/fa";
import Logo from '../../assets/logo/icon-web.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../services/store/store";
import { logoutUser } from "../../services/features/authSlice";

const NavbarComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = (data: any | undefined) => {
        dispatch(logoutUser(data))
            .unwrap()
            .then(() => {
                navigate('/login');
            });
    };

    return (
        <nav className="bg-gray-900 py-3 flex justify-between w-full fixed z-50">
            <div className="flex items-center text-xl">
                <img src={Logo} alt="Logo" className="w-10 h-10 sm:w-10 sm:h-10" />
                <span className="text-white-500 font-semibold ml-5">Quick Serve Management</span>
            </div>
            <div className="flex items-center gap-x-5">
                <div className="relative md:w-65">
                    <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
                        <button className="p-1 focus:outline-none text-white md:text-black">
                            <FaSearch />
                        </button>
                    </span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block"
                    />
                </div>
                <div className="relative">
                    <button className="text-white-500 group" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <FaUserCircle className="w-6 h-6 mt-1 mr-6" />
                        {isMenuOpen && (
                            <div className="z-10 text-left absolute rounded-lg text-black shadow w-32 right-0 top-full">
                                <ul className="text-base text-gray-950 gap-4 p-4 bg-gray-300 mt-3">
                                    <li className="hover:bg-orange-500 rounded-md">
                                        <Link to="/user-profile" onClick={() => setIsMenuOpen(false)}>Hồ sơ</Link>
                                    </li>
                                    <li className="mt-2 hover:bg-orange-500 rounded-md">
                                        <Link
                                            to="/"
                                            style={{ textDecoration: 'none' }}
                                            onClick={handleLogout}
                                        >
                                            Đăng Xuất
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
