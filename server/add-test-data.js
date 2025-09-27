const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the same database the server uses
const dbPath = path.join(__dirname, 'student_accommodation.db');
const db = new sqlite3.Database(dbPath);

// Sample test data
const sampleApplications = [
  {
    year: '2024',
    id_number: '9901015800083',
    gender: 'Male',
    ethnicity: 'African',
    home_language: 'English',
    full_names: 'John Smith Doe',
    student_number: 'ST2024001',
    institution: 'University of Cape Town',
    email: 'john.doe@example.com',
    phone: '0821234567',
    home_address: '123 Main Street, Cape Town, 8001',
    guardian_name: 'Jane Doe',
    guardian_relationship: 'Mother',
    guardian_phone: '0827654321',
    guardian_email: 'jane.doe@example.com',
    photo: 'uploads/sample-photo-1.jpg',
    id_card_1: 'uploads/sample-id-1-front.jpg',
    id_card_2: 'uploads/sample-id-1-back.jpg',
    status: 'pending'
  },
  {
    year: '2024',
    id_number: '9802125900084',
    gender: 'Female',
    ethnicity: 'Coloured',
    home_language: 'Afrikaans',
    full_names: 'Sarah Maria Johnson',
    student_number: 'ST2024002',
    institution: 'Stellenbosch University',
    email: 'sarah.johnson@example.com',
    phone: '0833456789',
    home_address: '456 Oak Avenue, Stellenbosch, 7600',
    guardian_name: 'Peter Johnson',
    guardian_relationship: 'Father',
    guardian_phone: '0839876543',
    guardian_email: 'peter.johnson@example.com',
    photo: 'uploads/sample-photo-2.jpg',
    id_card_1: 'uploads/sample-id-2-front.jpg',
    id_card_2: 'uploads/sample-id-2-back.jpg',
    status: 'accepted'
  },
  {
    year: '2024',
    id_number: '9703088900085',
    gender: 'Male',
    ethnicity: 'Indian',
    home_language: 'English',
    full_names: 'Raj Patel Kumar',
    student_number: 'ST2024003',
    institution: 'University of Witwatersrand',
    email: 'raj.patel@example.com',
    phone: '0845678901',
    home_address: '789 Pine Road, Johannesburg, 2001',
    guardian_name: 'Priya Patel',
    guardian_relationship: 'Mother',
    guardian_phone: '0841234567',
    guardian_email: 'priya.patel@example.com',
    photo: 'uploads/sample-photo-3.jpg',
    id_card_1: 'uploads/sample-id-3-front.jpg',
    id_card_2: 'uploads/sample-id-3-back.jpg',
    status: 'declined'
  }
];

console.log('Adding sample applications to test admin dashboard...');

// Insert sample data
const stmt = db.prepare(`INSERT INTO applications (
  year, id_number, gender, ethnicity, home_language, full_names, 
  student_number, institution, email, phone, home_address, 
  guardian_name, guardian_relationship, guardian_phone, guardian_email, 
  photo, id_card_1, id_card_2, status
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

let count = 0;
sampleApplications.forEach((app) => {
  stmt.run([
    app.year, app.id_number, app.gender, app.ethnicity, app.home_language, app.full_names,
    app.student_number, app.institution, app.email, app.phone, app.home_address,
    app.guardian_name, app.guardian_relationship, app.guardian_phone, app.guardian_email,
    app.photo, app.id_card_1, app.id_card_2, app.status
  ], function(err) {
    if (err) {
      console.error('Error inserting sample data:', err);
    } else {
      count++;
      console.log(`✓ Added application ${count}: ${app.full_names} (${app.status})`);
      
      if (count === sampleApplications.length) {
        console.log(`\n🎉 Successfully added ${count} sample applications!`);
        console.log('\nNow you can test the admin dashboard at: http://localhost:3000');
        console.log('You should see:');
        console.log('- John Smith Doe (pending)');
        console.log('- Sarah Maria Johnson (accepted)'); 
        console.log('- Raj Patel Kumar (declined)');
        console.log('\nYou can test the Accept/Decline buttons to change statuses.');
        db.close();
      }
    }
  });
});

stmt.finalize();
