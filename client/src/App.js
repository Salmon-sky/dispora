import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
// ---------------------Compponent Arsip Surat--------------------------------------//
import LoginAdminArsipSurat from "./components/arsipSurat/dashboardAdmin/LoginAdminArsipSurat";
import DashboardAdminArsipSurat from "./components/arsipSurat/dashboardAdmin/DashboardAdminArsipSurat";
import ProfilAdminArsipSurat from "./components/arsipSurat/dashboardAdmin/ProfilAdmin";
import EditProfilAdmin from "./components/arsipSurat/dashboardAdmin/EditProfilAdmin";

import SuratMasukPage from "./components/arsipSurat/dashboardAdmin/SuratMasukPage";
import TambahSuratMasukPage from "./components/arsipSurat/dashboardAdmin/TambahSuratMasukPage";
import DetailSuratMasuk from "./components/arsipSurat/dashboardAdmin/DetailSuratMasuk";
import EditSuratMasuk from "./components/arsipSurat/dashboardAdmin/EditSuratMasuk";

import SuratKeluarPage from "./components/arsipSurat/dashboardAdmin/SuratKeluarPage";
import TambahSuratKeluarPage from "./components/arsipSurat/dashboardAdmin/TambahSuratKeluarPage";
import DetailSuratKeluar from "./components/arsipSurat/dashboardAdmin/DetailSuratKeluar";
import EditSuratKeluar from "./components/arsipSurat/dashboardAdmin/EditSuratKeluar";

import ArsipSuratPage from "./components/arsipSurat/ArsipSuratPage";
import SuratMasukPublic from "./components/arsipSurat/SuratMasukPage";
import DetailSuratMasukPublic from "./components/arsipSurat/DetailSuratMasuk";
import SuratKeluarPublic from "./components/arsipSurat/SuratKeluarPage";
import DetailSuratKeluarPublic from "./components/arsipSurat/DetailSuratKeluar";

// ---------------------Compponent Proposal--------------------------------------//
import HomeProposal from "./components/proposal/Home";
import AjukanProposalPage from "./components/proposal/AjukanProposalPage";
import CekProposal from "./components/proposal/CekProposal";
import TentangProposal from "./components/proposal/TentangProposal";

import LoginAdminProposal from "./components/proposal/dashboardAdmin/LoginAdminProposal";
import DashboardAdminProposal from "./components/proposal/dashboardAdmin/DashboardAdminProposal";
import ProfilAdminProposal from "./components/proposal/dashboardAdmin/ProfilAdmin";
import EditProfilAdminProposal from "./components/proposal/dashboardAdmin/EditProfilAdmin";

import ProposalPage from "./components/proposal/dashboardAdmin/ProposalPage";
import DetailProposal from "./components/proposal/dashboardAdmin/DetailProposal";
import EditProposal from "./components/proposal/dashboardAdmin/EditProposal";

//Home
import Home from "./components/Home";
import Tentang from "./components/Tentang";

function App() {
  return (
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/home"} element={<Home />} />
      <Route exact path={"/tentang"} element={<Tentang />} />

      <Route exact path="/login_admin_arsip_surat" element={<LoginAdminArsipSurat />} />
      <Route exact path="/dashboard_admin_arsip_surat" element={<DashboardAdminArsipSurat />} />
      <Route exact path="/profil_admin_arsip_surat" element={<ProfilAdminArsipSurat />} />
      <Route exact path="/profil_admin_arsip_surat/edit" element={<EditProfilAdmin />} />

      <Route exact path="/admin_surat_masuk" element={<SuratMasukPage />} />
      <Route exact path="/admin_surat_masuk/tambah" element={<TambahSuratMasukPage />} />
      <Route exact path="/admin_surat_masuk/detail/:id" element={<DetailSuratMasuk />} />
      <Route exact path="/admin_surat_masuk/edit/:id" element={<EditSuratMasuk />} />
      <Route exact path="/admin_surat_keluar" element={<SuratKeluarPage />} />
      <Route exact path="/admin_surat_keluar/tambah" element={<TambahSuratKeluarPage />} />
      <Route exact path="/admin_surat_keluar/detail/:id" element={<DetailSuratKeluar />} />
      <Route exact path="/admin_surat_keluar/edit/:id" element={<EditSuratKeluar />} />

      <Route exact path="/arsip_surat" element={<ArsipSuratPage />} />
      <Route exact path="/arsip_surat/surat_masuk" element={<SuratMasukPublic />} />
      <Route exact path="/arsip_surat/surat_masuk/detail/:id" element={<DetailSuratMasukPublic />} />
      <Route exact path="/arsip_surat/surat_keluar" element={<SuratKeluarPublic />} />
      <Route exact path="/arsip_surat/surat_keluar/detail/:id" element={<DetailSuratKeluarPublic />} />

      <Route exact path={"/pengajuan_proposal"} element={<HomeProposal />} />
      <Route exact path={"/tentang_proposal"} element={<TentangProposal />} />
      <Route exact path={"/pengajuan_proposal/ajukan_proposal"} element={<AjukanProposalPage />} />
      <Route exact path={"/pengajuan_proposal/cek_proposal"} element={<CekProposal />} />

      <Route exact path="/login_admin_proposal" element={<LoginAdminProposal />} />
      <Route exact path="/profil_admin_proposal" element={<ProfilAdminProposal />} />
      <Route exact path="/profil_admin_proposal/edit" element={<EditProfilAdminProposal />} />

      <Route exact path="/dashboard_admin_proposal" element={<DashboardAdminProposal />} />
      <Route exact path="/admin_proposal" element={<ProposalPage />} />
      <Route exact path="/admin_proposal/detail/:id" element={<DetailProposal />} />
      <Route exact path="/admin_proposal/edit/:id" element={<EditProposal />} />

      

    </Routes>
  );
}

export default App;
