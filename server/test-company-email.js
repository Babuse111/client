const nodemailer = r// Create transporter (supports both Gmail and custom domains)
const isGmail = process.env.EMAIL_USER.includes('@gmail.com');

const transporterConfig = isGmail ? {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} : {
  host: process.env.SMTP_HOST || 'smtp.' + process.env.EMAIL_USER.split('@')[1],
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

console.log('🔧 Email Transport Configuration:');
if (isGmail) {
  console.log('   Type: Gmail Service');
} else {
  console.log('   Type: Custom Domain SMTP');
  console.log(`   Host: ${transporterConfig.host}`);
  console.log(`   Port: ${transporterConfig.port}`);
}
console.log('');

const transporter = nodemailer.createTransport(transporterConfig);nodemailer');
require('dotenv').config();

console.log('🧪 Testing Company Email Configuration...\n');

// Check if environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Error: EMAIL_USER and EMAIL_PASS must be set in .env file');
  console.log('\nPlease update your .env file with:');
  console.log('EMAIL_USER=your_company_email@gmail.com');
  console.log('EMAIL_PASS=your_app_password');
  console.log('\nSee company-email-setup.md for detailed instructions.');
  process.exit(1);
}

console.log('📧 Email Configuration:');
console.log(`   From: ${process.env.EMAIL_USER}`);
console.log(`   To Admin: ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`);
console.log('');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test email content
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
  subject: '✅ Company Email Configuration Test - Success!',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2e7d32;">🎉 Email Configuration Successful!</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1565c0;">Configuration Details:</h3>
        <p><strong>Sender Email:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>Admin Email:</strong> ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}</p>
        <p><strong>Test Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50;">
        <h4 style="color: #2e7d32; margin-top: 0;">✅ What's Working:</h4>
        <ul style="color: #2e7d32;">
          <li>Email authentication is successful</li>
          <li>SMTP connection established</li>
          <li>Company email is ready for notifications</li>
          <li>Admin will receive application alerts</li>
        </ul>
      </div>
      
      <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800; margin-top: 15px;">
        <h4 style="color: #f57c00; margin-top: 0;">📋 Next Steps:</h4>
        <ol style="color: #f57c00;">
          <li>Update Render environment variables</li>
          <li>Deploy updated configuration</li>
          <li>Test with real application submission</li>
          <li>Monitor email deliverability</li>
        </ol>
      </div>
      
      <p style="color: #666; text-align: center; margin-top: 30px;">
        <em>This is an automated test email from your Student Accommodation System</em>
      </p>
    </div>
  `
};

// Send test email
console.log('📤 Sending test email...');
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting Tips:');
    console.log('1. Check your email and password are correct');
    console.log('2. Make sure you\'re using an App Password, not your regular password');
    console.log('3. Ensure 2-Factor Authentication is enabled');
    console.log('4. Check your email account security settings');
  } else {
    console.log('✅ Test email sent successfully!');
    console.log(`📬 Message ID: ${info.messageId}`);
    console.log(`📧 Check your inbox at: ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`);
    console.log('\n🎉 Your company email configuration is working perfectly!');
    console.log('\nNow you can:');
    console.log('1. Update your Render environment variables');
    console.log('2. Deploy the changes');
    console.log('3. Test with real application submissions');
  }
});
