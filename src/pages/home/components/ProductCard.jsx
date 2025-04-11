
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from "react-redux"
import { Heart, ShoppingCart } from "lucide-react"
import { addToCart } from "@/lib/features/cartSlice"
import { toggleSave } from "@/lib/features/savedSlice.js"
import { useNavigate } from "react-router"

function ProductCard(props) {
  const count = useSelector((state) => state.counter.value)
  const savedItems = useSelector((state) => state.savedItems.value)
  const isSaved = savedItems.some((item) => item._id == props._id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSave = (e) => {
    dispatch(
      toggleSave({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      }),
    )
  }

  const handleClick = (e) => {
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      }),
    )
  }

  const handleImageClick = () => {
    navigate(`/product/${props._id}`)
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-80 bg-card rounded-t-lg p-4 relative overflow-hidden">
        <img
          src={props.image || "/placeholder.svg"}
          className="block cursor-pointer w-full h-full object-contain transition-transform duration-300 hover:scale-105"
          onClick={handleImageClick}
        />
      </div>
      <div className="flex px-4 mt-4 items-center justify-between">
        <h2 className="text-2xl font-semibold">{props.name}</h2>
        <Heart onClick={handleSave} className={`cursor-pointer ${isSaved ? "fill-emerald-700" : ""}`} />
      </div>
      <div className="px-4 mt-1">
        <span className="block text-lg font-medium text-emerald-700">${props.price}.00</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{props.description}</p>
      </div>
      <div className="mt-1 p-4">
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
