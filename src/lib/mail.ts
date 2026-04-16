import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.atamanlab.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "form@atamanlab.com",
    pass: process.env.SMTP_PASS || "",
  },
});

interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  message: string;
  productName?: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const subject = data.productName
    ? `Neue Anfrage: ${data.productName}`
    : "Neue Kontaktanfrage über die Website";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #006591; border-bottom: 2px solid #006591; padding-bottom: 10px;">
        Neue Kontaktanfrage
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #333; width: 140px;">Name:</td>
          <td style="padding: 8px 12px; color: #555;">${data.fullName}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px 12px; font-weight: bold; color: #333;">E-Mail:</td>
          <td style="padding: 8px 12px; color: #555;">
            <a href="mailto:${data.email}" style="color: #006591;">${data.email}</a>
          </td>
        </tr>
        ${data.company ? `
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #333;">Firma:</td>
          <td style="padding: 8px 12px; color: #555;">${data.company}</td>
        </tr>
        ` : ""}
        ${data.productName ? `
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px 12px; font-weight: bold; color: #333;">Produkt:</td>
          <td style="padding: 8px 12px; color: #555;">${data.productName}</td>
        </tr>
        ` : ""}
      </table>
      <div style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 8px;">
        <p style="font-weight: bold; color: #333; margin: 0 0 8px 0;">Nachricht:</p>
        <p style="color: #555; margin: 0; white-space: pre-wrap;">${data.message}</p>
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        Diese Nachricht wurde über das Kontaktformular auf atamanlab.com gesendet.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Atamanlab Website" <${process.env.SMTP_USER || "form@atamanlab.com"}>`,
    to: process.env.CONTACT_EMAIL || "ataman@atamanlab.com",
    replyTo: data.email,
    subject,
    html,
  });
}
