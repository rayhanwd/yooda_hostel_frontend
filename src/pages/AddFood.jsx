import React from 'react';

const AddFood = () => {
  return (
    <section className="container mx-auto px-4 sm:px-8 max-w-100">
      <h4 className="text-xl font-bold">Add new food item</h4>
      <div className="my-10">
        <div className="relative my-2">
          <label for="id" className="block text-md py-3 font-medium text-gray-700">
            Food ID :
          </label>
          <input type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Type the food item id" />
        </div>
        <div className="relative my-4">
          <label for="name" className="block text-md py-3 font-medium text-gray-700">
            Food Name :
          </label>
          <input type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Food name" />
        </div>
        <div className="relative my-4">
          <label for="price" className="block text-md py-3 font-medium text-gray-700">
            Food Price :
          </label>
          <input type="text" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Food price" />
        </div>
        <button type="button" className=" my-4 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
          Save
        </button>
      </div>
    </section>
  );
};

export default AddFood;