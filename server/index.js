require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
const path = require('path');
const nodemailer = require('nodemailer');
const XLSX = require('xlsx');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database table
// REMOVE the db.serialize block:
pool.query(`
  CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    year TEXT,
    id_number TEXT,
    gender TEXT,
    ethnicity TEXT,
    home_language TEXT,
    full_names TEXT,
    student_number TEXT,
    institution TEXT,
    email TEXT,
    phone TEXT,
    home_address TEXT,
    guardian_name TEXT,
    guardian_relationship TEXT,
    guardian_phone TEXT,
    guardian_email TEXT,
    photo TEXT,
    id_card_1 TEXT,
    id_card_2 TEXT,
    acceptance_letter TEXT,
    status TEXT DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Database table initialized successfully');
  }
});
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
  // Accept images and PDFs
  if (
    file.mimetype === 'image/jpeg' || 
    file.mimetype === 'image/png' || 
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format. Please upload PDF, JPEG or PNG files.'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max file size
});

// Example route
app.get('/', (req, res) => {
  res.send('Student Accommodation API is running with PostgreSQL');
});

// Test email notification route
app.post('/api/test-email', (req, res) => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Determine if it's Gmail or custom domain
    const isGmail = process.env.EMAIL_USER.includes('@gmail.com');
    
    const transporterConfig = isGmail ? {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    } : {
      host: process.env.SMTP_HOST || 'mail.' + process.env.EMAIL_USER.split('@')[1],
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      }
    };
    
    const transporter = nodemailer.createTransport(transporterConfig);

    const testHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; text-align: center; border: 2px solid #4CAF50; border-radius: 10px;">
        <h2 style="color: #4CAF50;">✅ Email Configuration Test</h2>
        <p>This is a test email to verify that admin notifications are working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p style="color: #666; font-size: 12px;">Student Accommodation Management System</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: '✅ Test: Admin Email Notification System',
      html: testHTML
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Test email error:', error);
        res.status(500).json({ error: 'Failed to send test email', details: error.message });
      } else {
        console.log('Test email sent:', info.response);
        res.json({ success: true, message: 'Test email sent successfully', response: info.response });
      }
    });
  } else {
    res.status(400).json({ error: 'Email not configured - missing EMAIL_USER or EMAIL_PASS in .env file' });
  }
});

// Admin: Get all applications
app.get('/api/applications', (req, res) => {
  pool.query('SELECT * FROM applications ORDER BY id DESC', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        error: 'Failed to fetch applications', 
        details: err.message 
      });
    }
    res.json(result.rows); // Changed from rows to result.rows
  });
});

// Admin: Update application status (accept/decline) with email notification
app.patch('/api/applications/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, adminNote } = req.body; // Add optional admin note
  
  if (!['pending', 'accepted', 'declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  // First get the student's email address
  pool.query('SELECT * FROM applications WHERE id = $1', [id], (err, result) => {
    if (err || result.rows.length === 0) {
      return res.status(500).json({ error: 'Failed to find application' });
    }
    
    const application = result.rows[0];
    
    // Then update the status
    pool.query('UPDATE applications SET status = $1 WHERE id = $2', [status, id], (err, updateResult) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to update status' });
      }
      
      // Send email notification
      sendStatusNotification(application, status, adminNote);
      
      res.json({ 
        message: 'Status updated',
        status: status,
        applicationId: id
      });
    });
  });
});

// Add this function to send status notification emails
function sendStatusNotification(application, status, adminNote = '') {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email not configured - skipping notification');
    return;
  }
  
  // Create email transport - reuse your existing email configuration
  const isGmail = process.env.EMAIL_USER.includes('@gmail.com');
  const transporterConfig = isGmail ? {
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  } : {
    host: process.env.SMTP_HOST || 'mail.' + process.env.EMAIL_USER.split('@')[1],
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    tls: { rejectUnauthorized: false }
  };
  
  const transporter = nodemailer.createTransport(transporterConfig);
  
  // Email template based on status
  const statusText = status === 'accepted' ? 'Accepted ✅' : 
                    (status === 'declined' ? 'Not Accepted ❌' : 'Under Review');
  
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: ${status === 'accepted' ? '#4CAF50' : (status === 'declined' ? '#F44336' : '#2196F3')}; text-align: center;">
        Application Status: ${statusText}
      </h2>
      
      <p style="font-size: 16px; line-height: 1.6;">Dear ${application.full_names},</p>
      
      <p style="font-size: 16px; line-height: 1.6;">
        Your application for student accommodation has been reviewed, and we are 
        ${status === 'accepted' ? 'pleased to inform you that your application has been <strong>ACCEPTED</strong>.' : 
          (status === 'declined' ? 'sorry to inform you that your application has been <strong>NOT ACCEPTED</strong> at this time.' : 
          'still reviewing your application.')}
      </p>
      
      ${adminNote ? `
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0;">Additional Information:</h4>
        <p style="margin-bottom: 0;">${adminNote}</p>
      </div>` : ''}
      
      ${status === 'accepted' ? `
      <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #2e7d32;">Next Steps:</h4>
        <ol style="padding-left: 20px; line-height: 1.8;">
          <li>Complete the accommodation agreement (attached)</li>
          <li>Pay the deposit fee within 7 days</li>
          <li>Arrange your move-in date with our housing office</li>
        </ol>
      </div>` : ''}
      
      <p style="font-size: 16px; line-height: 1.6;">
        If you have any questions, please don't hesitate to contact us.
      </p>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="font-size: 14px; color: #666;">
          Thank you for choosing Khayalethu Student Accommodation
        </p>
      </div>
    </div>
  `;
  
  const mailOptions = {
    from: `"${process.env.FROM_NAME || 'Khayalethu Student Accommodation'}" <${process.env.EMAIL_USER}>`,
    to: application.email,
    subject: `Application Status: ${statusText} - Khayalethu Student Accommodation`,
    html: emailHTML
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Failed to send status notification email:', error);
    } else {
      console.log('Status notification email sent successfully:', info.response);
    }
  });
}

