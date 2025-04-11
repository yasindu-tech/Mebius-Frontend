import { Link } from "react-router";
import { Heart, ShoppingCart, Search } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";

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

  const { user, isSignedIn } = useUser();

  return (
    <nav className="flex items-center justify-between py-6 px-8 border-b sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="flex gap-x-16 items-center">
        <Link className="font-bold text-3xl text-emerald-700" to="/">
          Mebius
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-emerald-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="hover:text-emerald-600 transition-colors font-medium"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="hover:text-emerald-600 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-emerald-600 transition-colors font-medium"
          >
            Contact
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Link
          to="/shop/saved"
          className="flex items-center gap-1 relative hover:text-emerald-600 transition-colors"
        >
          <Heart className="h-5 w-5" />
          {getSavedItemsQuantity() > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getSavedItemsQuantity()}
            </span>
          )}
        </Link>

        <Link
          to="/shop/cart"
          className="flex items-center gap-2 relative hover:text-emerald-600 transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden md:inline">Cart</span>
          {getCartQuantity() > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getCartQuantity()}
            </span>
          )}
        </Link>

        <SignedOut>
          <div className="flex items-center gap-4">
            <Link
              to="/sign-in"
              className="text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          {user && (
            <Link
              to="/account"
              className="hover:text-emerald-600 transition-colors"
            >
              <img
                src={user?.imageUrl || "/default-avatar.png"}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
          )}
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
