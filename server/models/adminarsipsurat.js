const {
  Model,
} = require('sequelize');

/* import bcrypt untuk melakukan enkripsi */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class AdminArsipSurat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { // eslint-disable-line no-unused-vars
      // define association here
    }

    // Method untuk melakukan enkripsi
    static async encrypt(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    }

    /* Method tambahAdmin, untuk menambahkan Admin */
    static async tambahAdmin({
      namaAdmin, username, password, foto,
    }) {
      const encryptedPassword = await this.encrypt(password);
      /*
        encrypt dari static method
        encryptedPassword akan sama dengan string hasil enkripsi password dari method encrypt
      */

      return this.create({
        nama_admin: namaAdmin, username, password: encryptedPassword, foto,
      });
    }

    /* Method update, untuk update Admin */
    static async updateAdmin({
      namaAdmin, username, password, foto,
    }, id) {
      if (password != '') { // eslint-disable-line eqeqeq
        const encryptedPassword = await this.encrypt(password);
        return this.update({
          nama_admin: namaAdmin, username, password: encryptedPassword, foto,
        }, { where: { id } });
      }

      return this.update({ nama_admin: namaAdmin, username, foto }, { where: { id } });
    }
  }
  AdminArsipSurat.init({
    nama_admin: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    foto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AdminArsipSurat',
  });
  return AdminArsipSurat;
};
