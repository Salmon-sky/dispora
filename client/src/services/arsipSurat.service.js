import axios from "axios";
const API_URL = "http://localhost:8000/arsip_surat/";

// Akun Admin
const getDataAdmin = () => {
	return axios.get(API_URL + "get_data_admin", {withCredentials: true});
}

const updateProfileAdmin = (id, namaAdmin, username, password, foto) => {
	return axios.put(API_URL + `update_admin/${id}`,
		{namaAdmin, username, password, foto},
		{withCredentials: true}
	);
}

const uploadFotoAdmin = (foto) => {
	const bodyFormData = new FormData()
  bodyFormData.append("foto", foto)
  return axios({
	  method: "post",
	  url: API_URL + "uploadFotoAdminArsipSurat",
	  data: bodyFormData,
	  headers: { "Content-Type": "multipart/form-data" },
	  withCredentials: true,
	})
}

const downloadFotoAdmin = (foto) => {
	return API_URL + `downloadFotoAdminArsipSurat/${foto}`;
}

const deleteFotoAdmin = (foto) => {
	return axios.delete(API_URL + `deleteFotoAdminArsipSurat/${foto}`, {withCredentials: true});
}

// Surat Masuk
const getDataSuratMasuk = () => {
	return axios.get(API_URL + "get_data_suratMasuk");
}

const getDataSuratMasukPublic = () => {
	return axios.get(API_URL + "get_data_suratMasuk_public");
}

const tambahSuratMasuk = (tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, bagian, status, hakAkses, filePdf, operator) => {
	return axios.post(API_URL + "tambah_suratMasuk",
	 {tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, bagian, status, hakAkses, filePdf, operator},
	 {withCredentials: true}
	);
}

const deleteSuratMasuk = (id) => {
	return axios.delete(API_URL + `delete_suratMasuk/${id}`, {withCredentials: true}  )
}

const getDataSuratById = (id) => {
	 return axios.get(API_URL + `get_data_byId_suratMasuk/${id}`)
}

const editSuratMasuk = (id, tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, bagian, status, hakAkses, filePdf, operator) => {
	 return axios.put(API_URL + `update_suratMasuk/${id}`,
	 	{tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, bagian, status, hakAkses, filePdf, operator}, 
	 	{withCredentials: true}
	 );
}

const uploadFileSuratMasuk = (surat) => {
	const bodyFormData = new FormData()
  bodyFormData.append("fileSuratMasuk", surat)
  return axios({
	  method: "post",
	  url: API_URL + "upload_file_suratMasuk",
	  data: bodyFormData,
	  headers: { "Content-Type": "multipart/form-data" },
	  withCredentials: true,
	})
}

const downloadFileSuratMasuk = (surat) => {
	return API_URL + `download_file_suratMasuk/${surat}`;
}

const deleteFileSuratMasuk = (surat) => {
	return axios.delete(API_URL + `delete_file_suratMasuk/${surat}`, {withCredentials: true});
}

// Surat Keluar
const getDataSuratKeluar = () => {
	return axios.get(API_URL + "get_data_suratKeluar");
}

const getDataSuratKeluarPublic = () => {
	return axios.get(API_URL + "get_data_suratKeluar_public");
}

const tambahSuratKeluar = (tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, kepada, perihal, bagian, status, hakAkses, filePdf, operator) => {
	return axios.post(API_URL + "tambah_suratKeluar",
	 {tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, kepada, perihal, bagian, status, hakAkses, filePdf, operator},
	 {withCredentials: true}
	);
}

const deleteSuratKeluar = (id) => {
	return axios.delete(API_URL + `delete_suratKeluar/${id}`, {withCredentials: true}  )
}

const getDataSuratKeluarById = (id) => {
	 return axios.get(API_URL + `get_data_byId_suratKeluar/${id}`)
}

const editSuratKeluar = (id, tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, kepada, perihal, bagian, status, hakAkses, filePdf, operator) => {
	 return axios.put(API_URL + `update_suratKeluar/${id}`,
	 	{tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, kepada, perihal, bagian, status, hakAkses, filePdf, operator}, 
	 	{withCredentials: true}
	 );
}

const uploadFileSuratKeluar = (surat) => {
	const bodyFormData = new FormData()
  bodyFormData.append("fileSuratKeluar", surat)
  return axios({
	  method: "post",
	  url: API_URL + "upload_file_suratKeluar",
	  data: bodyFormData,
	  headers: { "Content-Type": "multipart/form-data" },
	  withCredentials: true,
	})
}

const downloadFileSuratKeluar = (surat) => {
	return API_URL + `download_file_suratKeluar/${surat}`;
}

const deleteFileSuratKeluar = (surat) => {
	return axios.delete(API_URL + `delete_file_suratKeluar/${surat}`, {withCredentials: true});
} 

export default {
  getDataAdmin,
  updateProfileAdmin,
  uploadFotoAdmin,
  downloadFotoAdmin,
  deleteFotoAdmin,
  getDataSuratMasuk,
  getDataSuratMasukPublic,
  tambahSuratMasuk,
  getDataSuratById,
  deleteSuratMasuk,
  editSuratMasuk,
  uploadFileSuratMasuk,
  downloadFileSuratMasuk,
  deleteFileSuratMasuk,
  getDataSuratKeluar,
  getDataSuratKeluarPublic,
  tambahSuratKeluar,
  getDataSuratKeluarById,
  deleteSuratKeluar,
  editSuratKeluar,
  uploadFileSuratKeluar,
  downloadFileSuratKeluar,
  deleteFileSuratKeluar,
};