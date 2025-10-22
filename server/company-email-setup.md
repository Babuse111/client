# Company Email Setup Guide

## 📧 Professional Email Options

### Option 1: Gmail Business Account (Recommended)

**Step 1: Create Company Gmail Account**
- Go to [gmail.com](https://gmail.com)
- Create a new account with a professional name like:
  - `accommodation.admin@gmail.com`
  - `student.housing@gmail.com`
  - `admin.accommodation@gmail.com`
  - `yourcompanyname.admin@gmail.com`

**Step 2: Enable 2-Factor Authentication**
- Go to Google Account settings
- Security → 2-Step Verification → Turn On

**Step 3: Generate App Password**
- Go to Google Account → Security
- 2-Step Verification → App passwords
- Select "Mail" and generate password
- Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

**Step 4: Update Your .env File**
```
EMAIL_USER=accommodation.admin@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
ADMIN_EMAIL=accommodation.admin@gmail.com
```

### Option 2: Custom Domain Email (Professional)

If you have a business domain (e.g., `yourcompany.com`):

**Popular Email Providers:**
- **Google Workspace**: `admin@yourcompany.com` ($6/month)
- **Microsoft 365**: `admin@yourcompany.com` ($6/month)  
- **Zoho Mail**: `admin@yourcompany.com` (Free for 5 users)

**SMTP Configuration:**
```
# For Google Workspace
EMAIL_USER=admin@yourcompany.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@yourcompany.com

# SMTP settings are handled automatically by nodemailer
```

### Option 3: Free Business Email (Zoho)

**Step 1: Sign up for Zoho Mail**
- Go to [zoho.com/mail](https://www.zoho.com/mail/)
- Sign up with your domain or use their free subdomain
- Create: `admin@yourcompany.zmailcloud.com`

**Step 2: Configure SMTP**
```
EMAIL_USER=admin@yourcompany.zmailcloud.com
EMAIL_PASS=your_password
ADMIN_EMAIL=admin@yourcompany.zmailcloud.com
```

## 🔧 Current Configuration

Your server is set up to use these environment variables:
- `EMAIL_USER`: The email address that sends notifications
- `EMAIL_PASS`: The app password for authentication  
- `ADMIN_EMAIL`: The email address that receives notifications

## ⚠️ Important Security Notes

1. **Never use your personal email password** - Always use app passwords
2. **Keep .env file private** - Never commit passwords to GitHub
3. **Use 2-Factor Authentication** on your email account
4. **Consider separate email** for different environments (dev/prod)

## 🚀 After Setup

Once you've created your company email:

1. Update the `.env` file with your new credentials
2. Restart your server: `npm run start`
3. Test email notifications: `POST /api/test-email`
4. Deploy to Render with new environment variables

## 📋 Recommended Company Email Names

- `admin@yourcompany.com`
- `accommodation.admin@gmail.com`  
- `student.housing@gmail.com`
- `applications@yourcompany.com`
- `notifications@yourcompany.com`
- `noreply@yourcompany.com`

## 🔄 Migration Steps

1. ✅ Create new company email account
2. ✅ Enable 2FA and generate app password  
3. ✅ Update local `.env` file
4. ✅ Test locally with `POST /api/test-email`
5. ✅ Update Render environment variables
6. ✅ Deploy and test production

Choose the option that best fits your business needs and budget!
