import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();
const { MAIL_PASS, EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: EMAIL,
    pass: MAIL_PASS,
  },
});

export default async function sendEmail(to, subject, text, attachments = null) {
  try {
    let info = await transporter.sendMail({
      to,
      from: `PMI Kinga Malaria <${EMAIL}>`,
      subject,
      text,
      attachments,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log(error);
    return error;
  }
}
