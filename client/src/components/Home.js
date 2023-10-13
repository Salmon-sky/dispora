import React from "react";
import { Link } from "react-router-dom";

// Image
import gambarJumbotron from "../asset/image/kantor_dispora.png";
import logoLampung from "../asset/image/Logo_lampung.png";

// Css
import "../css/home.css";

// Icon
import { EnvelopePaperFill } from "react-bootstrap-icons";

function Home() {
  return (
    <div>
      {/* <Navbar bg="light" expand="lg" className="">
        <Container>
          <Navbar.Brand href="#home" to={"/"} className="nav-text">
            “ Lampung Maju dan Sejahtera “
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="#home" to={"/"}>
                <Button className="btn-nav" variant="outline-warning">
                  Beranda
                </Button>
              </Nav.Link>
              <Nav.Link href="#layanan" to={"/"}>
                <Button className="btn-nav" variant="outline-warning">
                  Layanan
                </Button>
              </Nav.Link>
              <Nav.Link href="#tentang" to={"/"}>
                <Button className="btn-nav" variant="outline-warning">
                  Tentang
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Card>
        <Card.Img variant="top" src={gambarJumbotron} />
        <Image
          src={logoLampung}
          alt="Gambar Tidak Ada"
          className="img-responsive position-absolute top-0 start-0 mt-4 ms-4"
        />
        <div className="position-absolute text-center top-50 start-50 translate-middle text-jumbotron">
          <p>Dinas Pemuda dan Olahraga</p>
          <p>Provinsi Lampung</p>
        </div>
      </Card> */}
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
                    <Link className="nav-link btn btn-nav" to={"/"}>
                      Beranda
                    </Link>
                  </li>
                  <li className="nav-item mx-md-3 my-md-0 my-3">
                    <Link
                      className="nav-link btn btn-nav"
                      hrefLang="#si-dispora"
                      to={"/"}
                    >
                      Layanan
                    </Link>
                  </li>
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

      <h1 className="text-center my-5" id="si-dispora">
        {" "}
        <span className="text-judul-si py-2 px-4">
          Sistem Informasi Dispora
        </span>{" "}
      </h1>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 gx-5 gy-5 justify-content-center">
          <div className="col">
            <div className="card w-75 h-100 mx-auto">
              <EnvelopePaperFill className="card-img-top mt-4" size={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Arsip Surat</h5>
                <p className="card-text">
                  Arsip Surat Masuk dan Keluar Dinas Pemuda dan Olahraga
                </p>
              </div>
              <div className="card-footer text-center">
                <Link to={"/arsip_surat"} className="btn btn-primary btn-lg">
                  Buka
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-5 pt-4">
        <p className="text-center p-3 m-0 footer-home text-muted">
          &copy; DINAS PEMUDA DAN OLAHRAGA. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
