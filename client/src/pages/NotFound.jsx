import { NavLink } from "react-router-dom";
import "../style/notFound.css";

function NotFound() {
  return (
    <main className="main bg-dark">
      <div className="errorPage">
        <h1 className="error404">404 Error</h1>
        <h2 className="Unfound">Page not found</h2>
        <NavLink to="/" className="returnLink">
          Return to the home page
        </NavLink>
      </div>
    </main>
  );
}

export default NotFound;
