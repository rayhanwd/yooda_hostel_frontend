import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const FoodList = () => {
  const [foods, setFood] = useState([]);
  const [count, setCount] = useState(0);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deletedFood, setDeletedFood] = useState();
  const [editFood, setEditFood] = useState();
  const [foodId, setFoodId] = useState(editFood?.id);
  const [foodName, setFoodName] = useState(editFood?.name);
  const [foodPrice, setFoodPrice] = useState(editFood?.price);
  const [loading, setLoading] = useState('');
  const [searchtext, setsearchText] = useState('');
  const [notfound, setnotfound] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(false);



  const fetchFood = async () => {
    setnotfound(false);
    setSearch(false)
    try {
      const res = await axios.get(`http://localhost:5000/foods?page=${count}`, {

        headers: {
          token: JSON.parse(localStorage.getItem('token')),
        }
      });
      setFood(res.data.foods);
      setTotalPages(res.data.total);

      if (res.data.foods.length === 0) {
        setnotfound(true);
      }
      else {
        setFood(res.data.foods);
        setsearchText('');
        setnotfound(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchFood()
  }, [count, edit, deleted]);


  const fetchFoodBySearch = async () => {
    setnotfound(false);
    setSearch(false);
    try {
      const res = await axios.get(`http://localhost:5000/foods?foodname=${searchtext}&page=${count}`, {
        headers: {
          token: JSON.parse(localStorage.getItem('token')),
        }
      });

      if (res.data.foods.length === 0) {
        setnotfound(true);
      } else {
        setFood(res.data.foods);
        setsearchText('');
        setnotfound(false);
        setSearch(true);
      }

    } catch (error) {
      console.error(error);
    }
  }

  // edit food handler

  const editHandler = (food) => {
    setEdit(true);
    setEditFood(food)
  }

  const data = {
    id: foodId,
    name: foodName,
    price: foodPrice,
  }

  const EditFood = async () => {
    setLoading(true)
    try {
      const res = await axios({
        method: 'put',
        url: `http://localhost:5000/foods/${editFood._id}`,
        data: data
      });

      if (res) {
        setLoading(false);
        setEdit(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }
  const handleDeleteFood = (food) => {
    setDeletedFood(food);
    setDeleted(true);
  }
  const DeleteFood = async () => {
    setLoading(true)
    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:5000/foods/${deletedFood._id}`,
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
    <section className="container mx-auto px-4 sm:px-8 max-w-100">
      <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-xl font-bold">
            Food List
          </h2>
          <div className="text-end">
            <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className=" relative ">
                <input onChange={(e) => setsearchText(e.target.value)} type="text" className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="search by name" value={searchtext} />
              </div>
              {
                search ?
                  <button onClick={() => fetchFood()} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
                    Reset
                  </button> :
                  <button onClick={() => fetchFoodBySearch()} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
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
                    Food ID
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Food Name
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Food Price $
                  </th>
                
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!notfound ?
                  foods.map((food, index) => (
                    <tr key={food.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {food.id}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {food.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {food.price}
                        </p>
                      </td>
                      
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <button onClick={() => editHandler(food)} className="text-green-600 hover:text-green-900 mx-2">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteFood(food)} className="text-red-600 hover:text-red-700 ml-6">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) :
                  <h6>Data not found</h6>
                }
              </tbody>
            </table>
            {<div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="flex items-center">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pg, index) => (
                  <button onClick={() => setCount(pg - 1)} type="button" className="w-full px-4 py-2 border-t border-b text-base text-green-500 bg-white hover:bg-gray-100">
                    {pg}
                  </button>
                ))}
              </div>
            </div>}

            {edit && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div onClick={() => setEdit(false)} className="fixed inset-0 bg-gray-900 opacity-80"></div>
                <div className="bg-white p-6 rounded shadow-lg relative w-6/12">
                  <div className="text-right">
                    <button className="ml-auto" onClick={() => setEdit(false)}><IoMdClose className="text-right text-xl" /></button>
                  </div>
                  <div className="relative my-2">
                    <label for="id" className="block text-md py-3 font-medium text-gray-700">
                      Food ID :
                    </label>
                    <input onChange={(e) => setFoodId(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Type the food item id" defaultValue={editFood.id} />
                  </div>
                  <div className="relative my-4">
                    <label for="name" className="block text-md py-3 font-medium text-gray-700">
                      Food Name :
                    </label>
                    <input onChange={(e) => setFoodName(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Food name" defaultValue={editFood.name} />
                  </div>
                  <div className="relative my-4">
                    <label for="price" className="block text-md py-3 font-medium text-gray-700">
                      Food Price :
                    </label>
                    <input onChange={(e) => setFoodPrice(e.target.value)} type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Food price" defaultValue={editFood.price} />
                  </div>
                  <button onClick={() => EditFood()} type="button" className=" my-4 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                    {loading ? "Loading" : "Save"}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
        {deleted && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div onClick={() => setDeleted(false)} className="fixed inset-0 bg-gray-900 opacity-80"></div>
            <div className="bg-white p-6 rounded shadow-lg relative">
              <p className="text-center text-lg font-medium py-6">Are you sure? To remove this</p>
              <div className="flex items-center justify-center">
                <button className="text-white py-2 px-6 rounded-sm mr-10 bg-orange-600" onClick={() => DeleteFood()}>Yes</button>
                <button className="text-white py-2 px-6 rounded-sm bg-orange-600" onClick={() => setDeleted(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodList;