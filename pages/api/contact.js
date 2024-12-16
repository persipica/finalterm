import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, message } = req.body

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: 'Contact Form Message',
      text: `Message: ${message}\n\nFrom: ${email}`,
    }

    try {
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ error: 'Failed to send email' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
