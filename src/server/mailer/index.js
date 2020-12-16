const nodemailer = require ('nodemailer');

const transporter = nodemailer.createTransport ({
  service: 'gmail',
  auth: {
    user: 'jaesharp19@gmail.com',
    pass: 'Gp5htgs1y4e6'
  }
});

const send = async (data) => {
  return await transporter.sendMail (data);
}

module.exports = { send }