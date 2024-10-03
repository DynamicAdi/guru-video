import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./universal.scss";
import ErrorPage from "./global/error/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/menu/index.jsx";
// import Corporate from "'notificationsents/corporate/index.jsx";

import { ArrayProvider } from "./funcs/context.jsx";
import Admin from "./components/admin/index.jsx";
import Login from "./components/admin/New.jsx";
import Corporate from "./components/corporate/index.jsx";
import ViewAllItems from "./components/corporate/viewAll.jsx";
import Checkout from "./components/checkout/index.jsx";
import Items from "./components/admin/Items.jsx";
import Form from "./components/forms/form.jsx";
import Client from "./components/forms/Client.jsx";
import AboutUs from "./components/about/Main.jsx";
import Edit from "./components/forms/Edit.jsx";
import History from "./components/history/page.jsx";
import BuyNow from "./components/purchase/index.jsx";
import PackageDetails from "./components/packages/details.jsx";
import Invoice from "./components/invoice/index.jsx";
import Notes from "./components/admin/Notes.jsx";
import Notifications from "./components/admin/notifications/page.jsx";


const URL = import.meta.env.VITE_BACKEND_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ArrayProvider>
        <Routes>
          <Route errorElement={<ErrorPage />} path="/" element={<App backend={URL} />} />
          <Route path="/menu" element={<Menu backend={URL} />} errorElement={<ErrorPage />} />
          <Route
            path="/menu/:choose"
            element={<Menu backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route path="/checkout" element={<Checkout backend={URL} />} errorElement={<ErrorPage />} />
          <Route
            path="/corporate"
            element={<Corporate backend={URL} href={'CorporateList'} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/packages"
            element={<Corporate backend={URL} href={'packages'}/>}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/corporate/items"
            element={<ViewAllItems backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/packages/items"
            element={<PackageDetails backend={URL} />}
            errorElement={<ErrorPage />}
          />
           <Route
            path="/packages/checkout"
            element={<BuyNow backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/corporate/checkout"
            element={<BuyNow backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/invoice"
            element={<Invoice backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/dashboard"
            element={<Admin backend={URL} />}
            errorElement={<ErrorPage />}
          />
            <Route
            path="/dashboard/notes"
            element={<Notes backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/addCorporate"
            element={<Form backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/admin/login"
            element={<Login backend={URL} />}
            errorElement={<ErrorPage />}
          />
            <Route
            path="/dashboard/items"
            element={<Items />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/dashboard/history"
            element={<History backend={URL}/>}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/dashboard/add/form"
            element={<Client backend={URL}/>}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/dashboard/edit"
            element={<Edit backend={URL}/>}
            errorElement={<ErrorPage />}
          />
                    <Route
            path="/dashboard/corporate"
            element={<Form backend={URL}/>}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/about-us"
            element={<AboutUs />}
            errorElement={<ErrorPage />}
          />
           <Route
            path="/notifications"
            element={<Notifications backend={URL}/>}
            errorElement={<ErrorPage />}
          />
        </Routes>
      </ArrayProvider>
    </BrowserRouter>
  </StrictMode>
);
