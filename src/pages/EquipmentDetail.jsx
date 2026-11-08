import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEquipments } from '../mockData';

function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = mockEquipments.find((eq) => eq.id === parseInt(id));

  // Mock รีวิวตัวอย่าง
  const [reviews, setReviews] = useState([
    { id: 1, user: 'นักศึกษา 6507xxx', rating: 5, comment: 'อุปกรณ์สภาพดีมาก ใช้งานได้ปกติเลยครับ' },
    { id: 2, user: 'นักศึกษา 6407xxx', rating: 4, comment: 'แบตเตอรี่อึดดี แต่สายต่อแอบสั้นไปหน่อย' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  if (!item) {
    return (
      <div style={{ padding: '40px', color: '#FFF', textAlign: 'center' }}>
        <h2>ไม่พบรายการอุปกรณ์</h2>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
          กลับหน้าหลัก
        </button>
      </div>
    );
  }

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setReviews([...reviews, { id: Date.now(), user: 'ผู้ใช้งานระบบ', rating: newRating, comment: newComment }]);
    setNewComment('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', padding: '40px 20px', maxWidth: '900px', margin: '0 auto', 
      fontFamily: "'Inter', sans-serif", backgroundColor: '#1E104E', color: '#FFFFFF' 
    }}>
      {/* ปุ่มย้อนกลับ */}
      <button 
        onClick={() => navigate('/')} 
        style={{ 
          padding: '8px 16px', borderRadius: '8px', border: 'none', 
          backgroundColor: '#452E5A', color: '#FFC85C', fontWeight: '700', 
          cursor: 'pointer', marginBottom: '24px' 
        }}
      >
        ← กลับหน้าหลัก
      </button>

      {/* Detail Container */}
      <div style={{ background: '#452E5A', padding: '28px', borderRadius: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <img 
            src={item.image_url} 
            alt={item.name} 
            style={{ width: '100%', maxWidth: '320px', height: '240px', objectFit: 'cover', borderRadius: '12px' }} 
          />
          <div style={{ flex: 1, minWidth: '250px' }}>
            <span style={{ background: '#FFC85C', color: '#1E104E', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '12px' }}>
              {item.category}
            </span>
            <h1 style={{ fontSize: '28px', marginTop: '12px', marginBottom: '8px' }}>{item.name}</h1>
            <p style={{ color: '#E2E8F0', fontSize: '14px', lineHeight: '1.6' }}>
              รายละเอียดและสเปกอุปกรณ์สำหรับการเรียนและการทำกิจกรรม
            </p>
            <div style={{ marginTop: '20px', fontSize: '15px' }}>
              <p>สถานะคงเหลือ: <strong style={{ color: item.available_qty > 0 ? '#4ADE80' : '#FF653F' }}>{item.available_qty} / {item.total_qty} ชิ้น</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div style={{ background: '#452E5A', padding: '28px', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#FFC85C' }}>⭐ รีวิวและการใช้งานจากผู้ใช้</h3>
        
        {/* ฟอร์มเพิ่มรีวิว */}
        <form onSubmit={handleAddReview} style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ fontSize: '14px' }}>ให้คะแนน:</label>
            <select 
              value={newRating} 
              onChange={(e) => setNewRating(Number(e.target.value))}
              style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#FFF', color: '#1E104E', fontWeight: '700' }}
            >
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ดาว</option>)}
            </select>
          </div>
          <textarea 
            rows="3" 
            placeholder="เขียนรีวิวประสบการณ์การใช้งาน..."
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ alignSelf: 'flex-end', padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#FF653F', color: '#FFF', fontWeight: '700', cursor: 'pointer' }}>
            ส่งรีวิว
          </button>
        </form>

        {/* รายการรีวิว */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reviews.map((rev) => (
            <div key={rev.id} style={{ backgroundColor: '#1E104E', padding: '14px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>{rev.user}</span>
                <span style={{ color: '#FFC85C' }}>{'★'.repeat(rev.rating)}</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#E2E8F0' }}>{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EquipmentDetail;