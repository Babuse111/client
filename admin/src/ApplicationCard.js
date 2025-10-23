import React, { useState } from 'react';
import './ApplicationCard.css'; // Create this CSS file for styling

function ApplicationCard({ application, onStatusChange, API_URL }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [adminNote, setAdminNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'accepted': return <span className="badge badge-success">Accepted</span>;
      case 'declined': return <span className="badge badge-danger">Declined</span>;
      default: return <span className="badge badge-warning">Pending</span>;
    }
  };
  
  const updateStatus = (newStatus) => {
    if (isProcessing) return;
    
    if (newStatus === 'declined' && !adminNote) {
      if (!window.confirm('Are you sure you want to decline without adding a reason? It\'s recommended to provide feedback.')) {
        return;
      }
    }
    
    setIsProcessing(true);
    
    fetch(`${API_URL}/api/applications/${application.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, adminNote })
    })
    .then(res => res.json())
    .then(data => {
      onStatusChange(application.id, newStatus);
      setIsProcessing(false);
      setIsExpanded(false);
      alert(`Application ${newStatus === 'accepted' ? 'accepted' : 'declined'} successfully. Email notification sent.`);
    })
    .catch(error => {
      setIsProcessing(false);
      alert(`Error: ${error.message}`);
      console.error('Error updating status:', error);
    });
  };
  
  return (
    <div className={`application-card ${isExpanded ? 'expanded' : ''} ${application.status !== 'pending' ? 'processed' : ''}`}>
      <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="student-name">{application.full_names}</div>
        <div className="student-info">
          <span>{application.student_number}</span>
          <span>{application.institution}</span>
        </div>
        <div className="status-indicator">
          {getStatusBadge(application.status)}
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="card-details">
          <div className="details-grid">
            <div className="detail-section">
              <h3>Personal Information</h3>
              <div className="detail-row">
                <span className="label">ID Number:</span>
                <span className="value">{application.id_number}</span>
              </div>
              <div className="detail-row">
                <span className="label">Gender:</span>
                <span className="value">{application.gender}</span>
              </div>
              <div className="detail-row">
                <span className="label">Ethnicity:</span>
                <span className="value">{application.ethnicity}</span>
              </div>
              <div className="detail-row">
                <span className="label">Home Language:</span>
                <span className="value">{application.home_language}</span>
              </div>
              <div className="detail-row">
                <span className="label">Home Address:</span>
                <span className="value">{application.home_address}</span>
              </div>
            </div>
            
            <div className="detail-section">
              <h3>Contact Information</h3>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">
                  <a href={`mailto:${application.email}`}>{application.email}</a>
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">
                  <a href={`tel:${application.phone}`}>{application.phone}</a>
                </span>
              </div>
            </div>
            
            <div className="detail-section">
              <h3>Guardian Information</h3>
              <div className="detail-row">
                <span className="label">Name:</span>
                <span className="value">{application.guardian_name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Relationship:</span>
                <span className="value">{application.guardian_relationship}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">
                  <a href={`tel:${application.guardian_phone}`}>{application.guardian_phone}</a>
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">
                  <a href={`mailto:${application.guardian_email}`}>{application.guardian_email}</a>
                </span>
              </div>
            </div>
          </div>
          
          <div className="documents-section">
            <h3>Submitted Documents</h3>
            <div className="documents-grid">
              {application.photo && (
                <div className="document">
                  <span>Photo:</span>
                  <a href={`${API_URL}/${application.photo}`} target="_blank" rel="noopener noreferrer">View</a>
                </div>
              )}
              {application.id_card_1 && (
                <div className="document">
                  <span>ID Front:</span>
                  <a href={`${API_URL}/${application.id_card_1}`} target="_blank" rel="noopener noreferrer">View</a>
                </div>
              )}
              {application.id_card_2 && (
                <div className="document">
                  <span>ID Back:</span>
                  <a href={`${API_URL}/${application.id_card_2}`} target="_blank" rel="noopener noreferrer">View</a>
                </div>
              )}
              {application.acceptance_letter && (
                <div className="document">
                  <span>Acceptance Letter:</span>
                  <a href={`${API_URL}/${application.acceptance_letter}`} target="_blank" rel="noopener noreferrer">View</a>
                </div>
              )}
            </div>
          </div>
          
          {application.status === 'pending' && (
            <div className="action-section">
              <h3>Review Application</h3>
              <div className="admin-note">
                <label>
                  Admin Note (will be included in email):
                  <textarea 
                    value={adminNote} 
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Enter any comments or reasons for the decision"
                    rows={3}
                  />
                </label>
              </div>
              <div className="action-buttons">
                <button 
                  className="accept-button" 
                  onClick={() => updateStatus('accepted')}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Accept Application'}
                </button>
                <button 
                  className="decline-button" 
                  onClick={() => updateStatus('declined')}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Decline Application'}
                </button>
              </div>
            </div>
          )}
          
          <div className="application-meta">
            <span>Submitted: {formatDate(application.submitted_at)}</span>
            <span>Application ID: {application.id}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationCard;