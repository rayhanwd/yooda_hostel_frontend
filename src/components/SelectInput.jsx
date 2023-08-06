import React, { useState } from 'react';

const SelectInput = ({ options, defaultOption, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className="w-48">
      <label
        htmlFor="select-input"
        className="block text-sm font-medium text-gray-700"
      >
        Select Food:
      </label>
      <div className="mt-1 relative">
        <select
          id="select-input"
          className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={selectedOption}
          onChange={handleChange}
        >
           <option>
             select option
            </option>

          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          {/* Customize the arrow icon below, you can use an SVG or Font Awesome */}
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
