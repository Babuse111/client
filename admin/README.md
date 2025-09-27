# Student Accommodation Admin Dashboard

This is the admin dashboard for managing student accommodation applications.

## Features

- View all student applications
- Accept/Decline applications with status updates
- Export data to Excel and PDF formats
- Email notifications to admin when new applications are submitted
- Real-time status updates

## Deployment on Render

### Prerequisites
- Your backend server should already be deployed on Render
- Update the `.env` file with your backend URL

### Steps to Deploy

1. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign in with your GitHub account
   - Click "New +" → "Static Site"

2. **Repository Setup:**
   - Connect your GitHub repository: `Babuse111/client`
   - Set the root directory to: `admin`
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Environment Variables:**
   - Add environment variable: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
   - Replace `your-backend-url.onrender.com` with your actual backend URL

4. **Deploy:**
   - Click "Create Static Site"
   - Render will automatically build and deploy your admin dashboard

### Configuration

Make sure your `.env` file contains:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Features Available After Deployment

- ✅ Admin dashboard accessible via your Render domain
- ✅ Real-time application management
- ✅ Excel and PDF export functionality
- ✅ Email notifications to admin@mbalincobi@gmail.com
- ✅ Document viewing and download
- ✅ Application status updates

### Usage

1. Navigate to your deployed admin dashboard URL
2. View all submitted applications
3. Use Accept/Decline buttons to update application status
4. Export data using Excel or PDF export buttons
5. Click on document links to view uploaded files

## Local Development

```bash
npm install
npm start
```

The dashboard will be available at `http://localhost:3000`
