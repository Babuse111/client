require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Admin: Update application status (accept/decline)
app.patch('/api/applications/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'accepted', 'declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  try {
    await pool.query('UPDATE applications SET status = $1 WHERE id = $2', [status, id]);
    res.json({ message: 'Status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Example route
app.get('/', (req, res) => {
  res.send('Student Accommodation API is running');
});

// Admin: Get all applications
app.get('/api/applications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch applications', 
      details: error.message 
    });
  }
});


// Application form submission route
app.post('/api/apply', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'id_card_1', maxCount: 1 },
  { name: 'id_card_2', maxCount: 1 }
]), async (req, res) => {
  try {
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

    // Save to PostgreSQL
    const result = await pool.query(
      `INSERT INTO applications (
        year, id_number, gender, ethnicity, home_language, full_names, student_number, institution, email, phone, home_address, guardian_name, guardian_relationship, guardian_phone, guardian_email, photo, id_card_1, id_card_2
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING id`,
      [year, id_number, gender, ethnicity, home_language, full_names, student_number, institution, email, phone, home_address, guardian_name, guardian_relationship, guardian_phone, guardian_email, photo, id_card_1, id_card_2]
    );

    // Send email notification to admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to admin
      subject: 'New Student Accommodation Application',
  text: `New application received from ${full_names} (${email})\nInstitution: ${institution}\nStudent Number: ${student_number}\nHome Address: ${home_address}\nGuardian: ${guardian_name} (${guardian_relationship}), Phone: ${guardian_phone}, Email: ${guardian_email}`,
    });

    res.status(201).json({ message: 'Application submitted successfully', id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
