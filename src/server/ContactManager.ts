import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

class ContactManager {
  private transporter: Mail;
  private toEmail = "dogz4lifeaus.com.au";

  constructor() {
    this.transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail",
    });
  }

  sendContactMail(from: string, subject: string, text: string) {
    return new Promise<string>((resolve, reject) => {
      this.transporter.sendMail(
        {
          from,
          to: this.toEmail,
          subject,
          text,
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        }
      );
    });
  }
}

export default ContactManager
