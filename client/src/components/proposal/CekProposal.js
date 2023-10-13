import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProposalService from "../../services/proposal.service";

import Swal from 'sweetalert2';

// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';

// Icon
import { Search, ArrowRight, Download } from 'react-bootstrap-icons';

// Css
import '../../css/arsipSurat/tambahEditSurat.css';

const formatTanggal = (tanggal) => {
   const event = new Date(tanggal);
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return event.toLocaleDateString('id-ID', options);
}

function CekProposalPage() {

    const navigate = useNavigate();

    const [dataProposal, setDataProposal] = useState();
    const [dataFilterProposal, setDataFilterProposal] = useState();

    useEffect(() => {

      ProposalService.getDataProposal()
          .then( (response) => {
            setDataProposal(response.data);
          })

        
    }, []);

    //--------------Form Validation-----------------//
    const validationSchema = Yup.object().shape({
      namaLengkap: Yup.string().required("Nama Lengkap Harus di isi"),
      email: Yup.string().required("Email Harus di isi").email('Format Email Tidak Valid'),
    });

    const formik = useFormik({
      initialValues: {
        namaLengkap: "",
        email: "",
      },
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (data) => {
        let hasilPencarian = dataProposal.filter(function (proposal)
          {
            return proposal.nama_lengkap == data.namaLengkap &&
                   proposal.email == data.email;
          }
        );

        if(hasilPencarian.length > 0){
          setDataFilterProposal(hasilPencarian)
        }
        else{
          Swal.fire(
            { icon: 'error',
              title: 'Proposal Tidak Ditemukan',}
          )
        }  

      },
    });

    //-----------------------------------------------------//       

    return (
      <div>

        <nav className="navbar navbar-expand-md p-2">
          <div className="container-fluid">
            <Link className="navbar-brand nav-text" to={"/pengajuan_proposal"}>“ Lampung Maju dan Sejahtera “</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbars" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbars">
              <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className="nav-link btn btn-nav" to={"/pengajuan_proposal"}>Beranda</Link>
                </li>
                <li className="nav-item mx-md-3 my-md-0 my-3">
                  <Link className="nav-link btn btn-nav" to={"/pengajuan_proposal"}>Layanan</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-nav" to={"/pengajuan_proposal"}>Tentang</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <h1 className="my-4 text-center text-judul-surat-page">Pengecekan Proposal</h1>
        <div className="container bg-form text-font-surat-page">
          <div className="mx-auto">
            <form className="mx-auto px-4" onSubmit={formik.handleSubmit}>
              <div className="d-flex align-items-center pt-3">
                <Link className="breadcum-surat-active" to={"/pengajuan_proposal"}> <span>Home</span> </Link>
                  <span className="mx-2"><ArrowRight/></span>
                <span className="breadcum-surat">Cek Proposal </span>
              </div>
              <hr className="py-1"/>
              <div className="row mb-3">
                <label forhtml="namaLengkap" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Nama Lengkap:</label>
                <div className="col-sm-10">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="namaLengkap"
                    value={formik.values.namaLengkap}
                    onChange={formik.handleChange}
                  />
                  <div className="text-danger">
                    {formik.errors.namaLengkap ? formik.errors.namaLengkap : null}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <label forhtml="email" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Email:</label>
                <div className="col-sm-10">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <div className="text-danger">
                    {formik.errors.email ? formik.errors.email : null}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <hr/>
                <Link to={"/pengajuan_proposal"} className="btn btn-kembali-surat mb-4">
                  {"<"} Kembali
                </Link>
                <button type="submit" className="btn mb-4 btn-surat mx-4" >
                  <span><Search/> Cek</span>
                </button>

              </div>
            </form>
          </div>
        </div>
          
          {
            dataFilterProposal ? 
            (<span>
                {dataFilterProposal.map((data, index)=>{
                  return (
                    <span key={index}>
                      <div className="container bg-form text-font-surat-page mt-3 mb-5">
                        <div className="mx-auto">
                          <form className="mx-auto px-4">
                            
                            <h3 className="text-center">Data Proposal</h3>
                            
                            <hr className="py-1"/>
                            <div className="row mb-3">
                              <label forhtml="namaLengkap" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Nama Lengkap:</label>
                              <div className="col-sm-10">
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  name="namaLengkap"
                                  value={ data ? data.nama_lengkap : " "}
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
                                  value={ data ? data.no_telp : " "}
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
                                  value={data ? data.email : " "}
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
                                  value={data ? data.asal_instansi : " "}
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
                                  value={data ? data.perihal : " "}
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
                                  value={data ? formatTanggal(data.createdAt) : " "}
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
                                  value={data ? data.status : " "}
                                  disabled
                                />
                              </div>
                            </div>

                            <div className="row">
                              <label forhtml="filePdf" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">File Pdf:</label>
                              <div className="col-sm-10">
                                <div className="input-group">
                                  <a className="btn btn-outline-secondary" rel="noreferrer" href={data && ProposalService.downloadFileProposal(data.file_proposal) } target="_blank">
                                    <Download /> Download
                                  </a> 
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <hr/>
                            </div>
                          </form>
                        </div>
                      </div>
                    </span>
                  )
                  })
                }
                </span> )
            : ""
          }


      <footer className="pt-4" style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0,
        }}>
        <p className="text-center p-3 m-0 footer-home text-muted">&copy; DINAS PEMUDA DAN OLAHRAGA. All rights reserved.</p>
      </footer>

      </div>
    )
}

export default CekProposalPage;