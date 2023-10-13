import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProposalService from "../../services/proposal.service";

import Swal from 'sweetalert2';

// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';

// Icon
import { Download, ArrowRight } from 'react-bootstrap-icons';

// Css
import '../../css/arsipSurat/tambahEditSurat.css';

function AjukanProposalPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fileProposal, setFileProposal] = useState(undefined);
    const allowedFiles = ['application/pdf'];
    // pdf file error state
    const [proposalError, setProposalError]=useState('');

    //--------------Form Validation-----------------//
    const validationSchema = Yup.object().shape({
      namaLengkap: Yup.string().required("Nama Lengkap Harus di isi"),
      noTelp: Yup.string().required("No Telepon Harus di isi"),
      email: Yup.string().required("Email Harus di isi").email('Format Email Tidak Valid'),
      asalInstansi: Yup.string().required("Asal Instansi Harus di isi"),
      perihal: Yup.string().required("Perihal Harus di isi"),
    });

    const formik = useFormik({
      initialValues: {
        namaLengkap: "",
        noTelp: "",
        email: "",
        asalInstansi: "",
        perihal: "",
      },
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (data) => {
        setLoading(true);

        if(fileProposal){

          if(fileProposal&&allowedFiles.includes(fileProposal.type)){

            ProposalService.uploadFileProposal(fileProposal)
              .then((response)=>{

                ProposalService.tambahProposal(
                  data.namaLengkap,
                  data.noTelp, 
                  data.email, 
                  data.asalInstansi, 
                  data.perihal,
                  response.data.file, 
                  "Belum Diproses",
                )
                  .then(()=>{
                    setLoading(false);
                    setProposalError('');
                    Swal.fire(
                      {title: 'Proposal Telah Diajukan',
                        icon:'success'}
                    )
                    navigate("/pengajuan_proposal");
                  })
                  .catch(()=>{
                    setLoading(false);
                    setProposalError('');
                  })

              })
 
          
          }
          else{
            setProposalError('File Yang Dicantumkan Harus Pdf');
            setLoading(false);
          }
        }
        else{
          setProposalError('File Pdf Belum Dicantumkan ');
          setLoading(false); 
        }      

      },
    });

    //-----------------------------------------------------//

    const onChangeFilePdf = (e) => {
      const selectedFile = e.target.files[0];

      if(selectedFile){
        if(selectedFile&&allowedFiles.includes(selectedFile.type)){
          setFileProposal(e.target.files[0]);
          setProposalError('');   
        }
        else{
          setProposalError('File Yang Dicantumkan Harus Pdf');
          setFileProposal('');
        }
      }
      else{
        setFileProposal('');
        setProposalError('File Pdf Belum Dicantumkan ');
      }

    };       

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

        <hr/>

          <h1 className="my-4 text-center text-judul-surat-page">Pengajuan Proposal</h1>
          <div className="container bg-form text-font-surat-page">
            <div className="mx-auto">
              <form className="mx-auto px-4" onSubmit={formik.handleSubmit}>
                <div className="d-flex align-items-center pt-3">
                  <Link className="breadcum-surat-active" to={"/pengajuan_proposal"}> <span>Home</span> </Link>
                    <span className="mx-2"><ArrowRight/></span>
                  <span className="breadcum-surat">Ajukan Proposal </span>
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
                  <label forhtml="noTelp" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">No Telepon:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="noTelp"
                      value={formik.values.noTelp}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.noTelp ? formik.errors.noTelp : null}
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

                <div className="row mb-3">
                  <label forhtml="asalInstansi" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Asal Instansi:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="asalInstansi"
                      value={formik.values.asalInstansi}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.asalInstansi ? formik.errors.asalInstansi : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="perihal" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Perihal:</label>
                  <div className="col-sm-10">
                    <textarea 
                      type="text" 
                      className="form-control" 
                      name="perihal"
                      value={formik.values.perihal}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.perihal ? formik.errors.perihal : null}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label forhtml="filePdf" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">File Pdf:</label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <input 
                        className="form-control" 
                        type="file" 
                        name="filePdf"
                        id="filePdf"
                        onChange={onChangeFilePdf}
                      />
                    </div>
                    {proposalError&&<div className='text-danger'>{proposalError}</div>}
                  </div>
                </div>

                <div className="text-center">
                  <hr/>
                  <Link to={"/pengajuan_proposal"} className="btn btn-kembali-surat mb-4">
                    {"<"} Kembali
                  </Link>
                  <button type="submit" className="btn mb-4 btn-surat mx-4" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span><Download/> Simpan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
      
      <footer className="pt-4" >
        <p className="text-center p-3 m-0 footer-home text-muted">&copy; DINAS PEMUDA DAN OLAHRAGA. All rights reserved.</p>
      </footer>


      </div>
    )
}

export default AjukanProposalPage;