import React, { useState } from 'react';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const handleAdd = () => {
    alert(`🎉 Kütüphaneye eklendi: ${title} (${year})`);
    setTitle('');
    setYear('');
  };

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      padding: '25px', 
      borderRadius: '12px', 
      marginTop: '40px', 
      marginBottom: '40px',
      border: '1px solid #333'
    }}>
      <h3 style={{ marginTop: 0, color: 'white', fontSize: '18px', fontWeight: 'bold', borderBottom: '2px solid #e50914', paddingBottom: '10px', width: 'fit-content' }}>
        Yeni İçerik Ekle
      </h3>
      
      <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '20px' }}>
        Cornflix kütüphanesine yeni bir film ekleyin.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Film Başlığı" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '14px', 
            borderRadius: '6px', 
            border: '1px solid #333', 
            backgroundColor: '#141414', 
            color: 'white',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
        
        <input 
          type="number" 
          placeholder="Yapım Yılı" 
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '14px', 
            borderRadius: '6px', 
            border: '1px solid #333', 
            backgroundColor: '#141414', 
            color: 'white',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
        
        <button 
          onClick={handleAdd}
          style={{ 
            width: '100%', 
            padding: '14px', 
            backgroundColor: '#e50914', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            fontSize: '16px', 
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.2s',
            boxShadow: '0 4px 6px rgba(229,9,20,0.3)'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f40612'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e50914'}
        >
          Film Ekle
        </button>
      </div>
    </div>
  );
};

export default AddMovie;
