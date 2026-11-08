import React, { useState } from 'react';
import { mockEquipments } from '../mockData';
import EquipmentCard from '../components/EquipmentCard';
import BorrowModal from '../components/BorrowModal';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedStatus, setSelectedStatus] = useState('ทั้งหมด');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalStartDate, setModalStartDate] = useState('');
  const [modalEndDate, setModalEndDate] = useState('');

  const categories = ['ทั้งหมด', 'ไอที', 'กีฬา', 'อุปกรณ์ถ่ายภาพ', 'ดนตรี', 'อื่นๆ'];
  const statuses = ['ทั้งหมด', 'พร้อมยืม', 'ถูกยืมหมดแล้ว'];

  const filteredEquipments = mockEquipments.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const isAvailable = item.available_qty > 0;
    const matchesStatus = 
      selectedStatus === 'ทั้งหมด' || 
      (selectedStatus === 'พร้อมยืม' && isAvailable) || 
      (selectedStatus === 'ถูกยืมหมดแล้ว' && !isAvailable);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('ทั้งหมด');
    setSelectedStatus('ทั้งหมด');
    setStartDate('');
    setEndDate('');
  };

  const handleOpenBorrowModal = (item) => {
    setSelectedItem(item);
    setModalStartDate(startDate || '');
    setModalEndDate(endDate || '');
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleBorrowSubmit = (borrowData) => {
    alert(`ส่งคำขอยืม ${borrowData.item.name} จำนวน ${borrowData.borrowQty} ชิ้น (รหัสนักศึกษา: ${borrowData.studentId}) เรียบร้อยแล้ว!`);
    handleCloseModal();
  };

  // ฟังก์ชันนี้จะทำงานเมื่อคลิกที่ตัวการ์ดอุปกรณ์
  const handleCardClick = (item) => {
    alert(`เปิดดูรายละเอียดและรีวิวของ: ${item.name}`);
    // เดี๋ยวเราจะเปลี่ยนตรงนี้ให้ลิงก์ไปหน้า Detail ต่อไปครับ
  };

  return (
    <div style={{ 
      minHeight: '100vh', padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', 
      fontFamily: "'Inter', sans-serif", backgroundColor: '#1E104E', color: '#FFFFFF'
    }}>
      {/* Header Section */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>ยืม - คืนอุปกรณ์การศึกษา</h1>
        <p style={{ color: '#FFC85C', fontSize: '15px' }}>ระบบค้นหาและตรวจสอบสถานะอุปกรณ์สำหรับนักศึกษาและบุคลากร</p>
      </div>

      {/* Control Bar */}
      <div style={{ 
        background: '#452E5A', padding: '24px', borderRadius: '16px', 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', marginBottom: '32px',
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="กรุณาระบุข้อมูล..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '14px 16px', flex: '1.5', minWidth: '200px', borderRadius: '10px', border: 'none', backgroundColor: '#FFFFFF', color: '#1E104E', fontWeight: '600' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1', minWidth: '170px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#FFC85C', whiteSpace: 'nowrap' }}>หมวดหมู่:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '14px 12px', width: '100%', borderRadius: '10px', border: 'none', backgroundColor: '#FFFFFF', color: '#1E104E', fontWeight: '600', cursor: 'pointer' }}
            >
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1', minWidth: '170px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#FFC85C', whiteSpace: 'nowrap' }}>สถานะ:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ padding: '14px 12px', width: '100%', borderRadius: '10px', border: 'none', backgroundColor: '#FFFFFF', color: '#1E104E', fontWeight: '600', cursor: 'pointer' }}
            >
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFC85C' }}>📅 ช่วงเวลา:</span>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#FFFFFF', color: '#1E104E', fontWeight: '600' }} />
            <span style={{ color: '#FFC85C', fontSize: '14px', fontWeight: '600' }}>ถึง</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#FFFFFF', color: '#1E104E', fontWeight: '600' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleReset} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#FFFFFF', color: '#1E104E', fontWeight: '700', cursor: 'pointer' }}>รีเซ็ต</button>
            <button style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#FF653F', color: '#FFFFFF', fontWeight: '700', cursor: 'pointer' }}>กรอง</button>
          </div>
        </div>
      </div>

      {/* Grid Display using EquipmentCard Component */}
      {filteredEquipments.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', background: '#452E5A', borderRadius: '16px', border: '1px dashed #FF653F' }}>
          <p style={{ fontSize: '16px', margin: 0, fontWeight: '600' }}>ไม่พบรายการอุปกรณ์ที่คุณต้องการ</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {filteredEquipments.map((item) => (
            <EquipmentCard 
              key={item.id} 
              item={item} 
              onBorrow={handleOpenBorrowModal} 
              onClick={() => handleCardClick(item)} 
            />
          ))}
        </div>
      )}

      {/* Borrow Modal Component */}
      <BorrowModal 
        selectedItem={selectedItem}
        initialStartDate={modalStartDate}
        initialEndDate={modalEndDate}
        onClose={handleCloseModal}
        onSubmit={handleBorrowSubmit}
      />
    </div>
  );
}

export default Home;