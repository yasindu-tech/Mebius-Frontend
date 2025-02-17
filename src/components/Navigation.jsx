
import { Link } from "react-router";
import { Heart,ShoppingCart} from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";


function Navigation(props) {

  const cart = useSelector((state) => state.cart.value);
  const savedItems = useSelector((state) => state.savedItems.value);

  const getSavedItemsQuantity = () => {
    let count = 0;
    savedItems.forEach((item) => {  
      count += 1;
    });
    return count;
  };

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  return (
    <nav className="flex items-center justify-between py-8 px-8">
      <div className="flex gap-x-16">
        <Link className="font-semibold text-3xl" to="/">
          Mebius
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
      <div>
          <Link to="/shop/saved" className="flex items-center gap-4 relative">
            <p className="text-lg">{getSavedItemsQuantity()}</p>
            <div className="flex items-center gap-2">
            <Heart />
   
            </div>
          </Link>
        </div>
        <div>
          <Link to="/shop/cart" className="flex items-center gap-4 relative">
            <p className="text-lg">{getCartQuantity()}</p>
            <div className="flex items-center gap-2">
              <ShoppingCart />
              Cart
            </div>
          </Link>
        </div>

        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className=" text-primary ">
              Sign In
            </Link>
            <Link to="/sign-up" className=" text-primary ">
              Sign Up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <UserButton />
          <Link to={"/account"}>Account</Link>
        </SignedIn>



      </div>
    </nav>
  );
}

export default Navigation;
