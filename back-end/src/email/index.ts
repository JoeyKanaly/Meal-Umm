import nodemailer from 'nodemailer';

interface SendMailOptions {
	recipient: string,
	message: string,
	htmlMessage?: string,
	subject: string,
}

export async function sendMail(options: SendMailOptions) {
	try {
		const { SMTP_HOST, SMTP_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env!;
		let transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: parseInt(SMTP_PORT!),
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASSWORD
			}
		});
		await transporter.sendMail({
			from: EMAIL_USER,
			to: options.recipient,
			subject: options.subject,
			text: options.message,
			html: options.htmlMessage
		});
	} catch (error) {
		console.error(error);
	}
}