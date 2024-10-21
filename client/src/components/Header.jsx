import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/slice";


export default function Header() {
  const token = useSelector((state) => state.counter.token);
  const currentUser = useSelector((state) => state.counter.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
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
          {currentUser && `${currentUser.firstName}`}
        </Link>
        <Link onClick={handleLogout} className="main-nav-item">
          <i className="fas fa-sign-out-alt"></i>
          Sign Out
        </Link>
      </div>
    )}
  </nav>
  )
}
