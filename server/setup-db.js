require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  try {
    console.log('Connecting to database...');
    console.log('Database URL:', process.env.DATABASE_URL);
    
    // Test connection
    const client = await pool.connect();
    console.log('Connected successfully!');
    
    // Create table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        year VARCHAR(10),
        id_number VARCHAR(20),
        gender VARCHAR(20),
        ethnicity VARCHAR(50),
        home_language VARCHAR(50),
        full_names VARCHAR(200),
        student_number VARCHAR(50),
        institution VARCHAR(200),
        email VARCHAR(200),
        phone VARCHAR(20),
        home_address TEXT,
        guardian_name VARCHAR(200),
        guardian_relationship VARCHAR(100),
        guardian_phone VARCHAR(20),
        guardian_email VARCHAR(200),
        photo TEXT,
        id_card_1 TEXT,
        id_card_2 TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createTableQuery);
    console.log('Table created/verified successfully!');
    
    // Check if there are any applications
    const result = await client.query('SELECT COUNT(*) FROM applications');
    console.log(`Applications in database: ${result.rows[0].count}`);
    
    client.release();
    console.log('Database setup completed!');
  } catch (error) {
    console.error('Database setup failed:', error);
  } finally {
    await pool.end();
  }
}

setupDatabase();
