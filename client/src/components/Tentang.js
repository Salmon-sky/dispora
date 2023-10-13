import React from "react";
import { Link } from "react-router-dom";

// Css
import "../css/tentang.css";

function Tentang() {
  return (
    <div>
      <div className="navbar-top">
        <div className="container">
          <nav className="navbar navbar-expand-md p-2">
            <div className="container-fluid">
              <Link className="navbar-brand nav-text" to={"/"}>
                “ Lampung Maju dan Sejahtera “
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbars"
                aria-controls="navbars"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbars">
                <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                  <li className="nav-item">
                    <Link className="nav-link btn btn-nav me-2" to={"/"}>
                      Beranda
                    </Link>
                  </li>
                  {/* <li className="nav-item mx-md-3 my-md-0 my-3">
                    <Link className="nav-link btn btn-nav" to={"/"}>
                      Layanan
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link btn btn-nav" to={"/tentang"}>
                      Tentang
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center mt-3">TENTANG</h2>
        <p>Dalam website ini menampilkan 3 fitur utama, yaitu :</p>
        <ol>
          <li>Arsip Surat</li>
          <p>
            Berguna untuk pengarsipan surat masuk dan surat keluar pada Dinas
            Pemuda dan Olahraga Provinsi Lampung. Surat diarsipkan dalam format
            PDF, dan dapat diakses oleh seluruh pengguna yang memiliki keperluan
            dalam pengarsiapn surat
          </p>
          <li>Admin Arsip Surat</li>
          <p>
            Diperuntukan bagi admin untuk CRUD ( Create, Read, Update, dan
            Delete ) pada pengarsipan surat. Membutuhkan login untuk akses ke
            dalamnya .
          </p>
          <li>Data Kepegawaian</li>
          <p>
            Berguna untuk menangani berbagai hal dalam pengurusan kepegawaian
            mulai dari pengisian, pengolahan dan pemusatan data secara
            terkomputerisasi sehingga dapat menangani berbagai laporan yang
            berhubungan dengan kepegawaian, agar lebih mudah diakses dan
            memudahkan dalam proses administrasi kepegawaian
          </p>
        </ol>
      </div>

      <footer>
        <p className="text-center p-3 m-0 footer-home1 text-muted">
          &copy; DINAS PEMUDA DAN OLAHRAGA. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Tentang;
