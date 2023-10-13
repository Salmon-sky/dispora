const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { proposal } = require('../controllers');

const {
  uploadFotoAdminProposal, uploadFileProposal,
} = require('../lib/multerConfig');

// Endpoint Login
router.post('/login', proposal.authProposal.login);

// Crud Proposal Public
router.post('/tambah_proposal', proposal.crudProposal.tambah);
router.get('/get_data_proposal', proposal.crudProposal.dataProposal);
router.get('/get_data_byId_proposal/:id', proposal.crudProposal.getProposalById); 

// ---------------------Endpoint dibawah dan setelahnya memiliki autentikasi--------------------

// Endpoint Admin yg sedang login
router.get('/whoami', authenticate.AdminProposal, proposal.authProposal.whoami);
// Endpoint Logout
router.get('/logout', authenticate.AdminProposal, proposal.authProposal.logout);

// Akun Admin
router.get('/get_data_admin', authenticate.AdminProposal, proposal.crudAdmin.dataAdmin);
router.delete('/delete_admin/:username', authenticate.AdminProposal, proposal.crudAdmin.deleteAdmin);
router.put('/update_admin/:id', authenticate.AdminProposal, proposal.crudAdmin.updateAdmin);
router.post('/tambah_admin', authenticate.AdminProposal, proposal.crudAdmin.tambahAdmin);
router.post("/uploadFotoAdminProposal", authenticate.AdminProposal, uploadFotoAdminProposal.single("foto"), proposal.crudAdmin.uploadFotoAdmin );
router.get('/downloadFotoAdminProposal/:foto', authenticate.AdminProposal, proposal.crudAdmin.downloadFotoAdmin);
router.delete('/deleteFotoAdminProposal/:foto', authenticate.AdminProposal, proposal.crudAdmin.deleteFotoAdmin);

// Endpoint crud proposal
router.put('/update_proposal/:id', authenticate.AdminProposal, proposal.crudProposal.ubah);
router.delete('/delete_proposal/:id', authenticate.AdminProposal, proposal.crudProposal.hapus);
router.post("/upload_file_proposal", uploadFileProposal.single("fileProposal"), proposal.crudProposal.uploadFileProposal );
router.get('/download_file_proposal/:fileProposal', proposal.crudProposal.downloadFileProposal);
router.delete('/delete_file_proposal/:fileProposal', authenticate.AdminProposal, proposal.crudProposal.deleteFileProposal);

module.exports = router;