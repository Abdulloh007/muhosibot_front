import React from 'react';
import Header from '@/components/header';
import Notify from '@/components/core/AllComponent/notify'
import Form from '@/components/core/addDocumentCom/form';

const Home = () => {
  return (
    <div className="flex">
      <Header />
      <main className="flex-1 pt-4 pb-12 px-16 ml-24 z-0">
        <Notify />
        <Form />
      </main>
    </div>
  );
};

export default Home;
