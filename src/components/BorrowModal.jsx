import React, { useState, useEffect } from 'react';

function BorrowModal({ selectedItem, initialStartDate, initialEndDate, onClose, onSubmit }) {
  const [studentId, setStudentId] = useState('');
  const [reason, setReason] = useState('');
  const [borrowQty, setBorrowQty] = useState(1);
  const [modalStartDate, setModalStartDate] = useState('');
  const [modalEndDate, setModalEndDate] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setBorrowQty(1);
      setModalStartDate(initialStartDate || '');
      setModalEndDate(initialEndDate || '');
    }
  }, [selectedItem, initialStartDate, initialEndDate]);

  if (!selectedItem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (borrowQty > selectedItem.available_qty) {
      alert(`ไม่สามารถยืมเกินจำนวนที่มีอยู่ได้ (เหลือ ${selectedItem.available_qty} ชิ้น)`);
      return;
    }
    onSubmit({
      item: selectedItem,
      studentId,
      borrowQty,
      modalStartDate,
      modalEndDate,
      reason
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 10, 30, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#452E5A',
        borderRadius: '20px',
        padding: '28px',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginTop: 0, marginBottom: '16px' }}>
          แบบฟอร์มขอยืมอุปกรณ์
        </h2>

        <div style={{ 
          backgroundColor: '#1E104E', 
          padding: '14px', 
          borderRadius: '12px', 
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <img 
            src={selectedItem.image_url} 
            alt={selectedItem.name} 
            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <div>
            <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: '15px' }}>{selectedItem.name}</h4>
            <p style={{ margin: '4px 0 0', color: '#FFC85C', fontSize: '13px' }}>
              หมวดหมู่: {selectedItem.category} | พร้อมยืม {selectedItem.available_qty} ชิ้น (สูงสุด 3 ชิ้น)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFC85C', marginBottom: '6px' }}>
              รหัสนักศึกษา / บุคลากร *
            </label>
            <input
              type="text"
              required
              placeholder="กรุณาระบุข้อมูล..."
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                color: '#1E104E',
                fontSize: '14px',
                fontWeight: '600',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFC85C', marginBottom: '6px' }}>
              จำนวนที่ต้องการยืม (สูงสุด 3 ชิ้น) *
            </label>
            <input
              type="number"
              min="1"
              max={Math.min(3, selectedItem.available_qty)}
              required
              value={borrowQty}
              onChange={(e) => setBorrowQty(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                color: '#1E104E',
                fontSize: '14px',
                fontWeight: '600',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFC85C', marginBottom: '6px' }}>
                วันที่ยืม *
              </label>
              <input
                type="date"
                required
                value={modalStartDate}
                onChange={(e) => setModalStartDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  color: '#1E104E',
                  fontWeight: '600',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFC85C', marginBottom: '6px' }}>
                วันที่คืน *
              </label>
              <input
                type="date"
                required
                value={modalEndDate}
                onChange={(e) => setModalEndDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  color: '#1E104E',
                  fontWeight: '600',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#FFC85C', marginBottom: '6px' }}>
              วัตถุประสงค์ในการยืม *
            </label>
            <textarea
              required
              rows="3"
              placeholder="กรุณาระบุข้อมูล..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                color: '#1E104E',
                fontSize: '14px',
                boxSizing: 'border-box',
                resize: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#FFFFFF',
                color: '#1E104E',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#FF653F',
                color: '#FFFFFF',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              ยืนยันการยืม
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BorrowModal;