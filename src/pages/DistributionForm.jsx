import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DistributionForm = () => {

    const [distributionData, setDistributionData] = useState([]);
    const [search, setSearchval] = useState('');
    const [created, setCreated] = useState(null);
    const [currentdate, setCurrentDate] = useState(null);
    const [food, setFood] = useState([]);

    const fetchDistributionData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));

            const response = await axios.post('http://localhost:5000/distribution/data', { date: currentdate }, {
                headers: {
                    token: token
                },
            });

            if (response.data.data.length === 0) {
                setCreated(true);
            } else {
                setDistributionData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching distribution data:', error);
        }
    };
    const fetchFood = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/foods/all`, {
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                }
            });
            setFood(res.data.foods);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchFood()
    }, []);

    useEffect(() => {
        fetchDistributionData();
    }, []);

    useEffect(() => {
        const today = new Date();
        const formetted = today.toISOString().split('T')[0];
        setCurrentDate(formetted);
    }, []);


    const searchDistributionData = async () => {
        if (search === "") {
            return
        }
        try {
            const response = await axios.get(`http://localhost:5000/search?name=${search}`, {
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                },
            });
            console.log(response)
            setDistributionData(response.data.data);
        } catch (error) {
            console.error('Error fetching distribution data:', error);
        }
    };

    const createdForm = async () => {
        try {
            const response = await axios.post('http://localhost:5000/distribution/create', {
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                },
            });
            setDistributionData(response.data.data);
        } catch (error) {
            console.error('Error fetching distribution data:', error);
        }
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-100">
            <div
                className="py-8"
            >
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="text-xl font-bold">Distribution List</h2>
                    <div className="text-end">
                        <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                            <div className="relative">
                                <input
                                    value={search}
                                    type="text"
                                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                    placeholder="search by student name"
                                    onChange={(e) => setSearchval(e.target.value)}
                                />
                            </div>
                            <button onClick={() => searchDistributionData()} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
                {distributionData.length === 0 ? (
                    <h6>Loading...</h6>
                ) : (
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow " style={{ scrollBehavior: 'smooth' }}>
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                            Date
                                        </th>
                                        <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                            Student name
                                        </th>

                                        <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                            Food name
                                        </th>
                                        <th scope="col" className="py-3 bg-white border-b border-gray-200 text-gray-800  text-sm uppercase font-normal text-center">
                                            Meal information
                                        </th>
                                        <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    22-22-22
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    Kazi Rayhan
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    Vegtable
                                                </p>
                                            </div>
                                        </td>
                                        <table className='mx-auto'>
                                            <thead>
                                                <tr>
                                                    <th className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                Breakfast
                                                            </p>
                                                        </div>
                                                    </th>
                                                    <th className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                Lunch
                                                            </p>
                                                        </div>
                                                    </th>
                                                    <th className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                Dinner
                                                            </p>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="px-5 py-5  bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                0
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5   bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                0
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5   bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                0
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    0
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* create distribution form */}

                {
                    created &&
                    <div className="my-10 w-3/6 bg-white py-10 px-20">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="relative px-2 w-1/2">
                                <label for="name" className="block text-md py-3 font-medium text-gray-700">
                                    Set Date :
                                </label>
                                <input type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="" />
                            </div>
                        </div>
                        <div className="relative px-2 w-1/2">
                            <label for="id" className="block text-md py-3 font-medium text-gray-700">
                                Select today's food menu :
                            </label>
                            <select onChange={(e) => setStatus(e.target.value)} className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" name="animals" defaultValue={editStudent.status}>
                                <option value="" disabled selected>
                                    Select an option
                                </option>
                                <option value="active">
                                    Active
                                </option>
                                <option value="inActive">
                                    InActive
                                </option>
                            </select>
                        </div>
                        <button onClick={() => createdForm()} type="button" className="my-4 mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                            {/* {loading ? "Loading..." : "Save"} */}
                            submit
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default DistributionForm;
