import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AuthService from "../../../services/authAdminProposal.service";
import ProposalService from "../../../services/proposal.service";
import Navbar from './layout/Navbar';

import Swal from 'sweetalert2';

// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';

// Icon
import { ArrowRight, Download } from 'react-bootstrap-icons';

// Css
import '../../../css/arsipSurat/tambahEditSurat.css';

function EditProposalPage() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [dataProposal, setDataProposal] = useState(undefined);
    const [status, setStatus] = useState();

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

      ProposalService.getDataProposalById(id)
          .then( (response) => {
            setDataProposal(response.data);
            setStatus(response.data.status);
          })

        
    }, [id, navigate]);

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
        namaLengkap: `${ dataProposal ? dataProposal.nama_lengkap : "" }`,
        noTelp: `${ dataProposal ? dataProposal.no_telp : "" }`,
        email: `${ dataProposal ? dataProposal.email : ""}`,
        asalInstansi: `${ dataProposal ? dataProposal.asal_instansi : "" }`,
        perihal: `${dataProposal ? dataProposal.perihal : ""}`,
      },
      enableReinitialize: true,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (data) => {
        setLoading(true);          
        
        await ProposalService.editProposal(
          id,
          data.namaLengkap,
          data.noTelp, 
          data.email, 
          data.asalInstansi, 
          data.perihal,
          dataProposal.file_pdf,
          status
        )
        .then(()=>{
          setLoading(false);
          Swal.fire(
            { icon: 'success',
              title: 'Proposal Berhasil Diedit',}
          )
          navigate("/admin_proposal");
        })
        .catch((err)=>{
          console.log(err)
          setLoading(false);
        })
        setLoading(false);

      },
    });

    const onChangeStatus = (e) => {
      const value = e.target.value;
      setStatus(value);
      console.log(value)
    }     

    return (
      <div>
        {currentUser &&

        <Navbar currentUserLogin={currentUser}>
          <h1 className="my-4 text-center text-judul-surat-page">Edit Proposal</h1>
          <div className="container bg-form text-font-surat-page">
            <div className="mx-auto">
              <form className="mx-auto px-4" onSubmit={formik.handleSubmit}>
                <div className="d-flex align-items-center pt-3">
                  <Link className="breadcum-surat-active" to={"/admin_proposal"}> <span>Proposal</span> </Link>
                    <span className="mx-2"><ArrowRight/></span>
                  <span className="breadcum-surat">Edit Proposal </span>
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
                  <label forhtml="noTelp" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">No Telpon:</label>
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

                <div className="row mb-3">
                  <label forhtml="status" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Status:</label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <select className="form-select" value={status} onChange={onChangeStatus} >
                        <option value="Belum Diproses">Belum Diproses</option>
                        <option value="Sudah Diproses">Sudah Diproses</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label forhtml="filePdf" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">File Pdf:</label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <a className="btn btn-outline-secondary" rel="noreferrer" href={dataProposal && ProposalService.downloadFileProposal(dataProposal.file_proposal)} target="_blank">
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

        </Navbar>

        }
      </div>
    )
}

export default EditProposalPage;