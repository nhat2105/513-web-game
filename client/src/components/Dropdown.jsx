import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', marginBottom: '15px' }}>
      <div
        onClick={toggleDropdown}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: '#fff',
          width: 300,
          fontSize: 15,
          color: 'gray'
        }}
      >
        {label}
        <span style={{ marginLeft: '8px' }}>▼</span>
      </div>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            backgroundColor: '#fff',
            zIndex: 1,
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                backgroundColor: '#fff',
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
