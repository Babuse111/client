# Company Domain Email Setup Guide 🏢📧

## 📋 Prerequisites

1. **Own a domain name** (e.g., `yourcompany.com`, `accommodationservices.co.za`)
2. **Access to domain DNS settings** or hosting provider
3. **Email hosting service** (see options below)

## 🎯 Popular Email Hosting Services

### Option 1: Google Workspace (Recommended) 💼
**Cost:** $6-18/month per user
**Features:** Professional Gmail with your domain

**Setup Steps:**
1. Go to [workspace.google.com](https://workspace.google.com)
2. Sign up with your domain: `yourcompany.com`
3. Create email: `admin@yourcompany.com`
4. Verify domain ownership
5. Set up MX records in your DNS

**Configuration:**
```env
EMAIL_USER=admin@yourcompany.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@yourcompany.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### Option 2: Microsoft 365 📊
**Cost:** $6-22/month per user
**Features:** Outlook with your domain + Office apps

**Setup Steps:**
1. Go to [microsoft.com/microsoft-365/business](https://www.microsoft.com/microsoft-365/business)
2. Sign up with your domain
3. Create: `admin@yourcompany.com`
4. Configure DNS records

**Configuration:**
```env
EMAIL_USER=admin@yourcompany.com
EMAIL_PASS=your_password
ADMIN_EMAIL=admin@yourcompany.com
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Option 3: Zoho Mail (Budget-Friendly) 💰
**Cost:** FREE for up to 5 users, $1/month per user after
**Features:** Full-featured business email

**Setup Steps:**
1. Go to [zoho.com/mail](https://www.zoho.com/mail/)
2. Sign up with your domain
3. Create: `admin@yourcompany.com`
4. Verify domain and set up MX records

**Configuration:**
```env
EMAIL_USER=admin@yourcompany.com
EMAIL_PASS=your_password
ADMIN_EMAIL=admin@yourcompany.com
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
```

### Option 4: cPanel/Hosting Provider Email 🌐
**Cost:** Usually included with web hosting
**Features:** Basic email hosting

**Setup Steps:**
1. Login to your hosting control panel
2. Create email account: `admin@yourcompany.com`
3. Note down SMTP settings from your hosting provider

**Common Configuration:**
```env
EMAIL_USER=admin@yourcompany.com
EMAIL_PASS=your_password
ADMIN_EMAIL=admin@yourcompany.com
SMTP_HOST=mail.yourcompany.com
SMTP_PORT=587
```

## 🔧 Domain Configuration

### DNS Records (MX Records)
Your domain needs MX records pointing to your email provider:

**Google Workspace:**
```
MX    @    1    ASPMX.L.GOOGLE.COM.
MX    @    5    ALT1.ASPMX.L.GOOGLE.COM.
MX    @    5    ALT2.ASPMX.L.GOOGLE.COM.
MX    @    10   ALT3.ASPMX.L.GOOGLE.COM.
MX    @    10   ALT4.ASPMX.L.GOOGLE.COM.
```

**Microsoft 365:**
```
MX    @    0    yourcompany-com.mail.protection.outlook.com.
```

**Zoho Mail:**
```
MX    @    10   mx.zoho.com.
MX    @    20   mx2.zoho.com.
MX    @    50   mx3.zoho.com.
```

## 📧 Recommended Email Addresses

For your Student Accommodation System:

- `admin@yourcompany.com` - Main admin notifications
- `applications@yourcompany.com` - Application-specific emails  
- `noreply@yourcompany.com` - System notifications
- `support@yourcompany.com` - Student support
- `accommodation@yourcompany.com` - Housing-related emails

## 🔐 Security Configuration

### For Google Workspace:
1. Enable 2-Factor Authentication
2. Create App Password (not regular password)
3. Use App Password in your `.env` file

### For Other Providers:
1. Enable 2FA if available
2. Use strong passwords
3. Consider app-specific passwords

## 🛠️ Environment Variables Setup

Update your `.env` file:

```env
# Company Domain Email Configuration
EMAIL_USER=admin@yourcompany.com
EMAIL_PASS=your_secure_password
ADMIN_EMAIL=admin@yourcompany.com

# Optional: Custom SMTP settings (auto-detected if not provided)
SMTP_HOST=smtp.yourcompany.com
SMTP_PORT=587
```

## ✅ Testing Your Setup

1. **Update your `.env` file** with your company email
2. **Restart your server:** `node index-sqlite.js`
3. **Run the test script:** `node test-company-email.js`
4. **Test via API:** `POST http://localhost:5000/api/test-email`

## 🚀 Production Deployment

### Render Environment Variables:
```
EMAIL_USER=admin@yourcompany.com
EMAIL_PASS=your_secure_password
ADMIN_EMAIL=admin@yourcompany.com
SMTP_HOST=smtp.yourcompany.com  (if needed)
SMTP_PORT=587  (if needed)
```

## 📋 Checklist

- [ ] Choose email hosting provider
- [ ] Register/configure domain email
- [ ] Set up DNS/MX records
- [ ] Create admin email account
- [ ] Update `.env` file locally
- [ ] Test email functionality
- [ ] Update Render environment variables
- [ ] Deploy and test production

## 💡 Pro Tips

1. **Use a professional email address** like `admin@yourcompany.com`
2. **Set up email forwarding** to your personal email for notifications
3. **Create separate emails** for different purposes (admin, support, noreply)
4. **Monitor email deliverability** and spam folders
5. **Keep backup access** to your domain and email accounts

---

**What's your company domain?** Let me know and I'll help you configure the specific settings! 🎯
