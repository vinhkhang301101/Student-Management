import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Components/Sidebar/index"
import { Header } from "../../Components/Header/index";

export const MainLayouts = () => {

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};
