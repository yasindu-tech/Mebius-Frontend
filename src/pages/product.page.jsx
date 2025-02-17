import { Heart, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProductQuery } from "@/lib/api";
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from "@/lib/features/cartSlice";
import { toggleSave } from "@/lib/features/savedSlice";


export default function ProductPage() {
    const { id } = useParams();
  const { data: product, isLoading: isProductLoading, isError: isProductError, error: productError } = useGetProductQuery(id);

  const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch()
    const savedItems = useSelector((state) => state.savedItems.value)
    const isSaved = savedItems.some((item) => item._id == product._id)
    const handleClick = (e) =>{
    dispatch(
        addToCart({
          _id:product._id,
          name:product.name,
           price:product.price,
          image:product.image,
         description:product.description,
         quantity: quantity,
        })
      )
    }

    const handleSaveClick = (e) => {
        dispatch(
            toggleSave({
                _id: product._id,
                name:product.name,
                price:product.price,
                image:product.image,
                description:product.description,
            })
        )
    }



  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (isProductLoading) {
    return <div>Loading...</div>;
  }

  if (isProductError) {
    return <div>Error: {productError.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
      
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>


              <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>

              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Card className="p-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={increaseQuantity}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="flex-1" size="lg" onClick={handleClick}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg"  onClick={handleSaveClick}>
                    <Heart  className={`mr-2 h-5 w-5 cursor-pointer ${isSaved ? "fill-red-500" : ""}`}  />
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

