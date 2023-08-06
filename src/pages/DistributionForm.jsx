import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectInput from '../components/SelectInput';


const DistributionForm = () => {

    const [distributionData, setDistributionData] = useState([]);
    const [name, setnameval] = useState('');
    const [food, setFood] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    const [message, setMessage] = useState(null);
    const [createdMessage, setCreatedMessage] = useState(null);



    const optionsMeals = [
        {
            name: "Breakfast"
        },
        {
            name: "Lunch"
        },
        {
            name: "Dinner"
        }
    ];

    const handleSelectChange1 = (selectedValue) => {
        setSelectedOption1(selectedValue);
    };
    const handleSelectChange2 = (selectedValue) => {
        setSelectedOption2(selectedValue);
    };
    const handleSelectChange3 = (selectedValue) => {
        setSelectedOption3(selectedValue);
    };


    const createForm = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const data = {
                foodName: `${selectedOption2 || ''} ${selectedOption3 || ''}`,
                meals: selectedOption1
            }
            const response = await axios.post('http://localhost:5000/distribution/create', {
                foodName: data.foodName,
                meals: data.meals,
            }, {
                headers: {
                    token: token
                },
            });

            if (response.status === 201) {
                fetchDistributionData();
                setCreatedMessage(response.data.message);
                setTimeout(() => {
                    setIsOpen(false);
                    setCreatedMessage(null);
                    setSelectedOption1(null);
                    setSelectedOption2(null);
                    setSelectedOption3(null);
                }, 3000)
            }
            else {
                setCreatedMessage(response.data.message);
                setTimeout(() => {
                    setIsOpen(false);
                    setCreatedMessage(null);
                    setSelectedOption1(null);
                    setSelectedOption2(null);
                    setSelectedOption3(null);
                }, 3000)
            }
        } catch (error) {
            console.error('Error fetching distribution data:', error);
        }

    };

    const fetchDistributionData = async () => {

        try {
            const token = JSON.parse(localStorage.getItem('token'));

            const response = await axios.get('http://localhost:5000/distribution/data', {
                headers: {
                    token: token
                },
            });

            if (response.data.data.length > 0) {
                setDistributionData(response.data.data);
            }
            else {
                setMessage(response.data.message);
            }

        } catch (error) {
            console.error('Error fetching distribution data:', error);
        }
    };
    const getdatabyname = async () => {

        if (!name) {
            return
        }
        try {
            const token = JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`http://localhost:5000/distribution/search?name=${name}`, {
                headers: {
                    token: token
                },
            });

            if (response.data.data.length > 0) {
                setDistributionData(response.data.data);
            }
            else {
                setMessage(response.data.message);
            }

        } catch (error) {
            console.error('Error fetching distribution data:', error);
        }
    }

    const fetchFood = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/foods/all`, {
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                }
            });
            setFood(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const updateMealData = async (id) => {

        try {
            const token = JSON.parse(localStorage.getItem('token'));

            const response = await axios.put(`http://localhost:5000/distribution/update/${id}`, { update: "d" }, {
                headers: {
                    token: token
                },
            });

            if (response.data.data.length > 0) {
                setDistributionData(response.data.data);
            }
            else {
                setMessage(response.data.message);
            }

        } catch (error) {
            console.error('Error fetching distribution data:', error);
        }
    }

    useEffect(() => {
        fetchFood()
    }, []);

    useEffect(() => {
        fetchDistributionData();
    }, []);


    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-100">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="text-xl font-bold">Distribution Form</h2>
                    <button onClick={() => setIsOpen(true)} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
                        Create form
                    </button>

                    <div className="text-end">
                        <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                            <div className="relative">
                                <input
                                    value={name}
                                    type="text"
                                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                    placeholder="name by student name"
                                    onChange={(e) => setnameval(e.target.value)}
                                />
                            </div>
                            <button onClick={() => getdatabyname()} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
                {distributionData.length > 0 ? (
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
                                        <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                            Meal
                                        </th>
                                        <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                            Served
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {distributionData.map((data) => (
                                        <tr key={data._id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <p className="text-gray-900 whitespace-no-wrap">{new Date(data.date).toLocaleDateString('en-GB').split('/').join('-')}</p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <p className="text-gray-900 whitespace-no-wrap">{data.student.fullName}</p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <p className="text-gray-900 whitespace-no-wrap">{data.recepe}</p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <p className="text-gray-900 whitespace-no-wrap">{data.meal === "0" ? "Breakfast" : data.meal === "1" ? "Lunch" : "Dinner"}</p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button onClick={() => updateMealData(data._id)} className="flex items-center bg-green-600 shadow-md hover:bg-green-700 text-white px-5 py-2">
                                                    <p className=" whitespace-no-wrap">{data.isServed ? "Yes" : "No"}</p>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) :
                    <h6 className='text-center py-20'>{message}</h6>
                }
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-gray-900 opacity-80"></div>
                    <div className="bg-white p-6 rounded shadow-lg relative">
                        <h2 className="text-2xl font-bold mb-4">Make a recepie by food</h2>
                        <p>
                            You are making a recepice for Breakfast, Lunch, Dinner by food items
                        </p>
                        <div className="container mx-auto my-8 flex justify-between gap-4">
                            <div>
                                <SelectInput
                                    options={optionsMeals}
                                    selectedValue={selectedOption1}
                                    onChange={handleSelectChange1}
                                />
                                <p className="mt-4">Selected Meals: {selectedOption1}</p>
                            </div>
                            <div>
                                <SelectInput
                                    options={food}
                                    selectedValue={selectedOption2}
                                    onChange={handleSelectChange2}
                                />
                                <p className="mt-4">Selected Food: {selectedOption2}</p>
                            </div>
                            <div>
                                <SelectInput
                                    options={food}
                                    selectedValue={selectedOption3}
                                    onChange={handleSelectChange3}
                                />
                                <p className="mt-4">Selected Food: {selectedOption3}</p>
                            </div>
                        </div>
                        <p className="mt-4">
                            Generated recipe: {`${selectedOption1 || ''} ${selectedOption2 || ''} ${selectedOption3 || ''}`}
                        </p>
                        <button onClick={() => createForm(0)} className="my-4 flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
                            Create Form
                        </button>
                        {createdMessage && <h6>{createdMessage}</h6>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DistributionForm;
