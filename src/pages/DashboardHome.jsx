import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: 'data',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: 'data',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
const DashboardHome = () => {

    return (
        <>
            <section>
                <div className="flex flex-wrap gap-16 justify-center">
                    <div className="card w-1/5 hover:bg-orange-500 bg-orange-400 py-10 px-5 rounded shadow">
                        <h4 className="text-2xl font-bold text-white">Total Student</h4>
                        <h4 className="text-2xl font-bold text-white">559</h4>
                    </div>
                    <div className="card w-1/5 hover:bg-green-500 bg-green-400 py-10 px-5 rounded shadow">
                        <h4 className="text-2xl font-bold text-white">Total Student</h4>
                        <h4 className="text-2xl font-bold text-white">559</h4>
                    </div>
                    <div className="card w-1/5 hover:bg-amber-500 bg-amber-400 py-10 px-5 rounded shadow">
                        <h4 className="text-2xl font-bold text-white">Total Student</h4>
                        <h4 className="text-2xl font-bold text-white">559</h4>
                    </div>
                    <div className="card w-1/5 hover:bg-sky-500 bg-sky-400 py-10 px-5 rounded shadow">
                        <h4 className="text-2xl font-bold text-white">Total Student</h4>
                        <h4 className="text-2xl font-bold text-white">559</h4>
                    </div>
                </div>
            </section>
            <section className="my-10">
                <div className="flex">
                    <div className="w-9/12">
                        <Bar options={options} data={data} />
                    </div>
                    <div className="w-3/12 shadow bg-slate-100 mx-5">
                        <h4 className="text-md font-semibold uppercase text-center py-4 text-gray-700">Top District</h4>
                        <div className="flex flex-col mx-auto w-full items-center justify-center">
                            <ul className="flex flex-col">
                                <li className="flex flex-row mb-2">
                                    <div className="shadow select-none cursor-pointer bg-white dark:bg-gray-800 flex flex-1 items-center p-4">
                                        <div className="flex-1 pl-1 md:mr-16">
                                            <div className="text-gray-600 dark:text-gray-200 text-sm">
                                                Jhenaidah
                                            </div>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-200 text-xs">
                                            6:00 AM
                                        </div>
                                    </div>
                                </li>
                                <li className="flex flex-row mb-2">
                                    <div className="shadow select-none cursor-pointer bg-white dark:bg-gray-800 flex flex-1 items-center p-4">
                                        <div className="flex-1 pl-1 md:mr-16">
                                            <div className="text-gray-600 dark:text-gray-200 text-sm">
                                                Dhaka
                                            </div>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-200 text-xs">
                                            6:00 AM
                                        </div>
                                    </div>
                                </li>
                                <li className="flex flex-row mb-2">
                                    <div className="shadow select-none cursor-pointer bg-white dark:bg-gray-800 flex flex-1 items-center p-4">
                                        <div className="flex-1 pl-1 md:mr-16">
                                            <div className="text-gray-600 dark:text-gray-200 text-sm">
                                            Chittagong
                                            </div>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-200 text-xs">
                                            6:00 AM
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DashboardHome;