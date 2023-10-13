'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SuratMasuks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal_masuk: {
        type: Sequelize.DATE
      },
      kode_surat: {
        type: Sequelize.STRING
      },
      nomor_surat: {
        type: Sequelize.STRING
      },
      tanggal_surat: {
        type: Sequelize.DATE
      },
      pengirim: {
        type: Sequelize.STRING
      },
      perihal: {
        type: Sequelize.TEXT
      },
      bagian: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      hak_akses: {
        type: Sequelize.STRING
      },
      file_pdf: {
        type: Sequelize.STRING
      },
      operator: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SuratMasuks');
  }
};