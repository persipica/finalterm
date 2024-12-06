import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, message } = req.body

    // 이메일 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 사용하는 이메일 서비스 (예: Gmail)
      auth: {
        user: process.env.EMAIL, // 환경변수에 저장된 이메일 주소
        pass: process.env.EMAIL_PASSWORD, // 환경변수에 저장된 이메일 비밀번호
      },
    })

    // 이메일 내용
    const mailOptions = {
      from: email,
      to: process.env.EMAIL, // 수신자 이메일
      subject: 'Contact Form Message',
      text: `Message: ${message}\n\nFrom: ${email}`,
    }

    try {
      // 이메일 전송
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
