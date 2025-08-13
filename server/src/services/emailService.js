// server/src/services/emailService.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const logger = require('../config/logger');

dotenv.config(); // Load environment variables

// Configure Nodemailer transporter
// You'll need to set these environment variables in your .env file
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email.
 * @param {object} options - Email options.
 * @param {string} options.to - Recipient email address.
 * @param {string} options.subject - Subject of the email.
 * @param {string} options.text - Plain text content of the email.
 * @param {string} [options.html] - HTML content of the email.
 * @returns {Promise<object>} - Information about the sent email.
 * @throws {Error} If email sending fails.
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Real Soccer <noreply@realsoccer.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId} to ${options.to}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${options.to}: ${error.message}`);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Sends a password reset email.
 * @param {string} email - The recipient's email address.
 * @param {string} resetUrl - The URL for password reset.
 */
const sendPasswordResetEmail = async (email, resetUrl) => {
  const subject = 'Real Soccer: Password Reset Request';
  const text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    ${resetUrl}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.`;
  const html = `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
    <p>Please click on the following link, or paste this into your browser to complete the process:</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

  await sendEmail({ to: email, subject, text, html });
  logger.info(`Password reset email sent to: ${email}`);
};

/**
 * Sends an order confirmation email.
 * @param {string} email - The recipient's email address.
 * @param {object} orderDetails - Details of the confirmed order.
 */
const sendOrderConfirmationEmail = async (email, orderDetails) => {
  const subject = `Real Soccer: Order Confirmation #${orderDetails._id}`;
  const text = `Your order #${orderDetails._id} has been successfully placed!\n\n
    Total: ${orderDetails.totalPrice}\n
    Items: ${orderDetails.orderItems.map(item => `${item.name} (x${item.qty})`).join(', ')}\n\n
    Thank you for your purchase!`;
  const html = `
    <p>Your order <strong>#${orderDetails._id}</strong> has been successfully placed!</p>
    <p><strong>Total:</strong> $${orderDetails.totalPrice.toFixed(2)}</p>
    <p><strong>Items:</strong></p>
    <ul>
      ${orderDetails.orderItems.map(item => `<li>${item.name} (x${item.qty}) - $${item.price.toFixed(2)} each</li>`).join('')}
    </ul>
    <p>Thank you for your purchase!</p>
  `;

  await sendEmail({ to: email, subject, text, html });
  logger.info(`Order confirmation email sent to: ${email} for order ${orderDetails._id}`);
};


module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
};