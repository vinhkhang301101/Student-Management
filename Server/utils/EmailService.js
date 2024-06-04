import nodemailer from "nodemailer";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 456,
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }
  async sendEmail(from, to, subject, text, html) {
    await this.transporter.sendMail({from, to, subject, text, html})
  }
}

export default EmailService
