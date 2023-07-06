var nodemailer = require("nodemailer");

/* This is the configuration of the SMTP server. */
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_EMAIL_PASS,
  },
});

// var smtpTransport = nodemailer.createTransport({
//   host: "ssl0.ovh.net",
//   service: "ovh.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.NODEMAILER_EMAIL,
//     pass: process.env.NODEMAILER_EMAIL_PASS,
//   },
// });
module.exports = smtpTransport;
