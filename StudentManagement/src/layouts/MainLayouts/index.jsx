import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/index"
import { Header } from "../../components/Header/index";

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
