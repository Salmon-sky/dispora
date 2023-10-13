const passport = require('../lib/passport');

module.exports = {
  AdminArsipSurat: passport.authenticate('AdminArsipSurat', { session: false }),
  AdminProposal: passport.authenticate('AdminProposal', { session: false }),
};
