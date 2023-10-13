import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AuthService from "../../../services/authAdminArsipSurat.service";
import ArsipSuratService from "../../../services/arsipSurat.service";
import Navbar from './layout/Navbar';

// Pdf Viewer
import PdfViewer from "./PdfView";

// Icon
import { ArrowRight, Download } from 'react-bootstrap-icons';

// Css
import '../../../css/arsipSurat/tambahEditSurat.css';


const formatTanggal = (tanggal) => {
   const event = new Date(tanggal);
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return event.toLocaleDateString('id-ID', options);
}

function DetailSuratMasukPage() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [currentUser, setCurrentUser] = useState(undefined);
    const [dataSuratMasuk, setDataSuratMasuk] = useState(undefined);       

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

      ArsipSuratService.getDataSuratById(id)
          .then((response) => {
            setDataSuratMasuk(response.data);
          })

    }, [id, navigate]);


    return (
      <div>
        {currentUser &&

        <Navbar currentUserLogin={currentUser}>
          <h1 className="my-4 text-center text-judul-surat-page">Detail Surat Masuk</h1>
          <div className="container bg-form text-font-surat-page">
            <div className="mx-auto">
              <form className="mx-auto px-4">
                <div className="d-flex align-items-center pt-3">
                  <Link className="breadcum-surat-active" to={"/admin_surat_masuk"}> <span>Surat Masuk</span> </Link>
                    <span className="mx-2"><ArrowRight/></span>
                  <span className="breadcum-surat">Detail Surat Masuk </span>
                </div>
                <hr className="py-1"/>
                <div className="row mb-3">
                  <label forhtml="tanggalMasuk" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Tanggal Masuk:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="tanggalMasuk"
                      value={ dataSuratMasuk ? formatTanggal(dataSuratMasuk.tanggal_masuk): " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="kodeSurat" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Kode Surat:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="kodeSurat"
                      value={ dataSuratMasuk ? dataSuratMasuk.kode_surat : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="nomorSurat" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Nomor Surat:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="nomorSurat"
                      value={dataSuratMasuk ? dataSuratMasuk.nomor_surat : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="tanggalSurat" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Tanggal Surat:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="tanggalSurat"
                      value={dataSuratMasuk ? formatTanggal(dataSuratMasuk.tanggal_surat) : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="pengirim" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Pengirim:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="pengirim"
                      value={dataSuratMasuk ? dataSuratMasuk.pengirim : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="perihal" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Perihal:</label>
                  <div className="col-sm-10">
                    <textarea 
                      type="text" 
                      className="form-control" 
                      name="perihal"
                      value={dataSuratMasuk ? dataSuratMasuk.perihal : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="bagian" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Bagian:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="bagian"
                      value={dataSuratMasuk ? dataSuratMasuk.bagian : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="status" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Status:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="status"
                      value={dataSuratMasuk ? dataSuratMasuk.status : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="hakAkses" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Hak Akses:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="hakAkses"
                      value={dataSuratMasuk ? dataSuratMasuk.hak_akses : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <label forhtml="filePdf" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">File Pdf:</label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#pdfView">
                        Lihat Pdf
                      </button>
                      <a className="btn btn-outline-secondary" rel="noreferrer" href={dataSuratMasuk && ArsipSuratService.downloadFileSuratMasuk(dataSuratMasuk.file_pdf) } target="_blank">
                        <Download /> Download
                      </a> 
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <hr/>
                  <Link to={"/admin_surat_masuk"} className="btn btn-kembali-surat mb-4">
                    {"<"} Kembali
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {dataSuratMasuk ? <PdfViewer pdf={ArsipSuratService.downloadFileSuratMasuk(dataSuratMasuk.file_pdf)} /> : null}
        </Navbar>

        }
      </div>
    )
}

export default DetailSuratMasukPage;