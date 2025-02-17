import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { useGetOrderByUserQuery } from "@/lib/api";
import { SignOutButton } from "@clerk/clerk-react";
import OrderCard from "@/components/OrderCard";
import { LogOut } from "lucide-react";


function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { data: orders, isLoading: isOrdersLoading, isError: isOrdersError, error: ordersError } = useGetOrderByUserQuery();
   
  if (!isLoaded) {
    return (
      <main>
        <h1>My Account</h1>
        <div>Loading...</div>
      </main>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (isOrdersLoading) {
    return (
      <main>
        <h1>My Account</h1>
        <div>Loading orders...</div>
      </main>
    );
  }

  if (isOrdersError) {
    return (
      <main>
        <h1>My Account</h1>
        <div>Error: {ordersError.message}</div>
      </main>
    );
  }

  return (
    <div className="space-y-8 m-8">
      <div className="bg-white shadow rounded-lg p-6 flex flex-row items-center justify-center">
        <div className="flex justify-between items-center flex-col">
          <div className="flex flex-col items-center gap-4">
          <img src={user?.imageUrl} alt="Profile Image" className="w-24 h-24 rounded-full" />
            <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
            <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="mt-4">
            <SignOutButton>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
                </button>
            </SignOutButton>
            </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-center">My Orders</h3>
        <div className="space-y-4">
          {orders.map((order) => (
    
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AccountPage;