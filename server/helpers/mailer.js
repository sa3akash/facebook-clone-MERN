const nodemailer = require('nodemailer');
const {google} = require('googleapis');


const {OAuth2} = google.auth;

const {EMAIL,MAILING_ID,MAILING_SEC,MAILING_REFRESH} = process.env;

//     const oAuthLink = "https://developers.google.com/oauthplayground"


const auth = new OAuth2(MAILING_ID, MAILING_SEC)


// send link to active account

exports.sendVerificationEmail = (email,name,url) => {
    auth.setCredentials({ refresh_token: MAILING_REFRESH })
    const accessToken = auth.getAccessToken()
    const stmp = new nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SEC,
            refreshToken: MAILING_REFRESH,
            accessToken : accessToken
        }
    })
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Verify your email address',
        html: `
        <div style="font-family:Roboto;max-width:700px"><div style="display:flex;align-items:center;font-weight:600;gap:10px;margin-bottom:1rem;color:#3b5995"><img style="width:30px" src="https://res.cloudinary.com/dd8rotjjg/image/upload/v1671826387/samples/fb_ttb4zw.png" alt="fb"><span>Action requies: Active your Facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-weight:700"><span style="text-transform:capitalize">Hello ${name}</span><div style="font-weight:400;padding:10px 0"><span>You recently create an account on Facebook, To complete your registration, please confirm your account</span></div><div style="display:flex;align-items:center;justify-content:center"><a href="${url}" style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;display:flex;align-items:center;justify-content:center">Confirm Your Account</a></div><br><span style="font-weight:400">Facebook allow your to stay in touch with all your friends, once refistered on facebook, you can share photo, orgarnize events and much more.</span></div></div>
        `
    }

    stmp.sendMail(mailOptions, (err, info) => {
        if (err) {
            return err;
        }
        return info;
    });
}

// send code to email address

exports.sendResetCode = (email,name,code) => {
    auth.setCredentials({ refresh_token: MAILING_REFRESH })
    const accessTokens = auth.getAccessToken()
    const stmp = new nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SEC,
            refreshToken: MAILING_REFRESH,
            accessToken : accessTokens
        }
    })
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Reset facebook password',
        html: `
        <div style="font-family:Roboto;max-width:700px"><div style="display:flex;align-items:center;font-weight:600;gap:10px;margin-bottom:1rem;color:#3b5995"><img style="width:30px" src="https://res.cloudinary.com/dd8rotjjg/image/upload/v1671826387/samples/fb_ttb4zw.png" alt="fb"><span>Action requies: Reset your Facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-weight:700"><span style="text-transform:capitalize">Hello ${name}</span><div style="font-weight:400;padding:10px 0"><span>You recently create an account on Facebook, To complete your registration, please confirm your account</span></div><div style="display:flex;align-items:center;justify-content:center"><span style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;display:flex;align-items:center;justify-content:center">${code}</span></div><br><span style="font-weight:400">Facebook allow your to stay in touch with all your friends, once refistered on facebook, you can share photo, orgarnize events and much more.</span></div></div>
        `
    }

    stmp.sendMail(mailOptions, (err, info) => {
        if (err) {
            return err;
        }
        return info;
    });
}