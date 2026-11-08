import React, { useState } from 'react';
import { mockEquipments } from '../mockData';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  const categories = ['ทั้งหมด', 'ไอที', 'กีฬา', 'อุปกรณ์ถ่ายภาพ', 'ดนตรี', 'อื่นๆ'];

  const filteredEquipments = mockEquipments.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>รายการอุปกรณ์ยืม-คืน</h2>

      {/* Control Bar: Search & Category Filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="ค้นหาชื่ออุปกรณ์..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', flex: '1', minWidth: '200px' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px' }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Grid แสดงรายการอุปกรณ์ */}
      {filteredEquipments.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          ไม่พบอุปกรณ์ที่ค้นหา (Empty State)
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {filteredEquipments.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
              <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <h3>{item.name}</h3>
              <p>หมวดหมู่: {item.category}</p>
              <p style={{ color: item.available_qty > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                {item.available_qty > 0 ? `พร้อมยืม (${item.available_qty}/${item.total_qty})` : 'ถูกยืมหมดแล้ว'}
              </p>
              <button disabled={item.available_qty === 0} style={{ padding: '8px 16px', width: '100%', cursor: 'pointer' }}>
                {item.available_qty > 0 ? 'ขอยืมอุปกรณ์' : 'สินค้าหมด'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;