const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SuratMasuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { // eslint-disable-line no-unused-vars
      // define association here
    }

    static tambah({
      tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, bagian, status, hakAkses, filePdf, operator,
    }) {
      return this.create({
        tanggal_masuk: tanggalMasuk,
        kode_surat: kodeSurat,
        nomor_surat: nomorSurat,
        tanggal_surat: tanggalSurat,
        pengirim,
        perihal,
        bagian,
        status,
        hak_akses: hakAkses,
        file_pdf: filePdf,
        operator,
      });
    }

    static ubah({
      tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, bagian, status, hakAkses, filePdf, operator,
    }, id) {
      return this.update({
        tanggal_masuk: tanggalMasuk,
        kode_surat: kodeSurat,
        nomor_surat: nomorSurat,
        tanggal_surat: tanggalSurat,
        pengirim,
        perihal,
        bagian,
        status,
        hak_akses: hakAkses,
        file_pdf: filePdf,
        operator
      }, { where: { id } });
    }

    // fungsi untuk delete surat masuk
    static hapus(id) {
      return this.destroy({ where: { id } });
    }

    // fungsi untuk mengambil data surat masuk berdasarkan id
    static getSuratById(id) {
      return this.findOne({ where: { id } });
    }
  }
  SuratMasuk.init({
    tanggal_masuk: DataTypes.DATE,
    kode_surat: DataTypes.STRING,
    nomor_surat: DataTypes.STRING,
    tanggal_surat: DataTypes.DATE,
    pengirim: DataTypes.STRING,
    perihal: DataTypes.TEXT,
    bagian: DataTypes.STRING,
    status: DataTypes.STRING,
    hak_akses: DataTypes.STRING,
    file_pdf: DataTypes.STRING,
    operator: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SuratMasuk',
  });
  return SuratMasuk;
};
