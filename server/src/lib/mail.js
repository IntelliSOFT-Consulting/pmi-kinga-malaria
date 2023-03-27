import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

config();

const { MAIL_PASS, EMAIL, EMAIL_PASS } = process.env;

sgMail.setApiKey(EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: EMAIL,
    pass: MAIL_PASS,
  },
});

export default async function sendEmail(to, subject, text, attachments = null) {
  try {
    if (MAIL_PASS) {
      const send = await transporter.sendMail({
        from: `PMI Kinga Malaria <${EMAIL}>`,
        to,
        subject,
        text,
        attachments,
      });
      return send;
    }
    const msg = {
      to,
      from: 'PMI Kinga Malaria <mail@pmi-kinga-malaria.org>',
      subject,
      text,
      attachments,
    };

    await sgMail.send(msg);
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
}
