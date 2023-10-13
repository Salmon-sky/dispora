// Load variabel .env ketika development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line global-require
}

// import passport
const passport = require('passport');
// import strategi jwt untuk passport
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// import model admin untuk membaca data admin dari tabel admin
const { AdminArsipSurat, AdminProposal } = require('../../models');

const cookieExtractor = function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.accessToken;
  }
  return token;
};

// buat pengaturan pembacaan jwt
const options = {
  // jwt akan diambil dari request header yang bernama 'authorization'
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),

  /* kunci yang digunakan untuk membaca jwt, harus sama dengan kunci yang
  digunakan untuk membuat jwt */
  secretOrKey: process.env.SECRET_KEY_TO_MAKE_JWT,
};

passport.use(
  'AdminArsipSurat',
  new JwtStrategy(options, (payload, done) => {
    // cari admin berdasarkan id menggunakan id yang ada di payload jwt
    // isi / payload jwt ditentukan ketika membuat jwt
    AdminArsipSurat.findOne({
      where: { id: payload.id },
    })
      .then((admin) => {
        // jika admin ditemukan, oper null sebagai nilai error & data admin ke callback
        done(null, admin);
      })
      .catch((err) => {
        // jika terjadi error, oper error & false ke callback
        // tujuan pengoperan false adalah agar callback tahu admin gagal ditemukan
        done(err, false);
      });
  }),
);

passport.use(
  'AdminProposal',
  new JwtStrategy(options, (payload, done) => {
    // cari admin berdasarkan id menggunakan id yang ada di payload jwt
    // isi / payload jwt ditentukan ketika membuat jwt
    AdminProposal.findOne({
      where: { id: payload.id },
    })
      .then((admin) => {
        // jika admin ditemukan, oper null sebagai nilai error & data admin ke callback
        done(null, admin);
      })
      .catch((err) => {
        // jika terjadi error, oper error & false ke callback
        // tujuan pengoperan false adalah agar callback tahu admin gagal ditemukan
        done(err, false);
      });
  }),
);

// export passport beserta pengaturan yang telah dibuat
module.exports = passport;
