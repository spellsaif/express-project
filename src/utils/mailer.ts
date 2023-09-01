import nodemailer, { SendMailOptions } from 'nodemailer';
import logger from './logger';

//Uncomment it if you wanna generate test credentials

// async function createTestCredentials() {
//     const credentials = await nodemailer.createTestAccount()
//     console.table(credentials)
// }

// createTestCredentials();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: { user: 'pgd4kgdf7vgqval5@ethereal.email', pass: 'BdmGSPRmeHRQbYQW1H' }
});

async function sendMail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      logger.error(err, 'error sending email');
      return;
    }

    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendMail;
