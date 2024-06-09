import React from 'react';
import Sidebar from '@/components/sidebar';
import Topbar from '@/components/core/AllComponent/topbar'
import Form from '@/components/core/addDocumentCom/form';

const Home = () => {
  return (
    <>
      <Sidebar />
      <main className="flex-1 pt-4 pb-12 px-16 ml-24 z-0">
        <Topbar />
        <Form />
      </main>
    </>
  );
};

export default Home;
