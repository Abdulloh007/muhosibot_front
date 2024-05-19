import React from 'react';
import Header from '@/Components/header';
import Notify from '@/Components/core/AllComponent/notify'
import Form from '@/Components/core/addExployerCom/form';

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
