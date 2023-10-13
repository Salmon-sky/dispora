const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { arsipSurat } = require('../controllers');
const {
  tambahAdminRules, updateAdminRules,
  validate,
} = require('../lib/validator');

const {
  uploadFotoAdminArsipSurat, uploadFileSuratMasuk, uploadFileSuratKeluar
} = require('../lib/multerConfig');

// Endpoint Login
router.post('/login', arsipSurat.authArsipSurat.login);
// Enpoint data Surat Masuk
router.get('/get_data_suratMasuk', arsipSurat.crudSuratMasuk.dataSuratMasuk);
router.get('/get_data_suratMasuk_public', arsipSurat.crudSuratMasuk.dataSuratMasukPublic);
router.get('/get_data_byId_suratMasuk/:id', arsipSurat.crudSuratMasuk.getSuratById);
// Endpoint data Surat Keluar
router.get('/get_data_suratKeluar', arsipSurat.crudSuratKeluar.dataSuratKeluar);
router.get('/get_data_suratKeluar_public', arsipSurat.crudSuratKeluar.dataSuratKeluarPublic);
router.get('/get_data_byId_suratKeluar/:id', arsipSurat.crudSuratKeluar.getSuratById);


// ---------------------Endpoint dibawah dan setelahnya memiliki autentikasi--------------------

// Endpoint Admin yg sedang login
router.get('/whoami', authenticate.AdminArsipSurat, arsipSurat.authArsipSurat.whoami);
// Endpoint Logout
router.get('/logout', authenticate.AdminArsipSurat, arsipSurat.authArsipSurat.logout);

// Akun Admin
router.get('/get_data_admin', authenticate.AdminArsipSurat, arsipSurat.crudAdmin.dataAdmin);
router.delete('/delete_admin/:username', authenticate.AdminArsipSurat, arsipSurat.crudAdmin.deleteAdmin);
router.put('/update_admin/:id', authenticate.AdminArsipSurat, updateAdminRules(), validate, arsipSurat.crudAdmin.updateAdmin);
router.post('/tambah_admin', authenticate.AdminArsipSurat, tambahAdminRules(), validate, arsipSurat.crudAdmin.tambahAdmin);
router.post("/uploadFotoAdminArsipSurat", authenticate.AdminArsipSurat, uploadFotoAdminArsipSurat.single("foto"), arsipSurat.crudAdmin.uploadFotoAdmin );
router.get('/downloadFotoAdminArsipSurat/:foto', authenticate.AdminArsipSurat, arsipSurat.crudAdmin.downloadFotoAdmin);
router.delete('/deleteFotoAdminArsipSurat/:foto', authenticate.AdminArsipSurat, arsipSurat.crudAdmin.deleteFotoAdmin);

// Endpoint crud surat masuk
router.post('/tambah_suratMasuk', authenticate.AdminArsipSurat, arsipSurat.crudSuratMasuk.tambah);
router.put('/update_suratMasuk/:id', authenticate.AdminArsipSurat, arsipSurat.crudSuratMasuk.ubah);
router.delete('/delete_suratMasuk/:id', authenticate.AdminArsipSurat, arsipSurat.crudSuratMasuk.hapus);
router.post("/upload_file_suratMasuk", authenticate.AdminArsipSurat, uploadFileSuratMasuk.single("fileSuratMasuk"), arsipSurat.crudSuratMasuk.uploadFileSuratMasuk );
router.get('/download_file_suratMasuk/:fileSuratMasuk', arsipSurat.crudSuratMasuk.downloadFileSuratMasuk);
router.delete('/delete_file_suratMasuk/:fileSuratMasuk', authenticate.AdminArsipSurat, arsipSurat.crudSuratMasuk.deleteFileSuratMasuk);

// Endpoint crud surat keluar
router.post('/tambah_suratKeluar', authenticate.AdminArsipSurat, arsipSurat.crudSuratKeluar.tambah);
router.put('/update_suratKeluar/:id', authenticate.AdminArsipSurat, arsipSurat.crudSuratKeluar.ubah);
router.delete('/delete_suratKeluar/:id', authenticate.AdminArsipSurat, arsipSurat.crudSuratKeluar.hapus);
router.post("/upload_file_suratKeluar", authenticate.AdminArsipSurat, uploadFileSuratKeluar.single("fileSuratKeluar"), arsipSurat.crudSuratKeluar.uploadFileSuratKeluar );
router.get('/download_file_suratKeluar/:fileSuratKeluar', arsipSurat.crudSuratKeluar.downloadFileSuratKeluar);
router.delete('/delete_file_suratKeluar/:fileSuratKeluar', authenticate.AdminArsipSurat, arsipSurat.crudSuratKeluar.deleteFileSuratKeluar);

module.exports = router;
