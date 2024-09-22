import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/home/context/CartContext";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import Profile from "./pages/Account/Porfile";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import AddCategory from './pages/Admin/AddCategory';
import AdminCategoryPage from './pages/Admin/AdminCategoryPage';
import AdminOrderDetails from "./pages/Admin/AdminOrderDetails";
import AdminOrderPages from "./pages/Admin/AdminOrderPages";
import AdminPage from "./pages/Admin/AdminPage";
import EditCategory from "./pages/Admin/EditCategory";
import UpdateUser from "./pages/Admin/UpdateUser";
import UserManagementPage from './pages/Admin/UserManagementPage';
import AddProductPage from './pages/Artisan/AddProductPage';
import ArtisanPage from "./pages/Artisan/ArtisanPage";
import ArtisanProductPage from './pages/Artisan/ArtisanProductPage';
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== admin navbar===================== */}
        <Route path='/admin'  element={<AdminPage/>} />
        <Route path='/admin/category'  element={<AdminCategoryPage/>} />
        <Route path='/admin/add-category'  element={<AddCategory/>} />
        <Route path='/admin/edit-category/:categoryId'  element={<EditCategory/>} />
        <Route path='/admin/manageUser'  element={<UserManagementPage/>} />
        <Route path='/admin/update-user/:userId'  element={<UpdateUser />} />
        <Route path='/admin/orders'  element={<AdminOrderPages/>} /> 
        <Route path='/admin/order-details/:itemId'  element={<AdminOrderDetails/>} />
        <Route path="/category/:category" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
  {/* ==================== artisan navbar ===================== */}
        <Route path='/artisan'  element={<ArtisanPage/>} />
        <Route path='/artisan/product'  element={<ArtisanProductPage/>} />
        <Route path='/artisan/add-product'  element={<AddProductPage/>} />
        
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path='/profile' element={<Profile />} />
   
    </Route>
  )
);

function App() {
  return (
    <CartProvider>
      <div className="font-bodyFont">
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  );
}

export default App;


