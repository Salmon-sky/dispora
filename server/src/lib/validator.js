const { body, validationResult } = require('express-validator');
const {
  AdminArsipSurat,
} = require('../../models');

const tambahAdminRules = () => [
  body('namaAdmin', 'Nama Admin tidak boleh kosong').isLength({ min: 1 }).trim(),
  body('username', 'Username tidak boleh kosong').isLength({ min: 1 }).trim(),
  body('username').custom((value) => AdminArsipSurat.findOne({ where: { username: value } }).then((admin) => { // eslint-disable-line consistent-return
    if (admin) {
      return Promise.reject('Username Telah digunakan'); // eslint-disable-line prefer-promise-reject-errors
    }
  })),
  body('password', 'Password tidak boleh kosong').isLength({ min: 1 }),
];

const updateAdminRules = () => [
  body('namaAdmin', 'Nama Admin tidak boleh kosong').isLength({ min: 1 }).trim(),
  body('username', 'Username tidak boleh kosong').isLength({ min: 1 }).trim(),
  body('username').custom((value, { req }) => AdminArsipSurat.findOne({ where: { username: value } }).then((admin) => { // eslint-disable-line consistent-return
    if (admin && admin.id != req.params.id) { // eslint-disable-line eqeqeq
      return Promise.reject('Username Telah digunakan'); // eslint-disable-line prefer-promise-reject-errors
    }
  })),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  updateAdminRules,
  tambahAdminRules,
  validate,
};
