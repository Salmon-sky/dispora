// import model
const { SuratMasuk } = require('../../../models');
const path = require("path");
const fs = require('fs-extra');

module.exports = {
  dataSuratMasuk: (req, res) => {
    SuratMasuk.findAll({ order: [ ['createdAt', 'DESC'], ] })
      .then((surats) => res.json(surats))
      .catch((err) => res.json(err));
  },

  dataSuratMasukPublic: (req, res) => {
    SuratMasuk.findAll({ where: { hak_akses: "Public" }, order: [ ['createdAt', 'DESC'], ] })
      .then((surats) => res.json(surats))
      .catch((err) => res.json(err));
  },

  tambah: (req, res) => {
    SuratMasuk.tambah(req.body)
      .then((surat) => res.json(surat))
      .catch((err) => res.json(err));
  },

  hapus: (req, res) => {
    SuratMasuk.hapus(req.params.id)
      .then(() => res.json({ msg: 'Surat berhasil dihapus' }))
      .catch((err) => res.json(err));
  },

  ubah: (req, res) => {
    SuratMasuk.ubah(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Surat berhasil' }))
      .catch((err) => res.json(err));
  },

  getSuratById: (req, res) => {
    SuratMasuk.getSuratById(req.params.id)
      .then((surat) => res.json(surat))
      .catch((err) => res.json(err));
  },

  uploadFileSuratMasuk: (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send({
        status: false,
        data: "No File is selected.",
      });
    }
    return res.json({ file: file.filename })    
  },

  downloadFileSuratMasuk: (req, res) => {
    const file = path.join(__dirname, `../../file/surat_masuk/${req.params.fileSuratMasuk}`);
    return res.download(file); // Set disposition and send it.
  },

  deleteFileSuratMasuk: (req, res) => {
    fs.remove(path.join(__dirname, `../../file/surat_masuk/${req.params.fileSuratMasuk}`))
    .then(() => {
      return res.json({ msg: "File Surat Masuk Berhasil Dihapus" })
    })
    .catch(err => {
      console.error(err)
    })
  },

};
