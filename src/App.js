import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Popup from "./Components/PopupBanner/Popup";
import { Toaster } from "react-hot-toast";
import Routing from "./Routing/Routing";

const App = () => {
  return (
    <>
      <Popup />
      <ScrollToTop />
      <BrowserRouter>
        <Routing />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
