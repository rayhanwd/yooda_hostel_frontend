import React from 'react';

const AccountInfo = () => {

    return (
        <section className="container mx-auto px-4 sm:px-8 max-w-100">
            <h4 className="text-xl font-bold">Account Info</h4>
            <div className="flex my-10">
                <div className="w-4/12 mt-10 ">
                    <img className="rounded-lg shadow w-28" src={""} alt="" srcset="" />
                </div>
                <div className="w-7/12">
                    <div className="relative my-2">
                        <label for="id" className="block text-md py-3 font-medium text-gray-700">
                            Name :
                        </label>
                        <input type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" value={"Admin"} placeholder="Name..." />
                    </div>
                    <div className="relative my-4">
                        <label for="email" className="block text-md py-3 font-medium text-gray-700">
                            Email :
                        </label>
                        <input type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" defaultValue={"admin@gmail.com"} placeholder="Email.." />
                    </div>
                    <div className="relative my-4">
                        <label for="password" className="block text-md py-3 font-medium text-gray-700">
                            Password :
                        </label>
                        <input type="password" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" value={'********'} placeholder="Password.." />
                    </div>
                    <button type="button" className=" my-4 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                        Update
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AccountInfo;