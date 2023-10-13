// import model
const { AdminArsipSurat } = require('../../../models');
const path = require("path");
const fs = require('fs-extra');

module.exports = {
  dataAdmin: (req, res) => {
    AdminArsipSurat.findAll()
      .then((admins) => res.json(admins))
      .catch((err) => res.json(err));
  },

  tambahAdmin: (req, res) => {
    AdminArsipSurat.tambahAdmin(req.body)
      .then((admin) => res.json({ message: `Admin dengan nama ${admin.nama_admin} berhasil ditambahkan` }))
      .catch((err) => res.json(err));
  },

  deleteAdmin: (req, res) => {
    AdminArsipSurat.destroy({ where: { username: req.params.username } })
      .then(() => res.json({ msg: `Admin dengan Username ${req.params.username} berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  updateAdmin: (req, res) => {
    AdminArsipSurat.updateAdmin(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Admin berhasil' }))
      .catch((err) => res.json(err));
  },

  uploadFotoAdmin: (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send({
        status: false,
        data: "No File is selected.",
      });
    }
    return res.json({ file: file.filename })    
  },

  downloadFotoAdmin: (req, res) => {
    const file = path.join(__dirname, `../../file/foto_admin_arsip_surat/${req.params.foto}`);
    return res.download(file); // Set disposition and send it.
  },

  deleteFotoAdmin: (req, res) => {
    fs.remove(path.join(__dirname, `../../file/foto_admin_arsip_surat/${req.params.foto}`))
    .then(() => {
      return res.json({ msg: "Foto Berhasil Dihapus" })
    })
    .catch(err => {
      console.error(err)
    })
  },

};
