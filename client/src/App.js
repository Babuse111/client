

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import khayaLogo from './logo-khayalethu.png';
import AdminDashboard from './AdminDashboard';

function ApplicationForm() {
  const [form, setForm] = useState({
    year: '',
    id_number: '',
    gender: '',
    ethnicity: '',
    home_language: '',
    full_names: '',
    student_number: '',
    institution: '',
    email: '',
    phone: '',
    home_address: '',
    guardian_name: '',
    guardian_relationship: '',
    guardian_phone: '',
    guardian_email: ''
  });
  const [files, setFiles] = useState({ photo: null, id_card_1: null, id_card_2: null });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    Object.entries(files).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    try {
      const res = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Application submitted successfully!');
        setForm({
          year: '', id_number: '', gender: '', ethnicity: '', home_language: '',
          full_names: '', student_number: '', institution: '', email: '', phone: '',
          home_address: '', guardian_name: '', guardian_relationship: '', guardian_phone: '', guardian_email: ''
        });
        setFiles({ photo: null, id_card_1: null, id_card_2: null });
      } else {
        setMessage(data.error || 'Submission failed.');
      }
    } catch (err) {
      setMessage('Submission failed.');
    }
    setLoading(false);
  };

  return (
    <div className="App" style={{ background: '#fff', minHeight: '100vh', padding: 0 }}>
      <div style={{ maxWidth: 500, margin: '32px auto 0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #e0e0e0', padding: 32 }}>
        <img src={khayaLogo} alt="Khayalethu Logo" style={{ width: 120, display: 'block', margin: '0 auto 16px auto' }} />
        <h2 style={{ textAlign: 'center', color: '#444', marginBottom: 24 }}>Student Accommodation Application</h2>
        {/* Admin Dashboard link removed for applicants */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label style={{ display: 'block', marginBottom: 8 }}>Year of Application
            <input name="year" value={form.year} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Head-to-shoulder Photo
            <input type="file" name="photo" accept="image/*" onChange={handleFileChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>ID Card 1st Side
            <input type="file" name="id_card_1" accept="image/*" onChange={handleFileChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>ID Card 2nd Side
            <input type="file" name="id_card_2" accept="image/*" onChange={handleFileChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>ID Number
            <input name="id_number" value={form.id_number} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Gender
            <select name="gender" value={form.gender} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Ethnicity
            <select name="ethnicity" value={form.ethnicity} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }}>
              <option value="">Select Ethnicity</option>
              <option value="African">African</option>
              <option value="Coloured">Coloured</option>
              <option value="Indian">Indian</option>
              <option value="White">White</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Home Language
            <select name="home_language" value={form.home_language} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }}>
              <option value="">Select Language</option>
              <option value="siSwati">siSwati</option>
              <option value="isiZulu">isiZulu</option>
              <option value="isiXhosa">isiXhosa</option>
              <option value="Xitsonga">Xitsonga</option>
              <option value="English">English</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Full Names
            <input name="full_names" value={form.full_names} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Student Number
            <input name="student_number" value={form.student_number} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Institution
            <input name="institution" value={form.institution} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 16 }}>Phone
            <input name="phone" value={form.phone} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>Home Address
            <input name="home_address" value={form.home_address} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
          </label>
          <fieldset style={{ border: '1px solid #ccc', borderRadius: 6, marginBottom: 16, padding: 12 }}>
            <legend style={{ fontWeight: 'bold', color: '#bfa14a' }}>Guardian/Parent Information</legend>
            <label style={{ display: 'block', marginBottom: 8 }}>Full Name
              <input name="guardian_name" value={form.guardian_name} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
            </label>
            <label style={{ display: 'block', marginBottom: 8 }}>Relationship
              <input name="guardian_relationship" value={form.guardian_relationship} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
            </label>
            <label style={{ display: 'block', marginBottom: 8 }}>Phone Number
              <input name="guardian_phone" value={form.guardian_phone} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
            </label>
            <label style={{ display: 'block', marginBottom: 8 }}>Email Address
              <input type="email" name="guardian_email" value={form.guardian_email} onChange={handleChange} required style={{ width: '100%', marginTop: 4 }} />
            </label>
          </fieldset>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#bfa14a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
        {message && <p style={{ textAlign: 'center', color: message.includes('success') ? 'green' : 'red', marginTop: 16 }}>{message}</p>}
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
