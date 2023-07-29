import React from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import { GiBarbecue } from 'react-icons/gi';
import { Link } from 'react-router-dom';
const Header = () => {
    const handleToggle = () => {
        document.body.classList.toggle('toggle');
    }
    return (
        <header className="bg-white dark:bg-gray-800  shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center mx-5">
                    <Link to="/dashboard" className="flex items-center cursor-pointer">
                        <GiBarbecue className="text-4xl mr-3 text-green-600" />
                        <h1 className="text-2xl font-bold mr-12 text-green-600">Yooda Hostel</h1>
                    </Link>
                    <button onClick={() => handleToggle()} className="toggle-sidebar-btn"><FaBars className="text-2xl text-green-600" />
                    </button>
                </div>
                <Link to="accountinformation" className="user_info flex items-center">
                    <h6>Admin</h6>
                    <FaUserCircle className="text-2xl mx-5 text-green-600" />
                </Link>
            </div>
        </header>
    );
};

export default Header;