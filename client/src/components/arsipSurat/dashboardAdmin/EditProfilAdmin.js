import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../../services/authAdminArsipSurat.service";
import ArsipSuratService from "../../../services/arsipSurat.service";
import Navbar from './layout/Navbar';

import Swal from 'sweetalert2';

// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';

// Icon
import { ArrowRight, ClipboardCheckFill } from 'react-bootstrap-icons';

// Css
import '../../../css/arsipSurat/tambahEditSurat.css';


function EditProfilAdminPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [dataAdmin, setDataAdmin] = useState(undefined);
    const [foto, setFoto] = useState(undefined);
    const allowedFiles = ['image/gif', "image/jpeg", "image/png"];
    // pdf file error state
    const [fotoError, setFotoError]=useState('');

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
            setDataAdmin(response.data[0]);
          })

        
    }, [navigate]);

    //--------------Form Validation-----------------//
    const validationSchema = Yup.object().shape({
      namaAdmin: Yup.string().required("Nama Admin Tidak Boleh Kosong"),
      username: Yup.string().required("Username Tidak Boleh Kosong"),
    });

    const formik = useFormik({
      initialValues: {
        namaAdmin: `${ dataAdmin ? dataAdmin.nama_admin : "" }`,
        username: `${ dataAdmin ? dataAdmin.username : "" }`,
        password: "",
      },
      enableReinitialize: true,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (data) => {
        setLoading(true);

        if(foto){

          if(foto&&allowedFiles.includes(foto.type)){

            ArsipSuratService.deleteFotoAdmin(dataAdmin.foto)
            .then(()=>{
              
              ArsipSuratService.uploadFotoAdmin(foto)
                .then((response) => {
                  ArsipSuratService.updateProfileAdmin(
                    dataAdmin.id,
                    data.namaAdmin,
                    data.username,
                    data.password,
                    response.data.file,
                  )
                    .then(()=>{
                      setLoading(false);
                      setFotoError('');
                      Swal.fire(
                        {
                          title: 'Profil Admin Berhasil Diedit',
                          icon: 'success'}
                      )
                      navigate("/dashboard_admin_arsip_surat");
                    })
                    .catch(()=>{
                      setLoading(false);
                      setFotoError('');
                    })
                })
              
            })

          
          }
          else{
            setFotoError('File Yang Dicantumkan Harus Gambar');
            setLoading(false);
          }
        }
        else{
          await ArsipSuratService.updateProfileAdmin(
            dataAdmin.id,
            data.namaAdmin,
            data.username,
            data.password,
            dataAdmin.foto,
          )
            .then(()=>{
              setLoading(false);
              setFotoError('');
              Swal.fire(
                {
                  title: 'Profil Admin Berhasil Diedit',
                  icon: 'success'
                }
              )
              navigate("/dashboard_admin_arsip_surat");
            })
            .catch((err)=>{
              console.log(err)
              setLoading(false);
              setFotoError('');
            })
          setLoading(false); 
        }      

      },
    });

    //-----------------------------------------------------//

    const onChangeFoto = (e) => {
      const selectedFile = e.target.files[0];

      if(selectedFile){
        if(selectedFile&&allowedFiles.includes(selectedFile.type)){
          setFoto(e.target.files[0]);
          setFotoError('');   
        }
        else{
          setFotoError('File Yang Dicantumkan Harus Gambar');
          setFoto('');
        }
      }

    };       

    return (
      <div>
        {currentUser &&

        <Navbar currentUserLogin={currentUser}>
          <h1 className="my-4 text-center text-judul-surat-page">Edit Profil Admin</h1>
          <div className="container bg-form text-font-surat-page">
            <div className="mx-auto">
              <form className="mx-auto px-4" onSubmit={formik.handleSubmit}>
                <div className="d-flex align-items-center pt-3">
                  <Link className="breadcum-surat-active" to={"/profil_admin_arsip_surat"}> <span>Profil Admin</span> </Link>
                    <span className="mx-2"><ArrowRight/></span>
                  <span className="breadcum-surat">Edit Profil Admin </span>
                </div>
                
                <hr className="py-1"/>

                <div className="row mb-3">
                  <label forhtml="namaAdmin" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Nama Admin:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="namaAdmin"
                      value={formik.values.namaAdmin}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.namaAdmin ? formik.errors.namaAdmin : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="username" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Username:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.username ? formik.errors.username : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="password" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Password:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <span className="form-text">
                      *Kosongkan jika tidak ingin mengubah foto
                    </span>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="foto" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Upload Foto Baru:</label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <input 
                        className="form-control" 
                        type="file" 
                        name="foto"
                        id="foto"
                        onChange={onChangeFoto}
                      />
                    </div>
                    {fotoError&&<div className='text-danger'>{fotoError}</div>}
                    <span className="form-text">
                      *Kosongkan jika tidak ingin mengubah foto
                    </span>
                  </div>
                </div>

                <div className="row">
                  <label forhtml="foto" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Foto Lama:</label>
                  <div className="col-sm-10">
                    <img className="img-fluid" src={dataAdmin ? ArsipSuratService.downloadFotoAdmin(dataAdmin.foto) : ""} alt="Tidak Ada Gambar" /> 
                  </div>
                </div>

                <div className="text-center">
                  <hr/>
                  <Link to={"/admin_surat_masuk"} className="btn btn-kembali-surat mb-4">
                    {"<"} Kembali
                  </Link>
                  <button type="submit" className="btn mb-4 btn-surat mx-4" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span><ClipboardCheckFill/> Simpan</span>
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

export default EditProfilAdminPage;