import React from 'react';
import Sidebar from '@/components/sidebar';
import Topbar from '@/components/core/AllComponent/topbar'
import Form from '@/components/core/addDocumentCom/form';

const Home = () => {
  return (
    <>
      <Sidebar />
      <main className="w-full h-full pl-[100px]">
        <Topbar />
        <Form />
      </main>
    </>
  );
};

export default Home;
