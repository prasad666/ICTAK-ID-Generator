const sendMail = require("../utils/email");

module.exports = {
  contactFormHandler: async function (req, res) {
    const message = `<h2>Contact form submission</h2>
Name: ${req.body.Fullname}<br/>
Email: ${req.body.Email}<br/>
Phone: ${req.body.Phone}<br/>
Remarks:<br/>
${req.body.Comment}
    `;
    await sendMail({
      mail: process.env.EMAIL,
      subject: "New contact form submission",
      message: message,
    }).then(() => res.json({ status: "success" }));
  },
};
