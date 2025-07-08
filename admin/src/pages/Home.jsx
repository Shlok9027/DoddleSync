import React from 'react';
import LatestInquiries from './LatestInquiries';
import SideBar from '../components/SideBar';


const Home = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <SideBar />
      <div className="flex-1">
        <LatestInquiries />
      </div>
    </div>
  );
};

export default Home;