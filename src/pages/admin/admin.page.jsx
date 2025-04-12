import React from 'react';
// import { useGetOrdersQuery } from '@/lib/api';
import OrderCard from '@/components/OrderCard';
import AdminOrders from './adminOrders.page';

const AdminPage = () => {
// //   const { data: orders, error, isLoading } = useGetOrdersQuery();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-center">All Orders</h3>
      <AdminOrders />
    </div>
  );
};

export default AdminPage;
