import React from "react";
import { Link } from "react-router-dom";
import '../../../css/arsipSurat/navbarAndSidebarDashboard.css';

// Gambar
import logoLampung from "../../../asset/image/arsipSurat/Logo_lampung.png";
import arsipDispora from "../../../asset/image/arsipSurat/arsipDispora.png";
import iconnav1 from "../../../asset/image/arsipSurat/icon/iconnav1.png";
import iconNavSuratMasuk from "../../../asset/image/arsipSurat/icon/iconNavSuratMasuk.png";
import iconNavSuratKeluar from "../../../asset/image/arsipSurat/icon/iconNavSuratKeluar.png";

function NavbarArsipSurat({children}) {

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
              <Link to={"/arsip_surat"} 
              className={`sidebar-item text-center text-sidebar mb-3 mt-3 p-3 ${window.location.pathname === "/arsip_surat" ? "active-sidebar":""}`}
              >
                <img src={iconnav1} alt="Gambar Tidak Ada"/> Dashboard
              </Link>
              <Link to={"/arsip_surat/surat_masuk"}
              className={`sidebar-item text-center text-sidebar mb-3 mt-3 p-3 ${window.location.pathname === "/arsip_surat/surat_masuk"  ? "active-sidebar":""}`}
              >
                <img src={iconNavSuratMasuk} alt="Gambar Tidak Ada"/> Surat Masuk
              </Link>
              <Link to={"/arsip_surat/surat_keluar"} 
              className={`sidebar-item text-center text-sidebar mb-3 mt-3 p-3 ${window.location.pathname === "/arsip_surat/surat_keluar" ? "active-sidebar":""}`}
              >
                <img src={iconNavSuratKeluar} alt="Gambar Tidak Ada"/> Surat Keluar
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
                          <li className="nav-item"><Link className="nav-link active" to={"/"}>Home</Link></li>
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

export default NavbarArsipSurat;