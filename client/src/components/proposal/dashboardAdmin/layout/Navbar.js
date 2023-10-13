import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../../services/authAdminProposal.service";
import EventBus from "../../../../common/EventBus";
import '../../../../css/arsipSurat/navbarAndSidebarDashboard.css';

// Gambar
import logoLampung from "../../../../asset/image/arsipSurat/Logo_lampung.png";
import arsipDispora from "../../../../asset/image/arsipSurat/arsipDispora.png";
import iconnav1 from "../../../../asset/image/arsipSurat/icon/iconnav1.png";
import iconNavSuratMasuk from "../../../../asset/image/arsipSurat/icon/iconNavSuratMasuk.png";
import iconNavSuratKeluar from "../../../../asset/image/arsipSurat/icon/iconNavSuratKeluar.png";
import iconLampung from "../../../../asset/image/arsipSurat/icon/logo_lampung.png";

function NavbarAdminProposal({currentUserLogin ,children}) {

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
    navigate("/login_admin_proposal")
  };

  const sidebarToggle = (event) => {
    event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
  }

  return (
    <div className="d-flex" id="wrapper">
      {/*<!-- Sidebar-->*/}
      <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom">
            <img src={logoLampung} alt="Gambar Tidak Ada" />
            <div className="cirle-bacground">
            <img src={arsipDispora} className="text-center mt-5 ms-1" alt="Gambar Tidak Ada" />
            </div>
          </div>
          <div className="d-flex flex-column">
              <Link to={"/dashboard_admin_proposal"} 
              className={`sidebar-item text-center text-sidebar mb-3 mt-3 p-3 ${window.location.pathname === "/dashboard_admin_proposal" ? "active-sidebar":""}`}
              >
                <img src={iconnav1} alt="Gambar Tidak Ada"/> Dashboard
              </Link>
              <Link to={"/admin_proposal"}
              className={`sidebar-item text-center text-sidebar mb-3 mt-3 p-3 ${window.location.pathname === "/admin_proposal" || window.location.pathname === "/admin_proposal/edit" 
              ? "active-sidebar":""}`}
              >
                <img src={iconNavSuratMasuk} alt="Gambar Tidak Ada"/> Proposal
              </Link>
          </div>
      </div>
      {/*<!-- Page content wrapper-->*/}
      <div id="page-content-wrapper">
          {/*<!-- Top navigation-->*/}
          <nav className="navbar navbar-expand-lg navbar-light border-bottom bg-custom-navbar p-3">
              <div className="container-fluid">
                  <button className="btn btn-toggle" id="sidebarToggle" onClick={sidebarToggle}>Menu</button>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                          {/*<li className="nav-item"><a className="nav-link active" href="#!">Home</a></li>*/}
                          <li className="nav-item dropdown">
                              <button className="btn btn-nama-admin dropdown-toggle" id="navbarDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={iconLampung} alt="Gambar Tidak Ada" /><span className="ms-1">{currentUserLogin.nama_admin}</span>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                  <Link className="dropdown-item" to={"/profil_admin_proposal"}>Profile</Link>
                                  <div className="dropdown-divider"></div>
                                  <button className="dropdown-item" onClick={logOut}>Logout</button>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
          {/*<!-- Page content-->*/}
          <div className="container-fluid">
              <main>{children}</main>
          </div>
      </div>
  </div>
     
  );
}

export default NavbarAdminProposal;