import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import EditProduct from "./pages/EditProduct";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";

import Footer from "./Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

function App() {
    return (
        <>
            <Navbar />

            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/contact" element={<Contact />} />

                {/* Protected Routes */}
                <Route path="/products" element={<Products />} />

                <Route
                    path="/add-product"
                    element={
                        <ProtectedRoute>
                            <AddProduct />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-product/:id"
                    element={
                        <ProtectedRoute>
                            <EditProduct />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-orders"
                    element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    }
                />

                 <Route
                 path="/admin/orders"
                 element={
                   <AdminRoute>
                      <AdminOrders />
                   </AdminRoute>
                  }
                 />

                
                   <Route
    path="/admin/dashboard"
    element={
        <AdminRoute>
            <AdminDashboard />
        </AdminRoute>
    }
/>

               

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

               
                 


            </Routes>

            <Footer />
        </>
    );
}

export default App;
























// import Navbar from "./components/Navbar";
// import FeatureCard from "./components/FeatureCard";
// import {Routes, Route} from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Products from "./pages/Products";
// import AddProduct from "./pages/AddProduct";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";
// import Footer from "./Footer";
// import Register from "./pages/Register";
// import ProtectedRoute from "./components/ProtectedRoute";
// import EditProduct from "./pages/EditProduct";
// import MyOrders from "./pages/MyOrders";
// import AdminOrders from "./pages/AdminOrders";
// function App() {
//   return(
    
//     <>
//     <Navbar/>
//     <Routes>
//       <Route path="/" element={<Home/>} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/products" element={<ProtectedRoute> <Products />
//     </ProtectedRoute>
//   }
// />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/register" element={<Register/>}/>
//       <Route path="/add-product" element={<AddProduct />} />
//       <Route path="/edit-product/:id" element={<EditProduct />} />
//       <Route path="/my-orders" element={<MyOrders />} />
//       <Route path="/admin/orders" element={<AdminOrders />} />
//     </Routes>
//     <Footer/>
//     </>
    
//   );
// }
// export default App;
