import { Resend } from 'resend';

interface AppointmentEmailData {
  name: string;
  email: string;
  subject: string;
  preferredDate: string;
  preferredTime: string;
  message?: string | null;
}

export async function sendAppointmentEmail(data: AppointmentEmailData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, subject, preferredDate, preferredTime, message } = data;

  const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .info-row {
            margin: 15px 0;
            padding: 10px;
            background: white;
            border-left: 4px solid #667eea;
            border-radius: 4px;
          }
          .label {
            font-weight: bold;
            color: #667eea;
          }
          .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✟ New Prayer Request</h1>
            <p>Rivers of Living Waters Ministry</p>
          </div>
          <div class="content">
            <p>A new prayer request and appointment has been submitted:</p>

            <div class="info-row">
              <span class="label">Name:</span> ${name}
            </div>

            <div class="info-row">
              <span class="label">Email:</span> ${email}
            </div>

            <div class="info-row">
              <span class="label">Subject:</span> ${subject}
            </div>

            <div class="info-row">
              <span class="label">Preferred Date:</span> ${formattedDate}
            </div>

            <div class="info-row">
              <span class="label">Preferred Time:</span> ${preferredTime}
            </div>

            ${message ? `
              <div class="info-row">
                <span class="label">Message:</span><br/>
                ${message}
              </div>
            ` : ''}

            <div class="footer">
              <p>Please reach out to ${email} to confirm the appointment.</p>
              <p>Sent from Rivers of Living Waters Ministry Website</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return resend.emails.send({
    from: 'Rivers of Living Waters Ministry <onboarding@resend.dev>',
    to: ['rexoquendo@gmail.com'],
    replyTo: email,
    subject: `New Prayer Request: ${subject}`,
    html: emailHtml,
  });
}
