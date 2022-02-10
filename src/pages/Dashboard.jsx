import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddFood from './AddFood';
import AddStudent from './AddStudent';
import DistributionForm from './DistributionForm';
import StudentList from './StudentList';
import DashboardHome from './DashboardHome';
import FoodList from './FoodList';
import AccountInfo from './AccountInfo';

const Dashboard = () => {
  return (
    <>
      <Header />
      <SideBar />
      <main>
        <Routes>
        <Route path="/" element={<DashboardHome />} />
          <Route path="addfood" element={<AddFood />} />
          <Route path="foodlist" element={<FoodList />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="studentlist" element={<StudentList />} />
          <Route path="distributionform" element={<DistributionForm />} />
          <Route path="accountinformation" element={<AccountInfo />} />
        </Routes>
      </main>
      <Footer />
    </>

  );
}

export default Dashboard;