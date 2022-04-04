import axios from 'axios';
import React, { useState } from 'react';

const AddStudent = () => {
  const [stdId, setStdID] = useState('');
  const [name, setName] = useState('');
  const [roll, setRoll] = useState(null);
  const [age, setAge] = useState(null);
  const [Class, setClass] = useState('');
  const [HallName, setHallName] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState('');

  const data = {
    id: stdId,
    fullName: name,
    roll: roll,
    age: age,
    class: Class,
    hall: HallName,
    status: status,
  }

  const AddStudent = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: `https://yoodahostel.herokuapp.com/api/students`,
        data: data,
        headers: {
          token: JSON.parse(localStorage.getItem('token'))
        }
      });
      if (res) {
        setLoading(false);
        setStdID('');
        setName('');
        setRoll('');
        setAge('');
        setClass('');
        setHallName('');
        setStatus('');
      }
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <section className="container mx-auto px-4 sm:px-8 max-w-100">
      <h4 className="text-xl font-bold">Add new student in list</h4>
      <div className="my-10">
        <div className="flex flex-wrap items-center justify-between">
          <div className="relative px-2 w-1/2">
            <label for="name" className="block text-md py-3 font-medium text-gray-700">
              Student ID :
            </label>
            <input onChange={(e) => setStdID(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="student id" />
          </div>
          <div className="relative px-2 w-1/2">
            <label for="name" className="block text-md py-3 font-medium text-gray-700">
              Full Name :
            </label>
            <input onChange={(e) => setName(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="student full name" />
          </div>
          <div className="relative px-2 w-1/2">
            <label for="name" className="block text-md py-3 font-medium text-gray-700">
              Roll Number :
            </label>
            <input onChange={(e) => setRoll(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="student's roll number" />
          </div>
          <div className="relative px-2 w-1/2">
            <label for="name" className="block text-md py-3 font-medium text-gray-700">
              Age :
            </label>
            <input onChange={(e) => setAge(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="student's age" />
          </div>
          <div className="relative px-2 w-1/2">
            <label for="name" className="block text-md py-3 font-medium text-gray-700">
              Class :
            </label>
            <input onChange={(e) => setClass(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="student's class name" />
          </div>
          <div className="relative px-2 w-1/2">
            <label for="name" className="block text-md py-3 font-medium text-gray-700">
              Hall Name :
            </label>
            <input onChange={(e) => setHallName(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="student's hall name" />
          </div>
          <div className="relative px-2 w-1/2">
            <label for="id" className="block text-md py-3 font-medium text-gray-700">
              Status :
            </label>
            <select onChange={(e) => setStatus(e.target.value)} className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" name="animals">
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
        </div>
        <button onClick={() => AddStudent()} type="button" className="my-4 mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </section>
  );
};

export default AddStudent;