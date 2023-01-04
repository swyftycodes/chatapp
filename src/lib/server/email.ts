import nodemailer from 'nodemailer';
import { EMAIL, PASSWORD} from '$env/static/private';

let mailTransporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: EMAIL, 
		pass: PASSWORD 
	}
})

export default mailTransporter;
