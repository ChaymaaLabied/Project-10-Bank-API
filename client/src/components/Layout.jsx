import React  from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/slice";

export default function Layout() {
  const token = useSelector((state) => state.counter.token);
  // const currentUser = useSelector((state) => state.counter.user);
  // console.log(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  // useEffect(() => {
  //   dispatch(getUserDetails());
  // }, []);
  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" href="#" to="/">
          <img
            className="main-nav-logo-image"
            src="img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {!token ? (
          <div>
            <Link className="main-nav-item" href="" to="sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </div>
        ) : (
          <div>
            <Link className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {/* {`${currentUser.firstName} ${currentUser.lastName}`} */}
            </Link>
            <Link onClick={handleLogout} className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        )}
      </nav>
      <Outlet />
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
