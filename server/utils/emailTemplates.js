export const passwordSendTemplate = (userName, password) => {
  return {
    subject: "Your StudentApp Password",
    text: `Hello ${userName},

Your password is: ${password}

Please keep it safe and secure.

Best regards,
StudentApp Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Password Recovery</h2>
        <p>Hello <strong>${userName}</strong>,</p>
        <p>Your password is: <strong>${password}</strong></p>
        <p>Please keep it safe and secure.</p>
        <hr />
        <p style="font-size: 12px; color: #888;">&copy; ${new Date().getFullYear()} StudentApp</p>
      </div>
    `,
  };
};
