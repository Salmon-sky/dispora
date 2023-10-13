'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static tambah({
      namaLengkap, noTelp, email, asalInstansi, perihal, fileProposal, status,
    }) {
      return this.create({
        nama_lengkap: namaLengkap,
        no_telp: noTelp,
        email,
        asal_instansi: asalInstansi,
        perihal,
        file_proposal: fileProposal,
        status,
      });
    }

    static ubah({
      namaLengkap, noTelp, email, asalInstansi, perihal, fileProposal, status,
    }, id) {
      return this.update({
        nama_lengkap: namaLengkap,
        no_telp: noTelp,
        email,
        asal_instansi: asalInstansi,
        perihal,
        file_proposal: fileProposal,
        status,
      }, { where: { id } });
    }

    // fungsi untuk delete surat masuk
    static hapus(id) {
      return this.destroy({ where: { id } });
    }

    // fungsi untuk mengambil data surat masuk berdasarkan id
    static getProposalById(id) {
      return this.findOne({ where: { id } });
    }

  }
  Proposal.init({
    nama_lengkap: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    email: DataTypes.STRING,
    asal_instansi: DataTypes.STRING,
    perihal: DataTypes.STRING,
    file_proposal: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Proposal',
  });
  return Proposal;
};