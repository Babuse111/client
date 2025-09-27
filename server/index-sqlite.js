require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const nodemailer = require('nodemailer');
const XLSX = require('xlsx');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// SQLite database setup
const dbPath = path.join(__dirname, 'student_accommodation.db');
const db = new sqlite3.Database(dbPath);

// Initialize database table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    status TEXT DEFAULT 'pending',
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Example route
app.get('/', (req, res) => {
  res.send('Student Accommodation API is running with SQLite');
});

// Test email notification route
app.post('/api/test-email', (req, res) => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

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
  db.all('SELECT * FROM applications ORDER BY id DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        error: 'Failed to fetch applications', 
        details: err.message 
      });
    }
    res.json(rows);
  });
});

// Admin: Update application status (accept/decline)
app.patch('/api/applications/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['pending', 'accepted', 'declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  db.run('UPDATE applications SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update status' });
    }
    res.json({ message: 'Status updated' });
  });
});

// Application form submission route
app.post('/api/apply', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'id_card_1', maxCount: 1 },
  { name: 'id_card_2', maxCount: 1 }
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

  // Insert into SQLite
  const stmt = db.prepare(`INSERT INTO applications (
    year, id_number, gender, ethnicity, home_language, full_names, 
    student_number, institution, email, phone, home_address, 
    guardian_name, guardian_relationship, guardian_phone, guardian_email, 
    photo, id_card_1, id_card_2
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  
  stmt.run([
    year, id_number, gender, ethnicity, home_language, full_names,
    student_number, institution, email, phone, home_address,
    guardian_name, guardian_relationship, guardian_phone, guardian_email,
    photo, id_card_1, id_card_2
  ], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to submit application' });
    }
    
    // Send detailed email notification to admin
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const currentDate = new Date().toLocaleDateString('en-ZA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2196F3; text-align: center; margin-bottom: 30px;">
            🏠 New Student Accommodation Application
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">📋 Application Details</h3>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Student Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${full_names}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Student Number:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${student_number}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Institution:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${institution}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Academic Year:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${year}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">ID Number:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${id_number}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Gender:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${gender}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Home Address:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${home_address}</td>
            </tr>
          </table>

          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #2e7d32;">👨‍👩‍👧‍👦 Guardian Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${guardian_name}</p>
            <p style="margin: 5px 0;"><strong>Relationship:</strong> ${guardian_relationship}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${guardian_phone}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${guardian_email}">${guardian_email}</a></p>
          </div>

          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #856404;">📎 Submitted Documents</h3>
            <p style="margin: 5px 0;">• Student Photo: ${photo ? '✅ Uploaded' : '❌ Not provided'}</p>
            <p style="margin: 5px 0;">• ID Card (Front): ${id_card_1 ? '✅ Uploaded' : '❌ Not provided'}</p>
            <p style="margin: 5px 0;">• ID Card (Back): ${id_card_2 ? '✅ Uploaded' : '❌ Not provided'}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000" style="display: inline-block; background-color: #2196F3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              🔗 View in Admin Dashboard
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>Application submitted on: ${currentDate}</p>
            <p>Student Accommodation Management System</p>
          </div>
        </div>
      `;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `🏠 New Application: ${full_names} (${student_number})`,
        text: `New student accommodation application received from ${full_names} (${email}) at ${institution}. Student Number: ${student_number}. Please review in the admin dashboard.`,
        html: emailHTML
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('❌ Email notification error:', error);
        } else {
          console.log('✅ Admin notification sent successfully:', info.response);
          console.log(`📧 Notified admin about application from: ${full_names}`);
        }
      });
    } else {
      console.log('⚠️ Email notification not configured - missing EMAIL_USER or EMAIL_PASS');
    }
    
    res.json({ 
      success: true, 
      id: this.lastID, 
      message: 'Application submitted successfully' 
    });
  });
  
  stmt.finalize();
});

// Export to Excel
app.get('/api/export/excel', (req, res) => {
  db.all('SELECT * FROM applications ORDER BY id DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch applications' });
    }
    
    // Prepare data for Excel
    const excelData = rows.map(row => ({
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
  console.log(`Server running on port ${port} with SQLite database`);
});
