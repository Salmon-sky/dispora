// multer
const multer = require("multer");
// path
const path = require("path");

const diskStorageFotoAdminArsipSurat = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../file/foto_admin_arsip_surat"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const diskStorageFotoAdminProposal = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../file/foto_admin_proposal"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const diskStorageProposal = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../file/proposal"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const diskStorageSuratMasuk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../file/surat_masuk"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const diskStorageSuratKeluar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../file/surat_keluar"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const multerFilterPdf = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Bukan file pdf!!"), false);
  }
};

const multerFilterFoto = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "gif" ) {
    cb(null, true);
  } else {
    cb(new Error("Bukan file foto!!"), false);
  }
};

const uploadFotoAdminArsipSurat = multer({
  storage: diskStorageFotoAdminArsipSurat,
  fileFilter: multerFilterFoto,
});

const uploadFotoAdminProposal = multer({
  storage: diskStorageFotoAdminProposal,
  fileFilter: multerFilterFoto,
});

const uploadFileSuratMasuk = multer({
  storage: diskStorageSuratMasuk,
  fileFilter: multerFilterPdf,
});

const uploadFileSuratKeluar = multer({
  storage: diskStorageSuratKeluar,
  fileFilter: multerFilterPdf,
});

const uploadFileProposal = multer({
  storage: diskStorageProposal,
  fileFilter: multerFilterPdf,
});

module.exports = {
  uploadFotoAdminArsipSurat,
  uploadFileSuratMasuk,
  uploadFileSuratKeluar,
  uploadFotoAdminProposal,
  uploadFileProposal,
};