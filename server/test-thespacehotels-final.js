require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🏨 Testing TheSpaceHotels.Online Email Configuration for Khayalethu Student Accommodation\n');

// Check if environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Missing email configuration!');
  console.log('Please set EMAIL_USER and EMAIL_PASS in your .env file');
  console.log('Current EMAIL_USER:', process.env.EMAIL_USER || 'Not set');
  process.exit(1);
}

console.log('📧 Email Configuration:');
console.log(`   Domain: thespacehotels.online`);
console.log(`   From: ${process.env.EMAIL_USER}`);
console.log(`   To Admin: ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`);
console.log(`   SMTP Host: ${process.env.SMTP_HOST || 'mail.thespacehotels.online'}`);
console.log(`   SMTP Port: ${process.env.SMTP_PORT || '587'}\n`);

// Configure transporter for thespacehotels.online
const isGmail = process.env.EMAIL_USER.includes('@gmail.com');

const transporterConfig = isGmail ? {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
} : {
  host: process.env.SMTP_HOST || 'mail.thespacehotels.online',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
};

console.log('🔧 Creating email transporter...');
const transporter = nodemailer.createTransporter(transporterConfig);

// Test email content
const testEmailHTML = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🏨 TheSpaceHotels.Online</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Professional Email System Test</p>
  </div>
  
  <!-- Content -->
  <div style="padding: 40px 30px;">
    
    <!-- Success Banner -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
      <h2 style="margin: 0; font-size: 24px;">✅ Email Configuration Successful!</h2>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Khayalethu Student Accommodation email system is operational</p>
    </div>
    
    <!-- Configuration Details -->
    <div style="background: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
      <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">📋 Configuration Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; font-weight: 600; color: #475569; width: 40%;">Domain:</td>
          <td style="padding: 12px 0; color: #1e293b; font-family: monospace; background: #e2e8f0; padding: 8px 12px; border-radius: 4px;">thespacehotels.online</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; font-weight: 600; color: #475569;">Email Service:</td>
          <td style="padding: 12px 0; color: #1e293b;">${process.env.EMAIL_USER}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; font-weight: 600; color: #475569;">Admin Contact:</td>
          <td style="padding: 12px 0; color: #1e293b;">${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; font-weight: 600; color: #475569;">SMTP Server:</td>
          <td style="padding: 12px 0; color: #1e293b; font-family: monospace;">${process.env.SMTP_HOST || 'mail.thespacehotels.online'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; font-weight: 600; color: #475569;">Test Date:</td>
          <td style="padding: 12px 0; color: #1e293b;">${new Date().toLocaleString('en-ZA', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}</td>
        </tr>
      </table>
    </div>
    
    <!-- Application System Info -->
    <div style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.05) 0%, rgba(234, 88, 12, 0.05) 100%); border: 1px solid rgba(217, 119, 6, 0.2); border-radius: 8px; padding: 25px;">
      <h3 style="color: #ea580c; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center; gap: 8px;">
        🎓 Khayalethu Student Accommodation
      </h3>
      <p style="color: #7c2d12; margin: 0; line-height: 1.6;">
        This email system will handle all student application notifications, confirmations, and administrative communications. 
        Students will receive professional confirmation emails from <strong>info@thespacehotels.online</strong> when they submit their accommodation applications.
      </p>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
    <p style="color: #64748b; margin: 0; font-size: 14px;">
      TheSpaceHotels.Online • Professional Email Services • Khayalethu Student Accommodation
    </p>
    <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 12px;">
      This is an automated test message to verify email configuration
    </p>
  </div>
  
</div>
`;

const mailOptions = {
  from: `"${process.env.FROM_NAME || 'Khayalethu Student Accommodation'}" <${process.env.EMAIL_USER}>`,
  to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
  subject: '🏨 TheSpaceHotels.Online - Email Configuration Test for Khayalethu',
  html: testEmailHTML
};

console.log('📤 Sending test email...\n');

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Email sending failed:');
    console.error('   Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔑 Authentication Error Solutions:');
      console.log('   1. Check your email password in .env file');
      console.log('   2. Verify SMTP settings with your hosting provider');
      console.log('   3. Ensure domain email account is properly set up');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n🌐 Connection Error Solutions:');
      console.log('   1. Verify SMTP_HOST setting:', process.env.SMTP_HOST || 'mail.thespacehotels.online');
      console.log('   2. Check SMTP_PORT setting:', process.env.SMTP_PORT || '587');
      console.log('   3. Contact your hosting provider for correct SMTP settings');
    }
    
    console.log('\n📋 Current Configuration:');
    console.log('   EMAIL_USER:', process.env.EMAIL_USER);
    console.log('   SMTP_HOST:', process.env.SMTP_HOST || 'Auto-detected');
    console.log('   SMTP_PORT:', process.env.SMTP_PORT || '587');
    
  } else {
    console.log('✅ Email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📧 Check your inbox at:', process.env.ADMIN_EMAIL || process.env.EMAIL_USER);
    console.log('\n🎉 TheSpaceHotels.Online email system is ready for Khayalethu Student Accommodation!');
    console.log('\n📋 Next Steps:');
    console.log('   ✅ Domain email configured: info@thespacehotels.online');
    console.log('   ✅ Professional sender name: Khayalethu Student Accommodation');
    console.log('   ✅ Admin notifications: Enabled');
    console.log('   ✅ Student confirmations: Enabled');
    console.log('\n🚀 Your student accommodation application system is ready to go!');
  }
});
