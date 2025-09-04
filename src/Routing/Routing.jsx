import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Shop from "../Pages/Shop";
import Contact from "../Pages/Contact";
import Blog from "../Pages/Blog";
import Header from "../Components/Header/Navbar";
import Footer from "../Components/Footer/Footer";
import ProductDetails from "../Pages/ProductDetails";
import NotFound from "../Pages/NotFound";
import Authentication from "../Pages/Authentication";
import ResetPass from "./../Components/Authentication/Reset/ResetPass";
import BlogDetails from "./../Components/Blog/BlogDetails/BlogDetails";
import TermsConditions from "./../Pages/TermsConditions";
import ShoppingCart from "./../Components/ShoppingCart/ShoppingCart";
import Category from './../Pages/admin/Category';
import Subcategory from './../Pages/admin/Subcategory';
import AdminFooter from "../Components/Admin/Layout/AdminFooter";
import AdminHeader from "../Components/Admin/Layout/AdminHeader";
import AdminSidebar from "../Components/Admin/Layout/AdminSidebar";
import Collection from './../Pages/admin/Collection';
import Occasion from './../Pages/admin/Occasion';
import Tag from './../Pages/admin/Tag';
import Color from './../Pages/admin/Color';
import Products from './../Pages/admin/Products';
import HeroSection from "../Pages/admin/HeroSection";
import PackingBoxSection from "../Pages/admin/PackingBoxSection";
import ThreeDynamicCardSection from "../Pages/admin/ThreeDynamicCardSection";
import DynamicCardSection from "../Pages/admin/DynamicCardSection";
import Dashboard from "../Pages/admin/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Care from '../Pages/Care';
import Policy from "../Pages/Policy";
import RefundPolicy from "../Pages/RefundPolicy";
import Careers from "../Pages/Careers";
import ShippingPolicy from "../Components/Shipping/ShippingPolicy";

const Routing = () => {
  const location = useLocation();
  const { pathname } = location;
  const isAdminRoute = pathname.startsWith('/admin');
  const isCustomerRoute = pathname.startsWith('/portal');
  const isLoginRoute = pathname.startsWith('/login') || pathname.startsWith('/reset-password') || pathname.startsWith('/signup');

  return (
    <>
      {!isAdminRoute && !isCustomerRoute && !isLoginRoute && <Header />}
      {isAdminRoute && !isCustomerRoute && <AdminHeader />}
      {isAdminRoute && !isCustomerRoute && <AdminSidebar />}
      {/* {!isAdminRoute && isCustomerRoute && <CustomerHeader />} */}
        <Routes>
          {/* Customer Portal Routes */}
          {/* <Route path="/account" element={<CustomerDashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<CustomerProfile />} />  */}

           {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />          
          <Route path="/admin/categories" element={<PrivateRoute><Category /></PrivateRoute>} />          
          <Route path="/admin/subcategories" element={<PrivateRoute><Subcategory /></PrivateRoute>} />
          <Route path="/admin/manage-collections" element={<PrivateRoute><Collection /></PrivateRoute>} />
          <Route path="/admin/manage-occasions" element={<PrivateRoute><Occasion /></PrivateRoute>} />
          <Route path="/admin/manage-tags" element={<PrivateRoute><Tag /></PrivateRoute>} />
          <Route path="/admin/manage-colours" element={<PrivateRoute><Color /></PrivateRoute>} />     
          <Route path="/admin/manage-products" element={<PrivateRoute><Products /></PrivateRoute>} />     
          <Route path="/admin/pages/hero" element={<PrivateRoute><HeroSection /></PrivateRoute>} />     
          <Route path="/admin/pages/packing-box" element={<PrivateRoute><PackingBoxSection /></PrivateRoute>} />     
          <Route path="/admin/pages/offer" element={<PrivateRoute><HeroSection /></PrivateRoute>} />     
          <Route path="/admin/pages/fresh" element={<PrivateRoute><DynamicCardSection /></PrivateRoute>} />     
          <Route path="/admin/pages/3-box" element={<PrivateRoute><ThreeDynamicCardSection /></PrivateRoute>} />     

          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/signup" element={<Authentication />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/BlogDetails" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/care" element={<Care/>}/>
          <Route path="/policy" element={<Policy/>}/>
          <Route path="/RefundPolicy" element={<RefundPolicy/>}/>
          <Route path="/Careers" element={<Careers/>}/>
          <Route path="/Shipping" element={<ShippingPolicy/>}/>
          <Route path="*" element={<NotFound />} />

        </Routes>
        {!isAdminRoute && !isCustomerRoute && !isLoginRoute && <Footer />}
        {isAdminRoute && !isCustomerRoute && <AdminFooter />}
        {/* {!isAdminRoute && isCustomerRoute && <CustomerFooter />} */}
    </>
  );
};

export default Routing;
