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

const Routing = () => {
  const location = useLocation();
  const { pathname } = location;
  const isAdminRoute = pathname.startsWith('/admin');
  const isCustomerRoute = pathname.startsWith('/portal');

  return (
    <>
      {!isAdminRoute && !isCustomerRoute && <Header />}
      {isAdminRoute && !isCustomerRoute && <AdminHeader />}
      {isAdminRoute && !isCustomerRoute && <AdminSidebar />}
      {/* {!isAdminRoute && isCustomerRoute && <CustomerHeader />} */}
        <Routes>
          {/* Customer Portal Routes */}
          {/* <Route path="/account" element={<CustomerDashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<CustomerProfile />} />  */}

           {/* Admin Routes */}
          <Route path="/admin/categories" element={<Category />} />          
          <Route path="/admin/subcategories" element={<Subcategory />} />
          <Route path="/admin/manage-collections" element={<Collection />} />
          <Route path="/admin/manage-occasions" element={<Occasion />} />
          <Route path="/admin/manage-tags" element={<Tag />} />
          <Route path="/admin/manage-colours" element={<Color />} />     
          {/* <Route path="/admin/manage-products" element={<Color />} />      */}

          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/loginSignUp" element={<Authentication />} />
          <Route path="/resetPassword" element={<ResetPass />} />
          <Route path="/BlogDetails" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        {!isAdminRoute && !isCustomerRoute && <Footer />}
        {isAdminRoute && !isCustomerRoute && <AdminFooter />}
        {/* {!isAdminRoute && isCustomerRoute && <CustomerFooter />} */}
    </>
  );
};

export default Routing;
