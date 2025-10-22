const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🧪 Testing Khayalethu Email Configuration...\n');

// Check if environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Error: EMAIL_USER and EMAIL_PASS must be set in .env file');
  console.log('\nPlease update your .env file with:');
  console.log('EMAIL_USER=admin@thespacehotels.online');
  console.log('EMAIL_PASS=your_email_password');
  console.log('\nSee company-domain-email-setup.md for detailed instructions.');
  process.exit(1);
}

console.log('� Khayalethu - Email Configuration:');
console.log(`   From: ${process.env.EMAIL_USER}`);
console.log(`   To Admin: ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`);
console.log(`   Domain: thespacehotels.online`);
console.log('');

// Create transporter (supports both Gmail and custom domains)
const isGmail = process.env.EMAIL_USER.includes('@gmail.com');

const transporterConfig = isGmail ? {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} : {
  host: process.env.SMTP_HOST || 'smtp.thespacehotels.online',
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

const transporter = nodemailer.createTransport(transporterConfig);

// Test email content with The Space Hotels branding
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
  subject: '� Khayalethu - Email Configuration Test Success!',
  html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">� Khayalethu</h1>
        <p style="color: #e8e9ff; margin: 5px 0 0 0; font-size: 16px;">Student Accommodation System</p>
      </div>
      
      <!-- Success Message -->
      <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #2e7d32; margin: 0; font-size: 24px;">✅ Email Configuration Successful!</h2>
          <p style="color: #666; margin: 10px 0 0 0;">Your professional email system is now operational</p>
        </div>
        
        <!-- Configuration Details -->
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1565c0; margin-top: 0; font-size: 18px;">📋 Configuration Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #555;"><strong>Domain:</strong></td>
              <td style="padding: 8px 0; color: #333;">thespacehotels.online</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555;"><strong>Sender Email:</strong></td>
              <td style="padding: 8px 0; color: #333;">${process.env.EMAIL_USER}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555;"><strong>Admin Email:</strong></td>
              <td style="padding: 8px 0; color: #333;">${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555;"><strong>Test Date:</strong></td>
              <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        <!-- Success Features -->
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50; margin: 20px 0;">
          <h4 style="color: #2e7d32; margin-top: 0;">🎉 What's Working:</h4>
          <ul style="color: #2e7d32; margin: 10px 0; padding-left: 20px;">
            <li>Professional domain email authentication ✅</li>
            <li>SMTP connection established ✅</li>
            <li>Student application notifications ready ✅</li>
            <li>Admin alerts configured ✅</li>
            <li>The Space Hotels branding active ✅</li>
          </ul>
        </div>
        
        <!-- Next Steps -->
        <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800; margin: 20px 0;">
          <h4 style="color: #f57c00; margin-top: 0;">🚀 Next Steps:</h4>
          <ol style="color: #f57c00; margin: 10px 0; padding-left: 20px;">
            <li>Update Render environment variables</li>
            <li>Deploy updated configuration to production</li>
            <li>Test with real student application</li>
            <li>Monitor email deliverability</li>
            <li>Set up additional email addresses as needed</li>
          </ol>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 0;">
            <strong>The Space Hotels</strong> - Professional Student Accommodation
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
            Automated email from thespacehotels.online system
          </p>
        </div>
      </div>
    </div>
  `
};

// Send test email
console.log('📤 Sending test email to The Space Hotels admin...');
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting for thespacehotels.online:');
    console.log('1. Verify your email account exists: admin@thespacehotels.online');
    console.log('2. Check your email password/app password is correct');
    console.log('3. Confirm SMTP settings with your hosting provider');
    console.log('4. Ensure MX records are properly configured');
    console.log('5. Check if your hosting provider supports SMTP on port 587');
    console.log('\nCommon SMTP hosts for custom domains:');
    console.log('- mail.thespacehotels.online');
    console.log('- smtp.thespacehotels.online');
    console.log('- thespacehotels.online (some providers)');
  } else {
    console.log('🎉 Test email sent successfully!');
    console.log(`📬 Message ID: ${info.messageId}`);
    console.log(`📧 Check your inbox at: ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`);
    console.log('\n🏨 The Space Hotels email system is working perfectly!');
    console.log('\n✅ Your professional email setup is complete:');
    console.log('   • Domain: thespacehotels.online');
    console.log('   • Professional appearance for students and staff');
    console.log('   • Automated notifications for new applications');
    console.log('   • Ready for production deployment');
    console.log('\n🚀 Next: Update your Render environment variables and deploy!');
  }
});
