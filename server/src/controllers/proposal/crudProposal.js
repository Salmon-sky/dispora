// import model
const { Proposal } = require('../../../models');
const path = require("path");
const fs = require('fs-extra');

module.exports = {
  dataProposal: (req, res) => {
    Proposal.findAll()
      .then((proposals) => res.json(proposals))
      .catch((err) => res.json(err));
  },

  tambah: (req, res) => {
    Proposal.tambah(req.body)
      .then((proposal) => res.json(proposal))
      .catch((err) => res.json(err));
  },

  hapus: (req, res) => {
    Proposal.hapus(req.params.id)
      .then(() => res.json({ msg: 'Proposal berhasil dihapus' }))
      .catch((err) => res.json(err));
  },

  ubah: (req, res) => {
    Proposal.ubah(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Proposal berhasil' }))
      .catch((err) => res.json(err));
  },

  getProposalById: (req, res) => {
    Proposal.getProposalById(req.params.id)
      .then((proposal) => res.json(proposal))
      .catch((err) => res.json(err));
  },

  uploadFileProposal: (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send({
        status: false,
        data: "No File is selected.",
      });
    }
    return res.json({ file: file.filename })    
  },

  downloadFileProposal: (req, res) => {
    const file = path.join(__dirname, `../../file/proposal/${req.params.fileProposal}`);
    return res.download(file); // Set disposition and send it.
  },

  deleteFileProposal: (req, res) => {
    fs.remove(path.join(__dirname, `../../file/proposal/${req.params.fileProposal}`))
    .then(() => {
      return res.json({ msg: "File Proposal Berhasil Dihapus" })
    })
    .catch(err => {
      console.error(err)
    })
  },

};
