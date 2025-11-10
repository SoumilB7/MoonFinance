// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";

import Home from "./home/page";
import LoginPage from "./login/page";
import SignUpPage from "./signup/page";
import AboutUs from "./about/page";
import B2BPage from "./b2b/page";

const App = () => {
  const [route, setRoute] = useState("");
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    // Make sure we are on the client side
    if (typeof window !== "undefined") {
      setRoute(window.location.pathname);
      setHostname(window.location.hostname);
    }
  }, []);

  useEffect(() => {
    // This useEffect tracks changes to the window location safely on the client side
    if (typeof window !== "undefined" && route !== window.location.pathname) {
      setRoute(window.location.pathname);
      setHostname(window.location.hostname);
    }
  }, [route]);

  // Check if we're on b2b subdomain
  const isB2BSubdomain = hostname.startsWith("b2b.") || hostname === "b2b.localhost";

  // If on b2b subdomain and root path, show B2B page
  if (isB2BSubdomain && (route === "/" || route === "")) {
    return <B2BPage />;
  }

  switch (route) {
    case "/login":
      return <LoginPage />;
    case "/signup":
      return <SignUpPage />;
    case "/aboutus":
      return <AboutUs />;
    case "/home":
      return <Home />;
    case "/b2b":
      return <B2BPage />;
    default:
      return <Home />;
  }
};

export default App;
