import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = () => {
    setLoading(true);
  fetch('https://student-accomodation-g42p.onrender.com/api/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load applications');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
  await fetch(`https://student-accomodation-g42p.onrender.com/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchApplications();
  };

  return (
    <div style={{ maxWidth: 1200, margin: '32px auto', padding: 24 }}>
      <h2 style={{ textAlign: 'center', color: '#bfa14a' }}>Admin Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 16px #e0e0e0' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Year</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Gender</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Ethnicity</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Home Language</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Institution</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Student #</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Phone</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Home Address</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Guardian</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Uploads</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Submitted</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: 8, border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.year}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.full_names}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.gender}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.ethnicity}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.home_language}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.email}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.institution}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.student_number}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.phone}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.home_address}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.guardian_name} ({app.guardian_relationship})<br/>{app.guardian_phone}<br/>{app.guardian_email}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>
                  <a href={`/${app.photo}`} target="_blank" rel="noopener noreferrer">Photo</a><br/>
                  <a href={`/${app.id_card_1}`} target="_blank" rel="noopener noreferrer">ID 1</a><br/>
                  <a href={`/${app.id_card_2}`} target="_blank" rel="noopener noreferrer">ID 2</a>
                </td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : ''}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>
                  <span style={{
                    color: app.status === 'accepted' ? 'green' : app.status === 'declined' ? 'red' : '#bfa14a',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>{app.status || 'pending'}</span>
                </td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>
                  {app.status !== 'accepted' && (
                    <button style={{ margin: '4px 2px', background: 'green', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }} onClick={() => updateStatus(app.id, 'accepted')}>Accept</button>
                  )}
                  {app.status !== 'declined' && (
                    <button style={{ margin: '4px 2px', background: 'red', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }} onClick={() => updateStatus(app.id, 'declined')}>Decline</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
