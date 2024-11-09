import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./App.css";

import PageNotFound from "./Pages/PageNotFound";
import AdminPanel from "./Pages/AdminPanel";
import PrivateLayout from "./Layout/PrivateLayout";
import LoginPage from "./Pages/LoginPage";
import AuthNavigator from "./Layout/AuthNavigator";
import AuthLayout from "./Layout/AuthLayout";
import CustomerMaster from "./Pages/CustomerMaster";
import AreaMaster from "./Pages/AreaMaster/AreaMaster";
import FeedBackMaster from "./Pages/FeedBackMaster";
import AreaList from "./Pages/AreaMaster/AreaList";
import CustomerList from "./Pages/CustomerMaster/CustomerList";
import FBList from "./Pages/FeedBackMaster/FBList";
import ManageGeoLoc from "./Pages/AreaMaster/ManageGeoLoc";
import StateAdd from "./Pages/AreaMaster/StateAdd";
import CityAdd from "./Pages/AreaMaster/CityAdd";
import ZoneAdd from "./Pages/AreaMaster/ZoneAdd";
function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route
        path="/auth"
        element={<AuthNavigator authenticated={userInfo?.details?.ID} />}
      >
        <Route
          index
          element={
            <PrivateLayout>
              <AdminPanel />
            </PrivateLayout>
          }
        />
        <Route
          path="customer"
          element={
            <PrivateLayout>
              <CustomerMaster />
            </PrivateLayout>
          }
        />
        <Route
          path="cust-list"
          element={
            <PrivateLayout>
              <CustomerList />
            </PrivateLayout>
          }
        />
        <Route
          path="area"
          element={
            <PrivateLayout>
              <AreaMaster />
            </PrivateLayout>
          }
        />
        <Route
          path="geo-loc"
          element={
            <PrivateLayout>
              <ManageGeoLoc />
            </PrivateLayout>
          }
        />
        <Route
          path="state"
          element={
            <PrivateLayout>
              <StateAdd />
            </PrivateLayout>
          }
        />
        <Route
          path="city"
          element={
            <PrivateLayout>
              <CityAdd />
            </PrivateLayout>
          }
        />
        <Route
          path="zone"
          element={
            <PrivateLayout>
              <ZoneAdd />
            </PrivateLayout>
          }
        />
        <Route
          path="area-list"
          element={
            <PrivateLayout>
              <AreaList />
            </PrivateLayout>
          }
        />
        <Route
          path="feedback"
          element={
            <PrivateLayout>
              <FeedBackMaster />
            </PrivateLayout>
          }
        />
        <Route
          path="fb-list"
          element={
            <PrivateLayout>
              <FBList />
            </PrivateLayout>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
