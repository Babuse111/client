const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

// Sample files data
const files = [
  { name: 'sample-photo-1.jpg', student: 'John Smith Doe', type: 'Sample Student Photo', id: 'ST2024001' },
  { name: 'sample-id-2-front.jpg', student: 'Sarah Maria Johnson', type: 'ID Card Front', id: '9802125900084' },
  { name: 'sample-id-2-back.jpg', student: 'Sarah Maria Johnson', type: 'ID Card Back', id: '9802125900084' },
  { name: 'sample-photo-3.jpg', student: 'Raj Patel Kumar', type: 'Sample Student Photo', id: 'ST2024003' },
  { name: 'sample-id-3-front.jpg', student: 'Raj Patel Kumar', type: 'ID Card Front', id: '9703088900085' },
  { name: 'sample-id-3-back.jpg', student: 'Raj Patel Kumar', type: 'ID Card Back', id: '9703088900085' }
];

files.forEach(file => {
  const isPhoto = file.type.includes('Photo');
  const isBack = file.type.includes('Back');
  
  const bgColor = isPhoto ? '#f0f8ff' : (isBack ? '#f8e8e8' : '#e8f4f8');
  const borderColor = isPhoto ? '#4169E1' : (isBack ? '#cc0066' : '#0066cc');
  const textColor = isPhoto ? '#4169E1' : (isBack ? '#cc0066' : '#0066cc');
  
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>${file.type} - ${file.student}</title>
    <style>
        body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#f0f0f0; font-family:Arial; }
        .card { text-align:center; padding:40px; background:white; border-radius:10px; box-shadow:0 4px 8px rgba(0,0,0,0.1); }
        .placeholder { width:${isPhoto ? '200px' : '300px'}; height:${isPhoto ? '250px' : '200px'}; background:${bgColor}; margin:20px auto; border:2px solid ${borderColor}; border-radius:5px; display:flex; align-items:center; justify-content:center; color:${textColor}; font-weight:bold; }
    </style>
</head>
<body>
    <div class="card">
        <h2>${isPhoto ? '📸' : '🆔'} ${file.type}</h2>
        <p><strong>Student:</strong> ${file.student}</p>
        <p><strong>ID:</strong> ${file.id}</p>
        <div class="placeholder">${file.type.toUpperCase()} PLACEHOLDER</div>
        <p><em>Sample ${file.type.toLowerCase()} placeholder for testing</em></p>
        <button onclick="window.close()">Close</button>
    </div>
</body>
</html>`;

  const filePath = path.join(uploadsDir, file.name);
  fs.writeFileSync(filePath, html);
  console.log(`✓ Created ${file.name}`);
});

console.log('\n🎉 All placeholder files created successfully!');
console.log('\nNow refresh your admin dashboard and click the Photo/ID links to test downloading.');
