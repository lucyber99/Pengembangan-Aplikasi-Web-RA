import React from 'react';
import './Divider.css';

const Divider = ({ label = 'Or' }) => {
  return (
    <div className="ui-divider" role="separator" aria-label={label}>
      <span>{label}</span>
    </div>
  );
};

export default Divider;

