import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import { store } from "@/lib/store"
import { Provider } from "react-redux"
import { ClerkProvider } from "@clerk/clerk-react"
import "./index.css"

// Layouts
import RootLayout from "./layouts/rootLayout/root.layout"
import MainLayout from "./layouts/main.layout"
import AdminLayout from "./layouts/admin.layout"
import Protected from "@/layouts/Protected"
import AdminProtected from "@/layouts/AdminProtected"

// Pages
import HomePage from "./pages/home/home.page"
import ShopPage from "./pages/shop.page"
import SavedPage from "./pages/saved.page"
import ProductPage from "./pages/product.page"
import AboutPage from "./pages/about.page"
import ContactPage from "./pages/contact.page"
import CartPage from "./pages/cart.page"
import CheckoutPage from "./pages/checkout.page"
import PaymentPage from "./pages/payment.page"
import CompletePage from "./pages/complete.page"
import AccountPage from "./pages/account.page"
import AdminPage from "./pages/admin/admin.page"
import AdminProductCreatePage from "./pages/admin/admin-product-create.page"
import UpdateProducts from "./pages/admin/admin-update-product"
import SignInPage from "./pages/sign-in.page"
import SignUpPage from "./pages/sign-up.page"
import AddCategory from "./pages/admin/admin-add-category"
import UpdateCategory from "./pages/admin/admin-update-category"
import PaymentCancelPage from "./pages/payment-cancel.page"


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file")
}

createRoot(document.getElementById("root")).render(

  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
          
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/saved" element={<SavedPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cancel=true" element={<PaymentCancelPage />} />
              
              <Route element={<Protected />}>
                <Route path="/shop/cart" element={<CartPage />} />
                <Route path="/shop/checkout" element={<CheckoutPage />} />
                <Route path="/shop/payment" element={<PaymentPage />} />
                <Route path="/shop/complete" element={<CompletePage />} />
                <Route path="/account" element={<AccountPage />} />

              </Route>
            </Route>

            
            <Route element={<Protected />}>
              <Route element={<AdminProtected />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/products/create" element={<AdminProductCreatePage />} />
                  <Route path="/admin/products/update" element={<UpdateProducts />} />
                  <Route path="/admin/categories/add" element={<AddCategory/>} />
                  <Route path="/admin/categories/update" element={<UpdateCategory/>} />
                </Route>
              </Route>
            </Route>
          </Route>

          
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ClerkProvider>

)
