import React  from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";


export default function Layout() {


  return (
    <>
      <Header/>
      <Outlet />
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
