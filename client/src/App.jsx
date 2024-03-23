import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { logout } from "./slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        dispatch(logout());
        toast.info("Please re-login. Session timed-out");
      }
    }
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
