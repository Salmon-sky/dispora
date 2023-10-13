import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AuthService from "../../../services/authAdminProposal.service";
import ProposalSuratService from "../../../services/proposal.service";
import Navbar from './layout/Navbar';

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
    const [dataProposal, setDataProposal] = useState(undefined);       

    useEffect(() => {
      AuthService.whoami()
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          if(error.response.status === 401){
             setCurrentUser(undefined);
             navigate("/login_admin_proposal")
          }
        });

      ProposalSuratService.getDataProposalById(id)
          .then((response) => {
            setDataProposal(response.data);
          })

    }, [id, navigate]);


    return (
      <div>
        {currentUser &&

        <Navbar currentUserLogin={currentUser}>
          <h1 className="my-4 text-center text-judul-surat-page">Detail Proposal</h1>
          <div className="container bg-form text-font-surat-page">
            <div className="mx-auto">
              <form className="mx-auto px-4">
                <div className="d-flex align-items-center pt-3">
                  <Link className="breadcum-surat-active" to={"/admin_proposal"}> <span>Proposal</span> </Link>
                    <span className="mx-2"><ArrowRight/></span>
                  <span className="breadcum-surat">Detail Proposal </span>
                </div>
                <hr className="py-1"/>
                <div className="row mb-3">
                  <label forhtml="namaLengkap" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Nama Lengkap:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="namaLengkap"
                      value={ dataProposal ? dataProposal.nama_lengkap : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="noTelp" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">No Telepon:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="noTelp"
                      value={ dataProposal ? dataProposal.no_telp : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="email" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Email:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="email"
                      value={dataProposal ? dataProposal.email : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="asalInstansi" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Asal Instansi:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="asalInstansi"
                      value={dataProposal ? dataProposal.asal_instansi : " "}
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
                      value={dataProposal ? dataProposal.perihal : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="createdAt" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Tanggal Pengajuan:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="createdAt"
                      value={dataProposal ? formatTanggal(dataProposal.createdAt) : " "}
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
                      value={dataProposal ? dataProposal.status : " "}
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <label forhtml="filePdf" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">File Pdf:</label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <a className="btn btn-outline-secondary" rel="noreferrer" href={dataProposal && ProposalSuratService.downloadFileProposal(dataProposal.file_proposal) } target="_blank">
                        <Download /> Download
                      </a> 
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <hr/>
                  <Link to={"/admin_proposal"} className="btn btn-kembali-surat mb-4">
                    {"<"} Kembali
                  </Link>
                </div>
              </form>
            </div>
          </div>

        </Navbar>

        }
      </div>
    )
}

export default DetailSuratMasukPage;