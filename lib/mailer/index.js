const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const log = require('../../lib/logger');

exports.sendMail = (mailOptions) => {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  }));

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return log.error(error);
    log.info('Message sent: %s', info.messageId);
  });
};
