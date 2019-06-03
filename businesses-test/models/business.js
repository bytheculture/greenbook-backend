const mongoose = require('mongoose');
const BusinessSchema = new mongoose.Schema({
  businessName: String,
  businessAddress: String,
  coverImg: String,
  logo: String,
  businessDescription: String,
  businessTagline: String,
  phoneNumber: String,
  emailAddress: String,
  operatingHours: String,
  socialMedia: [{ facebook: String, twitter: String, instagram: String, Other: String }]
});
module.exports = mongoose.model('Business', BusinessSchema);
