import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';

config();

sgMail.setApiKey(process.env.EMAIL_PASS);

export default async function sendEmail(to, subject, text, attachments = null) {
  try {
    const msg = {
      to,
      from: 'PMI Kinga Malaria <mail@pmi-kinga-malaria.org>',
      subject,
      text,
      attachments,
    };

    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
    return error;
  }
}
