import React, { useState } from 'react';
import './ApplicationForm.css'; // Make sure you have this CSS file

function ApplicationForm() {
  const [formValues, setFormValues] = useState({
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

  const [files, setFiles] = useState({
    photo: null,
    id_card_1: null,
    id_card_2: null,
    acceptance_letter: null
  });

  const [filePreview, setFilePreview] = useState({
    photo: null,
    id_card_1: null,
    id_card_2: null,
    acceptance_letter: null
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    
    if (fileList && fileList[0]) {
      const file = fileList[0];
      
      // Update file state
      setFiles(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Generate preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(prev => ({
            ...prev,
            [name]: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        // For non-images like PDFs, just show the filename
        setFilePreview(prev => ({
          ...prev,
          [name]: `File: ${file.name}`
        }));
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate required fields
    const requiredFields = [
      'year', 'id_number', 'full_names', 'student_number', 
      'institution', 'email', 'phone'
    ];
    
    const missingFields = requiredFields.filter(field => !formValues[field]);
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    // Validate required files
    const requiredFiles = ['photo', 'id_card_1', 'id_card_2', 'acceptance_letter'];
    const missingFiles = requiredFiles.filter(field => !files[field]);
    if (missingFiles.length > 0) {
      setError(`Please upload all required files: ${missingFiles.join(', ')}`);
      return;
    }
    
    setSubmitting(true);
    
    // Create form data for file upload
    const formData = new FormData();
    
    // Add text fields
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Add files
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });
    
    // Submit the form
    fetch('http://localhost:5000/api/apply', {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header when using FormData
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.details || data.error || 'Failed to submit application');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSubmitted(true);
      setSubmitting(false);
    })
    .catch(error => {
      console.error('Submission error:', error);
      setError(`Failed to submit application: ${error.message}`);
      setSubmitting(false);
    });
  };
  
  if (submitted) {
    return (
      <div className="application-form-container success-container">
        <h2>Application Submitted Successfully! ✅</h2>
        <p>Thank you for your application. We will review your information and contact you soon.</p>
        <p>A confirmation email has been sent to your email address.</p>
      </div>
    );
  }
  
  return (
    <div className="application-form-container">
      <h2>Student Accommodation Application</h2>
      
      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="full_names">Full Name *</label>
              <input 
                type="text" 
                id="full_names"
                name="full_names" 
                value={formValues.full_names}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="id_number">ID Number *</label>
              <input 
                type="text" 
                id="id_number"
                name="id_number" 
                value={formValues.id_number}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select 
                id="gender"
                name="gender" 
                value={formValues.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ethnicity">Ethnicity</label>
              <input 
                type="text" 
                id="ethnicity"
                name="ethnicity" 
                value={formValues.ethnicity}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="home_language">Home Language</label>
              <input 
                type="text" 
                id="home_language"
                name="home_language" 
                value={formValues.home_language}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="home_address">Home Address *</label>
              <textarea 
                id="home_address"
                name="home_address" 
                value={formValues.home_address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Academic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="student_number">Student Number *</label>
              <input 
                type="text" 
                id="student_number"
                name="student_number" 
                value={formValues.student_number}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="institution">Institution *</label>
              <input 
                type="text" 
                id="institution"
                name="institution" 
                value={formValues.institution}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Academic Year *</label>
              <select 
                id="year"
                name="year" 
                value={formValues.year}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
                <option value="Postgrad">Postgraduate</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input 
                type="tel" 
                id="phone"
                name="phone" 
                value={formValues.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Guardian Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guardian_name">Guardian Full Name</label>
              <input 
                type="text" 
                id="guardian_name"
                name="guardian_name" 
                value={formValues.guardian_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="guardian_relationship">Relationship to You</label>
              <input 
                type="text" 
                id="guardian_relationship"
                name="guardian_relationship" 
                value={formValues.guardian_relationship}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guardian_email">Guardian Email</label>
              <input 
                type="email" 
                id="guardian_email"
                name="guardian_email" 
                value={formValues.guardian_email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="guardian_phone">Guardian Phone Number</label>
              <input 
                type="tel" 
                id="guardian_phone"
                name="guardian_phone" 
                value={formValues.guardian_phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Required Documents</h3>
          <p className="documents-info">Please upload clear photos or scanned documents in JPG, PNG, or PDF format</p>
          
          <div className="form-row file-upload-row">
            <div className="form-group file-upload">
              <label htmlFor="photo">Your Photo (JPG or PNG) *</label>
              <input 
                type="file" 
                id="photo"
                name="photo" 
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                required
              />
              {filePreview.photo && (
                <div className="file-preview">
                  <img src={filePreview.photo} alt="Preview" />
                </div>
              )}
            </div>
            
            <div className="form-group file-upload">
              <label htmlFor="acceptance_letter">Acceptance Letter (PDF) *</label>
              <input 
                type="file" 
                id="acceptance_letter"
                name="acceptance_letter" 
                accept="application/pdf,image/jpeg,image/png"
                onChange={handleFileChange}
                required
              />
              {filePreview.acceptance_letter && (
                <div className="file-preview document-preview">
                  {filePreview.acceptance_letter}
                </div>
              )}
            </div>
          </div>
          
          <div className="form-row file-upload-row">
            <div className="form-group file-upload">
              <label htmlFor="id_card_1">ID/Passport (Front) *</label>
              <input 
                type="file" 
                id="id_card_1"
                name="id_card_1" 
                accept="image/jpeg,image/png,application/pdf"
                onChange={handleFileChange}
                required
              />
              {filePreview.id_card_1 && (
                <div className="file-preview">
                  {filePreview.id_card_1.startsWith('data:image') ? 
                    <img src={filePreview.id_card_1} alt="ID Front Preview" /> : 
                    <div className="document-preview">{filePreview.id_card_1}</div>
                  }
                </div>
              )}
            </div>
            
            <div className="form-group file-upload">
              <label htmlFor="id_card_2">ID/Passport (Back) *</label>
              <input 
                type="file" 
                id="id_card_2"
                name="id_card_2" 
                accept="image/jpeg,image/png,application/pdf"
                onChange={handleFileChange}
                required
              />
              {filePreview.id_card_2 && (
                <div className="file-preview">
                  {filePreview.id_card_2.startsWith('data:image') ? 
                    <img src={filePreview.id_card_2} alt="ID Back Preview" /> : 
                    <div className="document-preview">{filePreview.id_card_2}</div>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button" 
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;