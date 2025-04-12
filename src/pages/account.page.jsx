import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { useDeleteUserMutation, useGetOrderByUserQuery } from "@/lib/api";
import { SignOutButton } from "@clerk/clerk-react";
import OrderCard from "@/components/OrderCard";
import {
  LogOut,
  User,
  Package,
  Settings,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function AccountPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const {
    data: orders = [],
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useGetOrderByUserQuery();

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.id).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);

      
    }
  };

  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  if (!isLoaded) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-8">
        <User className="h-6 w-6 text-emerald-600" />
        <h1 className="text-3xl font-bold">My Account</h1>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 sticky top-24">
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={user?.imageUrl || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4 border-4 border-emerald-100"
              />
              <h2 className="text-xl font-semibold">{user?.fullName}</h2>
              <p className="text-gray-500 text-sm">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/account">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/account">
                  <Package className="h-4 w-4 mr-2" />
                  Orders
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/account">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>

            <Separator className="my-4" />

            <SignOutButton>
              <Button
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </SignOutButton>

            <Separator className="my-4" />

            <Button
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="mt-1">{user?.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h3>
                    <p className="mt-1">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Member Since
                    </h3>
                    <p className="mt-1">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Phone Number
                    </h3>
                    <p className="mt-1">Not provided</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order History</h2>

                {isOrdersLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-4">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-6 w-24" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                ) : isOrdersError ? (
                  <div className="p-4 border border-red-200 bg-red-50 rounded-md">
                    <p className="text-red-600">
                      Error loading orders: {ordersError.message}
                    </p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {sortedOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No orders yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      When you place an order, it will appear here
                    </p>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700"
                      asChild
                    >
                      <Link to="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <p className="text-gray-500 mb-4">
                  Manage your account settings and preferences
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Password</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium text-red-600 mb-2">
                      Danger Zone
                    </h3>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => setOpen(true)}
                        >
                          {" "}
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={isDeleting}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="bg-red-600 text-white hover:bg-red-700"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

export default AccountPage;
