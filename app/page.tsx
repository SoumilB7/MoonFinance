// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";

import Home from "./home/page";
import LoginPage from "./login/page";
import SignUpPage from "./signup/page";
import AboutUs from "./about/page";

const App = () => {
  const [route, setRoute] = useState("");

  useEffect(() => {
    // Make sure we are on the client side
    if (typeof window !== "undefined") {
      setRoute(window.location.pathname); // Access window safely after client-side rendering
    }
  }, []);

  useEffect(() => {
    // This useEffect tracks changes to the window location safely on the client side
    if (typeof window !== "undefined" && route !== window.location.pathname) {
      setRoute(window.location.pathname); // Ensure route gets updated on URL change
    }
  }, [route]);

  switch (route) {
    case "/login":
      return <LoginPage />;
    case "/signup":
      return <SignUpPage />;
    case "/aboutus":
      return <AboutUs />;
    case "/home":
      return <Home />;
    default:
      return <Home />;
  }
};

export default App;
