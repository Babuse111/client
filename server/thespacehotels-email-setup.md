# The Space Hotels Email Setup Guide 🏨📧

## 🎯 Domain: thespacehotels.online

Congratulations! You have a perfect domain for your student accommodation business. Let's set up professional email addresses that will build trust with students and parents.

## 📧 Recommended Email Addresses

### Primary Admin Email
```
admin@thespacehotels.online
```

### Additional Professional Emails
```
accommodation@thespacehotels.online    - Main accommodation inquiries
applications@thespacehotels.online     - Student application notifications  
bookings@thespacehotels.online         - Room bookings and reservations
support@thespacehotels.online          - Student support and help
noreply@thespacehotels.online          - Automated system notifications
info@thespacehotels.online             - General information
manager@thespacehotels.online          - Management communications
```

## 🔧 Step-by-Step Setup

### Step 1: Choose Your Email Hosting Provider

#### Option A: With Your Domain Hosting Provider (Recommended)
Most domain providers offer email hosting:

**If you registered with:**
- **Namecheap**: Email hosting $1.48/month
- **GoDaddy**: Email hosting $5.99/month  
- **Hostinger**: Email hosting $0.99/month
- **SiteGround**: Email included with hosting

#### Option B: Google Workspace (Professional)
- Cost: $6/month per user
- Professional Gmail with your domain
- Calendar, Drive, and other tools included

#### Option C: Microsoft 365
- Cost: $6/month per user
- Outlook with your domain
- Office apps included

### Step 2: Create Your Email Account

1. **Login to your hosting control panel** (cPanel, Plesk, etc.)
2. **Find "Email Accounts" or "Email"**
3. **Create new email**: `admin@thespacehotels.online`
4. **Set a strong password**
5. **Note down the SMTP settings**

### Step 3: Get Your SMTP Settings

Common SMTP settings for thespacehotels.online:
```
SMTP Host: mail.thespacehotels.online
          OR smtp.thespacehotels.online
          OR thespacehotels.online

SMTP Port: 587 (recommended)
          OR 465 (SSL)
          OR 25 (basic)

Security: STARTTLS or SSL/TLS
```

### Step 4: Update Your Configuration

Update your `.env` file:
```env
# The Space Hotels Email Configuration
EMAIL_USER=admin@thespacehotels.online
EMAIL_PASS=your_strong_password
ADMIN_EMAIL=admin@thespacehotels.online
SMTP_HOST=mail.thespacehotels.online
SMTP_PORT=587
```

### Step 5: Test Your Setup

Run the test script:
```bash
node test-thespacehotels-email.js
```

## 🌐 DNS Configuration (If Needed)

If you're using external email providers, you may need MX records:

### For Google Workspace:
```
Type: MX | Name: @ | Value: ASPMX.L.GOOGLE.COM | Priority: 1
Type: MX | Name: @ | Value: ALT1.ASPMX.L.GOOGLE.COM | Priority: 5
Type: MX | Name: @ | Value: ALT2.ASPMX.L.GOOGLE.COM | Priority: 5
Type: MX | Name: @ | Value: ALT3.ASPMX.L.GOOGLE.COM | Priority: 10
Type: MX | Name: @ | Value: ALT4.ASPMX.L.GOOGLE.COM | Priority: 10
```

### For Microsoft 365:
```
Type: MX | Name: @ | Value: thespacehotels-online.mail.protection.outlook.com | Priority: 0
```

## 🎨 Email Branding Benefits

Using `admin@thespacehotels.online` gives you:

✅ **Professional Credibility** - Students trust official domain emails  
✅ **Brand Recognition** - Reinforces The Space Hotels brand  
✅ **Reduced Spam** - Domain emails are less likely to be flagged  
✅ **Professional Image** - Parents see you as established business  
✅ **Easy to Remember** - Matches your website domain  

## 🚀 Production Deployment

### Render Environment Variables:
```
EMAIL_USER=admin@thespacehotels.online
EMAIL_PASS=your_secure_password
ADMIN_EMAIL=admin@thespacehotels.online
SMTP_HOST=mail.thespacehotels.online
SMTP_PORT=587
```

### Update Your Admin Dashboard .env:
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

## 📋 Quick Setup Checklist

- [ ] Create email account: `admin@thespacehotels.online`
- [ ] Get SMTP settings from hosting provider
- [ ] Update local `.env` file
- [ ] Test with `node test-thespacehotels-email.js`
- [ ] Verify email delivery in inbox
- [ ] Update Render environment variables
- [ ] Deploy to production
- [ ] Test production email notifications

## 🔐 Security Best Practices

1. **Use strong passwords** (12+ characters with symbols)
2. **Enable 2FA** if your email provider supports it
3. **Don't share email credentials** in code or messages
4. **Regular password updates** every 6 months
5. **Monitor email logs** for suspicious activity

## 📞 Common Hosting Provider SMTP Settings

### Namecheap:
```
SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
```

### GoDaddy:
```
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
```

### Hostinger:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
```

### SiteGround:
```
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
```

## 🎯 Ready to Launch!

Once configured, students will receive notifications from:
**`admin@thespacehotels.online`**

This creates immediate trust and professionalism for your student accommodation business! 🏨✨
