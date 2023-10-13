import axios from "axios";
const API_URL = "http://localhost:8000/proposal/";

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
	  url: API_URL + "uploadFotoAdminProposal",
	  data: bodyFormData,
	  headers: { "Content-Type": "multipart/form-data" },
	  withCredentials: true,
	})
}

const downloadFotoAdmin = (foto) => {
	return API_URL + `downloadFotoAdminProposal/${foto}`;
}

const deleteFotoAdmin = (foto) => {
	return axios.delete(API_URL + `deleteFotoAdminProposal/${foto}`, {withCredentials: true});
}

// Proposal
const getDataProposal = () => {
	return axios.get(API_URL + "get_data_proposal");
}

const tambahProposal = (namaLengkap, noTelp, email, asalInstansi, perihal, fileProposal, status,) => {
	return axios.post(API_URL + "tambah_proposal",
	 {namaLengkap, noTelp, email, asalInstansi, perihal, fileProposal, status,},
	 {withCredentials: true}
	);
}

const deleteProposal = (id) => {
	return axios.delete(API_URL + `delete_proposal/${id}`, {withCredentials: true}  )
}

const getDataProposalById = (id) => {
	 return axios.get(API_URL + `get_data_byId_proposal/${id}`)
}

const editProposal = (id, namaLengkap, noTelp, email, asalInstansi, perihal, fileProposal, status,) => {
	 return axios.put(API_URL + `update_proposal/${id}`,
	 	{namaLengkap, noTelp, email, asalInstansi, perihal, fileProposal, status,}, 
	 	{withCredentials: true}
	 );
}

const uploadFileProposal = (proposal) => {
	const bodyFormData = new FormData()
  bodyFormData.append("fileProposal", proposal)
  return axios({
	  method: "post",
	  url: API_URL + "upload_file_proposal",
	  data: bodyFormData,
	  headers: { "Content-Type": "multipart/form-data" },
	  withCredentials: true,
	})
}

const downloadFileProposal = (proposal) => {
	return API_URL + `download_file_proposal/${proposal}`;
}

const deleteFileProposal = (proposal) => {
	return axios.delete(API_URL + `delete_file_proposal/${proposal}`, {withCredentials: true});
}



export default {
  getDataAdmin,
  updateProfileAdmin,
  uploadFotoAdmin,
  downloadFotoAdmin,
  deleteFotoAdmin,
  getDataProposal,
  tambahProposal,
  getDataProposalById,
  deleteProposal,
  editProposal,
  uploadFileProposal,
  downloadFileProposal,
  deleteFileProposal,
};