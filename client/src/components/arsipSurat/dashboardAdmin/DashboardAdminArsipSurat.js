import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/authAdminArsipSurat.service";
import Navbar from './layout/Navbar';
import ArsipSuratService from "../../../services/arsipSurat.service";

// Css
import '../../../css/arsipSurat/dashboardAdminArsipSurat.css';

// Logo
import suratMasuk from "../../../asset/image/arsipSurat/surat_masuk.png";
import suratKeluar from "../../../asset/image/arsipSurat/surat_keluar.png";

const DashboardAdminArsipSurat = () => {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [dataSuratMasuk, setDataSuratMasuk] = useState(undefined);
  const [dataSuratKeluar, setDataSuratKeluar] = useState(undefined);

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

    ArsipSuratService.getDataSuratMasuk()
      .then((response) => {
        setDataSuratMasuk(response.data);
      })

    ArsipSuratService.getDataSuratKeluar()
      .then((response) => {
        setDataSuratKeluar(response.data);
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <div>
    {currentUser && 
      <Navbar currentUserLogin={currentUser}>
        <h1 className="mt-5 text-center">Dashboard Admin</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
            <div className="col align-self-center">
              <div className="card w-75 mx-auto card-custom-style">
                <div className="card-body">
                  <h5 className="card-title card-title-custom text-center">Surat Masuk</h5>
                  <div className="d-flex flex-row align-items-center text-center">
                    <div className="flex-fill"><p className="jumlah-surat">{dataSuratMasuk && dataSuratMasuk.length}</p></div>
                    <div className="flex-fill"><img src={suratMasuk} className="logo-surat-keluar" alt="Gambar Tidak Ada"/></div>
                  </div>
                </div>
              </div>
            </div> 
            <div className="col align-self-center">
              <div className="card w-75 mx-auto card-custom-style">
                <div className="card-body">
                  <h5 className="card-title card-title-custom text-center">Surat Keluar</h5>
                  <div className="d-flex flex-row align-items-center text-center">
                    <div className="flex-fill"><p className="jumlah-surat">{dataSuratKeluar && dataSuratKeluar.length}</p></div>
                    <div className="flex-fill"><img src={suratKeluar} className="logo-surat-keluar" alt="Gambar Tidak Ada"/></div>
                  </div>
                </div>
              </div>
            </div>          
        </div>  
      </Navbar>
    }
    </div>
      
  );
};
export default DashboardAdminArsipSurat;