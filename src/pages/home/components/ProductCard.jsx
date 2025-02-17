import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from 'react-redux'
import { Heart } from "lucide-react";
import { addToCart } from "@/lib/features/cartSlice";
import { toggleSave } from "@/lib/features/savedSlice.js";
import { useNavigate } from "react-router";

function ProductCard(props) {
  
  const count = useSelector((state) => state.counter.value)
  const savedItems = useSelector((state) => state.savedItems.value)
  const isSaved = savedItems.some((item) => item._id == props._id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSave = (e) =>{
    dispatch(
      toggleSave({
        _id:props._id,
      name:props.name,
       price:props.price,
      image:props.image,
     description:props.description,
      })
    )
  }


  const handleClick = (e) => {
   dispatch(
    addToCart({
      _id:props._id,
      name:props.name,
       price:props.price,
      image:props.image,
     description:props.description,
    })
  )
  
  };

  const handleImageClick = () => {
    navigate(`/product/${props._id}`);
  };

  
  return (
    <Card>
       
      <div className="h-80 bg-card rounded-lg p-4 relative">
         <img src={props.image} className="block cursor-pointer" onClick={handleImageClick}/> 
      </div> 
      <div className="flex px-4 mt-4  items-center justify-between">
        <h2 className="text-2xl  font-semibold">{props.name}</h2>
        <span className="block text-lg font-medium">{props.price}</span>
        <Heart 
        onClick={handleSave}
        className={`cursor-pointer ${isSaved ? "fill-red-500" : ""}`}/>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{props.description}</p>
      </div>
      <div className="mt-1 p-4">
        <Button className="w-full" onClick={handleClick}>
          Buy Now
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;