import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import logo from '../../assets/bb.png';
import { FaArrowRight } from "react-icons/fa";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User logged out Successfully.')
            })
            .catch(error => console.error(error))
    }

    // Theme toggling logic
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    const handleToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const links = (
        <>
            <li><NavLink to="/" className="text-white hover:text-gray-300">Home</NavLink></li>
            <li><NavLink to="/addBook" className="text-white hover:text-gray-300">Add Book</NavLink></li>
            <li><NavLink to="/allBook" className="text-white hover:text-gray-300">All Books</NavLink></li>
            <li><NavLink to="/myList" className="text-white hover:text-gray-300">Borrowed Books</NavLink></li>
            <li><NavLink to="/bookReview" className="text-white hover:text-gray-300">Book Review</NavLink></li>
            <li>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <input type="checkbox" onClick={handleToggle} checked={theme === "dark"} className="toggle" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </div>
            </li>
        </>
    );

    return (
        // <div className="navbar bg-gradient-to-r from-red-300 via-red-500 to-blue-300 text-white fixed w-full z-10 shadow-md h-24">
        <div className="navbar bg-gradient-to-r from-red-300 to-red-500 text-white fixed w-full z-10 shadow-md h-32">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52"> */}
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-red-300 text-black rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="flex items-center">
                    <img className="w-20 h-12 md:w-40 md:h-24 m-4" src={logo} alt="Logo" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex gap-4">
                {user ? (
                    <>
                        <div className="flex items-center gap-2">
                            <p className="text-sm md:text-base">{user.displayName}</p>
                            <div className="tooltip" data-tip={user.displayName}>
                                <img className="w-10 h-10 md:w-14 md:h-14 border-2 border-blue-600 rounded-full" src={user.photoURL} alt="User Profile" />
                            </div>
                        </div>
                        <button onClick={handleLogOut} className="btn btn-info md:btn-lg btn-sm md:w-28">
                            Log out 
                            {/* <FaArrowRight></FaArrowRight> */}
                        </button>
                    </>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login">
                            <button className="btn btn-info btn-sm md:btn-lg md:w-28 ">Log in</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn bg-green-300 md:btn-lg text-blue-700 btn-sm md:w-28">Register</button>
                        </Link>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Header;
