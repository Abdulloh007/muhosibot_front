import React from 'react';
import Sidebar from '@/components/sidebar';
import Topbar from '@/components/core/AllComponent/topbar'
import Form from '../_components/form';


const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full h-full pl-[100px]">
        <Topbar />
        <Form />
      </main>
    </div>
  );
};

export default Home;
