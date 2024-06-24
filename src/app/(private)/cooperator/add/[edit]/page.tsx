import React from 'react';
import Sidebar from '@/components/sidebar';
import Topbar from '@/components/core/AllComponent/topbar'
import Form from '@/components/core/addExployerCom/form';

const Home = ({ params }: {params: {edit: string}}) => {
  return (
    <>
      <Sidebar />
      <main className='w-full h-full pl-[100px]'>
        <Topbar />
        <Form id={params.edit}/>
      </main>
    </>
  );
};

export default Home;
