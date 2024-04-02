import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListScreen from "./screens/OrderListScreen.jsx";
import ProductListScreen from "./screens/ProductListScreen.jsx";
import UserListScreen from "./screens/UserListScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import UserEditScreen from "./screens/UserEditScreen.jsx";
import PrivateRoute from "./components/PrivateRouter.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomeScreen />}></Route>
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
