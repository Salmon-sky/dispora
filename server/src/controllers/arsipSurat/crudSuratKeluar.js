// import model
const { SuratKeluar } = require('../../../models');
const path = require("path");
const fs = require('fs-extra');

module.exports = {
  dataSuratKeluar: (req, res) => {
    SuratKeluar.findAll({ order: [ ['createdAt', 'DESC'], ] })
      .then((surats) => res.json(surats))
      .catch((err) => res.json(err));
  },
  
  dataSuratKeluarPublic: (req, res) => {
    SuratKeluar.findAll({ where: { hak_akses: "Public" }, order: [ ['createdAt', 'DESC'], ] })
      .then((surats) => res.json(surats))
      .catch((err) => res.json(err));
  },

  tambah: (req, res) => {
    SuratKeluar.tambah(req.body)
      .then((surat) => res.json(surat))
      .catch((err) => res.json(err));
  },

  hapus: (req, res) => {
    SuratKeluar.hapus(req.params.id)
      .then(() => res.json({ msg: 'Surat berhasil dihapus' }))
      .catch((err) => res.json(err));
  },

  ubah: (req, res) => {
    SuratKeluar.ubah(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Surat berhasil' }))
      .catch((err) => res.json(err));
  },

  getSuratById: (req, res) => {
    SuratKeluar.getSuratById(req.params.id)
      .then((surat) => res.json(surat))
      .catch((err) => res.json(err));
  },

  uploadFileSuratKeluar: (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send({
        status: false,
        data: "No File is selected.",
      });
    }
    return res.json({ file: file.filename })    
  },

  downloadFileSuratKeluar: (req, res) => {
    const file = path.join(__dirname, `../../file/surat_keluar/${req.params.fileSuratKeluar}`);
    return res.download(file); // Set disposition and send it.
  },

  deleteFileSuratKeluar: (req, res) => {
    fs.remove(path.join(__dirname, `../../file/surat_keluar/${req.params.fileSuratKeluar}`))
    .then(() => {
      return res.json({ msg: "File Surat Keluar Berhasil Dihapus" })
    })
    .catch(err => {
      console.error(err)
    })
  },

};
