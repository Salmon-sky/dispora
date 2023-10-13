import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/authAdminArsipSurat.service";
import EventBus from "../../common/EventBus";

function Navbar({currentUserLogin ,children}) {

  const navigate = useNavigate();

  useEffect(() => { 
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    AuthService.logout();
    navigate("/login_admin_arsip_surat")
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
        </div>
        {currentUserLogin ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/dashboard_admin_arsipSurat"} className="nav-link">
                {currentUserLogin.username}
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={logOut}>
                LogOut
              </button>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login_admin_arsip_surat"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </nav>
      <main>{children}</main>
    </div>
    
  );
}

export default Navbar;