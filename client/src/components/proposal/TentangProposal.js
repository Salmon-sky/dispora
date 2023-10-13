import React from "react";
import { Link } from "react-router-dom";

// Image
import gambarJumbotron from "../../asset/image/kantor_dispora.png";
import logoLampung from "../../asset/image/Logo_lampung.png";

// Css
import "../../css/tentang_proposal.css";

function TentangProposal() {
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
                    <Link
                      className="nav-link btn btn-nav me-2"
                      to={"/pengajuan_proposal"}
                    >
                      Beranda
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-nav"
                      to={"/tentang_proposal"}
                    >
                      Tentang
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="jumbotron position-relative d-none d-lg-block">
        <img
          className="img-fluid img-jumbotron"
          src={gambarJumbotron}
          alt="Gambar Tidak Ada"
        />
        <img
          src={logoLampung}
          alt="Gambar Tidak Ada"
          className="img-fluid position-absolute top-0 start-0 mt-4 ms-4"
        />
        <div className="position-absolute text-center top-50 start-50 translate-middle text-jumbotron">
          <p>Dinas Pemuda dan Olahraga</p>
          <p>Provinsi Lampung</p>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h2 className="text-center mt-3">TENTANG</h2>
        <p>Pada Website ini terdapat 2 fitur, yaitu :</p>
        <ol>
          <li>Sistem Informasi Pengajuan Proposal</li>
          <p>
            Sistem informasi ini berfungsi untuk sebuah instansi mengajukan
            proposal nya kepada pihak Dinas Pemuda dan Olahraga Provinsi
            Lampung. Pengajuan proposal dari instansi berupa file .pdf dan bisa
            diakses oleh seluruh pengguna yang ingin mengajukan proposal kepada
            Dinas Pemuda dan Olahraga Provinsi Lampung.
          </p>
          <li>Sistem Informasi Pengecekan Proposal</li>
          <p>
            Sistem informasi ini berfungsi untuk melakukan pengecekan terhadap
            proposal yang telah diajukan kepada pihak Dinas Pemuda dan Olahraga.
            Sistem informasi ini merupakan pusat data dari proposal yang telah
            masuk ke sistem, selanjutnya pada Sistem Informasi Pengecekan
            Proposal diperuntukan kepada admin yang bisa melakukan CRUD (Create,
            Read, Update dan Delete) terhadap proposal yang telah masuk ke dalam
            sistem.
          </p>
        </ol>
      </div>

      <footer>
        <p className="text-center p-3 m-0 footer-home text-muted">
          &copy; DINAS PEMUDA DAN OLAHRAGA. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default TentangProposal;
