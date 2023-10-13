import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../../services/authAdminArsipSurat.service";
import ArsipSuratService from "../../../services/arsipSurat.service";
import Navbar from './layout/Navbar';

// Icon
import { PencilFill } from 'react-bootstrap-icons';

// Css
import '../../../css/arsipSurat/profilAminArsipSurat.css';


function ProfilAdmin() {

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(undefined);
    const [admin, setAdmin] = useState(undefined);       

    useEffect(() => {
      AuthService.whoami()
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          if(error.response.status === 401){
             setCurrentUser(undefined);
             navigate("/login_admin_arsip_surat")
          }
        });

      ArsipSuratService.getDataAdmin()
          .then((response) => {
            setAdmin(response.data[0]);
          })

    }, [navigate]);


    return (
      <div>
        {currentUser &&

        <Navbar currentUserLogin={currentUser}>
          <h1 className="my-4 text-center text-judul-surat-page">Profil Admin</h1>
          <div className="container bg-form text-font-surat-page">
            <div className="row">
              <div className="col-2 mt-4">
                <div className="d-flex flex-column">
                  <img className="img-fluid mx-auto" src={admin ? ArsipSuratService.downloadFotoAdmin(admin.foto) : ""} alt="Tidak ada Gambar" width="120" height="120" />
                  <Link to={"/profil_admin_arsip_surat/edit"} className="btn btn-edit-profil mb-4 mt-2">
                    <PencilFill /> Edit Profil
                  </Link>
                  <Link to={"/dashboard_admin_arsip_surat"} className="btn btn-kembali-surat mb-4">
                    {"<"} Kembali
                  </Link>
                </div>     
              </div>
              <div className="col-8">
                <div className="table-responsive mx-auto pt-4">
                  <table className="table">
                    <thead>
                      <tr className="table-secondary">
                        <th colSpan="2" scope="col">Detail Admin</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      <tr>
                        <th scope="row">Nama Admin</th>
                        <td className="align-top">: { admin ? admin.nama_admin : " "}</td>
                      </tr>
                      <tr className="table-secondary">
                        <th scope="row">Username</th>
                        <td className="align-top">: { admin ? admin.username : " "}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/*<form className="px-4">
                <div className="row align-items-start">
                  <div className="col-2">
                  <img className="img-fluid" src={admin ? admin.foto : ""} alt="Tidak ada Gambar" width="120" height="120" />
                  <Link to={"/dashboard_admin_arsip_surat"} className="btn btn-kembali-surat mb-4 mt-2">
                    {"<"} Kembali
                  </Link>
                  <Link to={"/dashboard_admin_arsip_surat"} className="btn btn-kembali-surat mb-4">
                    {"<"} Kembali
                  </Link>     
                  </div>

                  <div className="col-10">
                    <div className="row mb-3">
                      <label forhtml="username" className="col-sm-3 col-form-label text-sm-start text-form-surat-page">Username:</label>
                      <div className="col-sm-9">
                        <input 
                          type="text" 
                          className="form-control" 
                          name="username"
                          value={ admin ? admin.username : " "}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label forhtml="nama_admin" className="col-sm-3 col-form-label text-sm-start text-form-surat-page">Nama Admin:</label>
                      <div className="col-sm-9">
                        <input 
                          type="text" 
                          className="form-control" 
                          name="nama_admin"
                          value={ admin ? admin.nama_admin : " "}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </form>*/}
            </div>
          </div>
        </Navbar>

        }
      </div>
    )
}

export default ProfilAdmin;