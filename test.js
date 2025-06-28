import dotenv from 'dotenv';
dotenv.config();

const url = 'https://api.smtp2go.com/v3/email/send';
const name = 'Seraphim Teacher';
const email = 'seraphim.teacher@gmail.com';

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Smtp2go-Api-Key': process.env.SMTP2GO_API_KEY
  },
  body: JSON.stringify({
    sender: 'Langmate Team <hello@langmate.io>',
    to: ['${name} <${email}>'],
    subject: "👋 Welcome to Langmate's Waitlist",
    html_body: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <p style="font-size: 16px; line-height: 1.5;">Thanks for your interest in Langmate!</p>
        <p style="font-size: 16px; line-height: 1.5;">We've added you to our waitlist and we'll let you know as soon as we launch. Feel free to reply to this email if you have any questions!</p>
        <p style="font-size: 16px; line-height: 1.5;">Best regards,<br>The Langmate Team</p>
      </div>
    `,
    text_body: `Thanks for your interest in Langmate! We've added you to our waitlist and we'll let you know as soon as we launch. Feel free to reply to this email if you have any questions!

Best regards,
The Langmate Team`,
    reply_to: 'hello@langmate.io',
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));