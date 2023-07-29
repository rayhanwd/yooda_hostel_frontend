import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';


const StudentList = () => {

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
  const [deleted, setDeleted] = useState(false);
  const [deletedStudent, setDeletedStudent] = useState();
  const [loading, setLoading] = useState('');
  const [searchtext, setsearchText] = useState('');
  const [notfound, setnotfound] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(false);


  const fecthStudents = async () => {
    setnotfound(false);
    setSearch(false);
    try {
      const res = await axios.get(`http://localhost:5000/students?page=${count}`,
        {
          headers: {
            token: JSON.parse(localStorage.getItem('token'))
          }
        });
      setStudent(res.data.data);
      setTotalPages(res.data.total);

      if (res.data.data.length === 0) {
        setnotfound(true);
      }
      else {
        setStudent(res.data.data);
        setsearchText('');
        setnotfound(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fecthStudents(count)
  }, [count, edit, deleted]);

  const fecthStudentsBySearch = async () => {
    setnotfound(false);
    setSearch(false);
    try {
      const res = await axios.get(`http://localhost:5000/students?name=${searchtext}&page=${count}`, {
        headers: {
          token: JSON.parse(localStorage.getItem('token')),
        }
      });
      if (res.data.data.length === 0) {
        setnotfound(true);
      }
      else {
        setStudent(res.data.data);
        setsearchText('');
        setnotfound(false);
        setSearch(true);
      }

    } catch (error) {
      console.error(error);
    }
  }


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
        url: `http://localhost:5000/students/${editStudent._id}`,
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

  const handleDeleteStudent = (std) => {
    setDeletedStudent(std);
    setDeleted(true);
  }


  const DeleteStudent = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:5000/students/${deletedStudent._id}`,
        data: data
      });

      if (res) {
        setLoading(false);
        setEdit(false);
        setDeleted(false);
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
            <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className=" relative ">
                <input onChange={(e) => setsearchText(e.target.value)} type="text" className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="search by name" value={searchtext} />
              </div>
              {
                search ?
                  <button onClick={() => fecthStudents()} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
                    Reset
                  </button> :
                  <button onClick={() => fecthStudentsBySearch()} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
                    Filter
                  </button>
              }
            </div>
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
                {!notfound ? students.map((Student, index) => (
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
                      <button onClick={() => handleDeleteStudent(Student)} className="px-5 py-5 text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                )) :
                  <h6>Data not found</h6>
                }
              </tbody>
            </table>
            <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="flex items-center">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pg, index) => (
                  <button onClick={() => setCount(pg - 1)} type="button" className="w-full px-4 py-2 border-t border-b text-base text-green-500 bg-white hover:bg-gray-100">
                    {pg}
                  </button>
                ))}
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
      <div className={`${!deleted && "hidden"} absolute top-56 left-26 shadow-lg p-4 bg-white w-1/2 m-auto`}>
        <p className="text-center text-lg font-medium py-6">Are you sure? To remove this</p>
        <div className="flex items-center justify-center">
          <button className="text-white py-2 px-6 rounded-sm mr-10 bg-orange-600" onClick={() => DeleteStudent()}>Yes</button>
          <button className="text-white py-2 px-6 rounded-sm bg-orange-600" onClick={() => setDeleted(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;