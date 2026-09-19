/**
 * IndraAstra Contact Inquiry Mailer
 * 
 * Instructions:
 * 1. Log into Google Drive / Google Apps Script using common@indraastra.in (https://script.google.com).
 * 2. Click "New project", name it "IndraAstra Contact Mailer".
 * 3. Replace the script content with this code.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "Contact Inquiry Forwarder".
 * 7. Set "Execute as": "Me (common@indraastra.in)".
 * 8. Set "Who has access": "Anyone" (allows contact submissions from website).
 * 9. Click "Deploy" and authorize permissions.
 * 10. Copy the Web app URL and paste into VITE_CONTACT_WEBHOOK_URL in .env.local on the website.
 */

const RECIPIENTS = [
  "eswar@indraastra.in",
  "dhiraj.daga@indraastra.in"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const senderName = data.name || "Inquirer";
    const senderEmail = data.email || "No email";
    const organization = data.organization ? ` (${data.organization})` : "";
    const subject = `[IndraAstra Inquiry] ${data.subject || "New Message"}`;
    
    const plainBody = 
      `New inquiry received via indraastra.in:\n\n` +
      `From: ${senderName} <${senderEmail}>${organization}\n` +
      `Subject: ${data.subject || "N/A"}\n\n` +
      `Message:\n${data.message || ""}\n\n` +
      `Submitted at: ${new Date().toUTCString()}\n`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #1e293b;">
        <div style="background: #0f172a; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #f97316; margin: 0; font-size: 20px;">IndraAstra Website Inquiry</h2>
        </div>
        <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; background: #ffffff;">
          <p><strong>From:</strong> ${senderName} &lt;<a href="mailto:${senderEmail}">${senderEmail}</a>&gt;</p>
          <p><strong>Organization:</strong> ${data.organization || "None specified"}</p>
          <p><strong>Subject:</strong> ${data.subject || "General Inquiry"}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #f97316; white-space: pre-wrap;">${(data.message || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
          <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Sent automatically by IndraAstra website inquiry forwarder.</p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: RECIPIENTS.join(","),
      replyTo: senderEmail,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success", recipients: RECIPIENTS }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