// Application form submission route
app.post('/api/apply', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'id_card_1', maxCount: 1 },
  { name: 'id_card_2', maxCount: 1 },
  { name: 'acceptance_letter', maxCount: 1 }
]), (req, res) => {
  const {
    year,
    id_number,
    gender,
    ethnicity,
    home_language,
    full_names,
    student_number,
    institution,
    email,
    phone,
    home_address,
    guardian_name,
    guardian_relationship,
    guardian_phone,
    guardian_email
  } = req.body;

  // File paths
  const photo = req.files['photo'] ? req.files['photo'][0].path : null;
  const id_card_1 = req.files['id_card_1'] ? req.files['id_card_1'][0].path : null;
  const id_card_2 = req.files['id_card_2'] ? req.files['id_card_2'][0].path : null;
  const acceptance_letter = req.files['acceptance_letter'] ? req.files['acceptance_letter'][0].path : null;

  // Insert into PostgreSQL - changed from SQLite
  pool.query(`
    INSERT INTO applications (
      year, id_number, gender, ethnicity, home_language, full_names, 
      student_number, institution, email, phone, home_address, 
      guardian_name, guardian_relationship, guardian_phone, guardian_email, 
      photo, id_card_1, id_card_2, acceptance_letter
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING id
  `, [
    year, id_number, gender, ethnicity, home_language, full_names,
    student_number, institution, email, phone, home_address,
    guardian_name, guardian_relationship, guardian_phone, guardian_email,
    photo, id_card_1, id_card_2, acceptance_letter
  ], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to submit application' });
    }
    
    // Get the inserted record ID
    const insertedId = result.rows[0].id;
    
    // Email notification code remains the same
    // ...
    
    res.json({ 
      success: true, 
      id: insertedId, // Changed from this.lastID to insertedId
      message: 'Application submitted successfully' 
    });
  });
});

// Export to Excel
app.get('/api/export/excel', (req, res) => {
  pool.query('SELECT * FROM applications ORDER BY id DESC', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch applications' });
    }
    
    // Prepare data for Excel
    const excelData = result.rows.map(row => ({
      'ID': row.id,
      'Full Names': row.full_names,
      'Student Number': row.student_number,
      'Email': row.email,
      'Phone': row.phone,
      'Institution': row.institution,
      'Year': row.year,
      'ID Number': row.id_number,
      'Gender': row.gender,
      'Ethnicity': row.ethnicity,
      'Home Language': row.home_language,
      'Home Address': row.home_address,
      'Guardian Name': row.guardian_name,
      'Guardian Relationship': row.guardian_relationship,
      'Guardian Phone': row.guardian_phone,
      'Guardian Email': row.guardian_email,
      'Status': row.status || 'pending',
      'Submitted At': row.submitted_at
    }));
    
    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Auto-size columns
    const colWidths = [];
    Object.keys(excelData[0] || {}).forEach((key, index) => {
      const maxLength = Math.max(
        key.length,
        ...excelData.map(row => (row[key] || '').toString().length)
      );
      colWidths.push({ wch: Math.min(maxLength + 2, 50) });
    });
    worksheet['!cols'] = colWidths;
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Disposition', 'attachment; filename=student_applications.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
  });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server running on port ${port} with PostgreSQL database`);
});
