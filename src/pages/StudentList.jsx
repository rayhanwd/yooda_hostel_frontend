import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';


const StudentList = () => {
  //Student(id, fullName, roll, age, class, hall, status)
  const [students, setStudent] = useState([]);
  const [count, setCount] = useState(0);
  const [stdId, setStdID] = useState('');
  const [name, setName] = useState('');
  const [roll, setRoll] = useState(null);
  const [age, setAge] = useState(null);
  const [Class, setClass] = useState('');
  const [HallName, setHallName] = useState('');
  const [status, setStatus] = useState('');
  const [edit, setEdit] = useState('');
  const [editStudent, setEditStudent] = useState();

  const [loading, setLoading] = useState('');

  const fetchFood = async (count) => {
    try {
      const res = await axios.get(`https://yoodahostel.herokuapp.com/api/students?page=${count}`,
        {
          headers: {
            token: JSON.parse(localStorage.getItem('token'))
          }
        });
      setStudent(res.data.students)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchFood(count)
  }, [count]);
  //edit handler 
  const editHandler = (std) => {
    setEdit(true);
    setEditStudent(std);
  }
  // edit student
  const data = {
    id: stdId,
    fullName: name,
    roll: roll,
    age: age,
    class: Class,
    hall: HallName,
    status: status,
  }
  const EditStudent = async () => {
    setLoading(true)
    try {
      const res = await axios({
        method: 'put',
        url: `https://yoodahostel.herokuapp.com/api/foods/${editStudent._id}`,
        data: data,
        headers: {
          token: JSON.parse(localStorage.getItem('token'))
        }
      });

      if (res) {
        setLoading(false);
        setEdit(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-100">
      <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-xl font-bold">
            Student List
          </h2>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className=" relative ">
                <input type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="filter" />
              </div>
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200" type="submit">
                Filter
              </button>
            </form>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Student Id
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Name
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Roll
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Age
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Class
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Hall
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((Student, index) => (
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {Student.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {Student.fullName}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {Student.roll}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {Student.age}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {Student.class}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {Student.hall}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {Student.status}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button onClick={() => editHandler(Student)} className="px-5 py-5 text-green-600 hover:text-green-900">
                        Edit
                      </button>
                      <button className="px-5 py-5 text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="flex items-center">
                <button onClick={() => count > 0 && setCount(prevCount => prevCount - 1)} type="button" className="w-full p-3 border rounded-l-full text-gray-600 bg-white hover:bg-gray-100">
                  <MdArrowLeft className="text-md" />
                </button>
                <button onClick={() => setCount(1)} type="button" className="w-full px-4 py-2 border-t border-b text-base text-green-500 bg-white hover:bg-gray-100 ">
                  1
                </button>
                <button onClick={() => setCount(2)} type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                  2
                </button>
                <button onClick={() => setCount(3)} type="button" className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                  3
                </button>
                <button onClick={() => setCount(4)} type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                  4
                </button>
                <button onClick={() => count >= 0 && setCount(prevCount => prevCount + 1)} type="button" className="w-full p-3 border-t border-b border-r  rounded-r-full text-gray-600 bg-white hover:bg-gray-100">
                  <MdArrowRight className="text-md" />
                </button>
              </div>
            </div>
          </div>
          {/* edit stduent */}

          {
            edit &&
            <div className="my-10 top-16 w-3/6 left-90 bg-white shadow-lg py-10 px-20 absolute">
              <div className="text-right">
                <button className="ml-auto" onClick={() => setEdit(false)}><IoMdClose className="text-right text-xl" /></button>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="relative px-2 w-1/2">
                  <label for="name" className="block text-md py-3 font-medium text-gray-700">
                    Student ID :
                  </label>
                  <input onChange={(e) => setStdID(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" defaultValue={editStudent.id} placeholder="student id" />
                </div>
                <div className="relative px-2 w-1/2">
                  <label for="name" className="block text-md py-3 font-medium text-gray-700">
                    Full Name :
                  </label>
                  <input onChange={(e) => setName(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" defaultValue={editStudent.fullName} placeholder="student full name" />
                </div>
                <div className="relative px-2 w-1/2">
                  <label for="name" className="block text-md py-3 font-medium text-gray-700">
                    Roll Number :
                  </label>
                  <input onChange={(e) => setRoll(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" defaultValue={editStudent.roll} placeholder="student's roll number" />
                </div>
                <div className="relative px-2 w-1/2">
                  <label for="name" className="block text-md py-3 font-medium text-gray-700">
                    Age :
                  </label>
                  <input onChange={(e) => setAge(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" defaultValue={editStudent.age} placeholder="student's age" />
                </div>
                <div className="relative px-2 w-1/2">
                  <label for="name" className="block text-md py-3 font-medium text-gray-700">
                    Class :
                  </label>
                  <input onChange={(e) => setClass(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" defaultValue={editStudent.class} placeholder="student's class name" />
                </div>
                <div className="relative px-2 w-1/2">
                  <label for="name" className="block text-md py-3 font-medium text-gray-700">
                    Hall Name :
                  </label>
                  <input onChange={(e) => setHallName(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" defaultValue={editStudent.hall} placeholder="student's hall name" />
                </div>
                <div className="relative px-2 w-1/2">
                  <label for="id" className="block text-md py-3 font-medium text-gray-700">
                    Status :
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
              </div>
              <button onClick={() => EditStudent()} type="button" className="my-4 mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default StudentList;