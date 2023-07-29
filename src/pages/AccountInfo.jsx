import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountInfo = () => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users/info', {
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                }
            });
            setUserData(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdateClick = async () => {
        try {
          const token = JSON.parse(localStorage.getItem('token'));
      
          const response = await axios.put('http://localhost:5000/users/update', userData, {
            headers: {
              token: token,
            },
          });
      
          setUserData(response.data);
          console.log(response);
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      };
      

    return (
        <section className="container mx-auto px-4 sm:px-8 max-w-100">
            <h4 className="text-xl font-bold">Account Info</h4>
            <div className="flex my-10">
                <div className="w-4/12 mt-10">
                    <img className="rounded-lg shadow w-28" src={""} alt="" srcSet="" />
                </div>
                <div className="w-7/12">
                    <div className="relative my-2">
                        <label htmlFor="id" className="block text-md py-3 font-medium text-gray-700">
                            Name :
                        </label>
                        <input
                            type="text"
                            className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            placeholder="Name..."
                        />
                    </div>
                    <div className="relative my-4">
                        <label htmlFor="email" className="block text-md py-3 font-medium text-gray-700">
                            Email :
                        </label>
                        <input
                            type="text"
                            className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            placeholder="Email.."
                        />
                    </div>
                    <div className="relative my-4">
                        <label htmlFor="password" className="block text-md py-3 font-medium text-gray-700">
                            Password :
                        </label>
                        <input
                            type="password"
                            className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            placeholder="Password.."
                        />
                    </div>
                    <button
                        type="button"
                        className="my-4 py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={handleUpdateClick}
                    >
                        Update
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AccountInfo;
