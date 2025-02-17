import React from 'react'

import { useSelector,useDispatch } from 'react-redux'

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { deleteSavedItem, toggleSave } from '@/lib/features/savedSlice'


const SavedPage = () => {
    const savedItems = useSelector((state) => state.savedItems.value)
    const dispatch = useDispatch();
   return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 min-h-screen bg-gray-100 p-4">
  <Card className="w-full md:w-2/3 bg-white shadow-xl">
    <CardContent className="p-6">
      <h2 className="text-2xl font-bold mb-4">Saved Items</h2>

      {savedItems.length === 0 ? (
        <p className="text-gray-600 text-center">No Saved Items</p>
      ) : (
        savedItems.map((item) => (
            
          <div key={item._id} className="flex items-center mb-4 pb-4 border-b border-gray-200">
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
                <Heart className="h-4 w-4 fill-red-500" />
              </Button>
             </div>
            
          </div>
        ))
      )}
    </CardContent>
  </Card>



   
  </div>
  );
}

export default SavedPage
