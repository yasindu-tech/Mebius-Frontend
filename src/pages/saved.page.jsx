import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { deleteSavedItem, toggleSave } from '@/lib/features/savedSlice'

const SavedPage = () => {
  const savedItems = useSelector((state) => state.savedItems.value)
  const dispatch = useDispatch()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-6 w-6 text-emerald-600" />
        <h1 className="text-3xl font-bold">Your Saved Items</h1>
      </div>

      <Separator className="mb-8" />

      {savedItems.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-6">
            {savedItems.map((item) => (
              <div key={item._id} className="flex items-center mb-4 pb-4 border-b border-emerald-600 last:border-b-0">
                <div className="w-20 h-20 relative mr-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-blue-600 font-medium">${item.price}</p>
                </div>
                <div className="flex items-center mt-2">
                  <Button variant="outline" size="icon" onClick={() => dispatch(toggleSave(item))}>
                    <Heart className="h-4 w-4 fill-emerald-700" />
                  </Button>
      
                </div>
              </div>
            ))}
          </div>

         
        </div>
      ) : (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <ShoppingBag className="h-24 w-24 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-600">No Saved Items</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            You haven't saved any items yet. Browse our collection and save your favorite products for later!
          </p>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 mt-4"
            size="lg"
            asChild
          >
            <Link to="/shop">Start Exploring</Link>
          </Button>
        </div>
      )}
    </main>
  )
}

export default SavedPage
