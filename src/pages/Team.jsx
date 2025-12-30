import React from 'react';

const Team = () => {
  return (
    <div style={{ padding: '40px 10%' }}>
      <h2>Our Experts</h2>
      <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
        {/* Repeat this block for each team member  */}
        <div style={{ textAlign: 'center' }}>
          <img src="https://via.placeholder.com/150" alt="Team Member" style={{ borderRadius: '50%' }} />
          <h3>Member Name</h3>
          <p><strong>Position:</strong> Lead Developer</p>
          <p>Briefly describe your design/dev work here for the report[cite: 13].</p>
        </div>
      </div>
    </div>
  );
};

export default Team;