const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sahibach0@gmail.com',
        pass: 'fakegmail'
    }
});

const mailOptions = {
    from: 'sahibach0@gmail.com',
    to: 'uk0164176@gmail.com, rabiyasheikh93@gmail.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>sending in html format<h1><ul><li>list item 1</li><li>list item 2</li><li>list item 3</li></ul>'
}

transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
        console.log(err);
    }
    else {
        console.log('Email sent '+info.response);
    }
})