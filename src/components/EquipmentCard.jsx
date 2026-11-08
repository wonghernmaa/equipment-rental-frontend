import React from 'react';

function EquipmentCard({ item, onBorrow, onClick }) {
  const isAvailable = item.available_qty > 0;

  return (
    <div 
      style={{ 
        background: '#452E5A', 
        borderRadius: '16px', 
        padding: '18px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        transition: 'transform 0.2s ease, border-color 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FF653F'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
    >
      {/* คลิกส่วนนี้เพื่อเข้าดูรายละเอียด */}
      <div 
        onClick={() => onClick && onClick(item)}
        style={{ cursor: 'pointer', width: '100%' }}
      >
        <div style={{ 
          width: '100%', 
          height: '150px', 
          borderRadius: '12px', 
          overflow: 'hidden',
          backgroundColor: '#1E104E',
          marginBottom: '14px'
        }}>
          <img 
            src={item.image_url} 
            alt={item.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} 
          />
        </div>

        <span style={{ 
          fontSize: '12px', 
          fontWeight: '700', 
          color: '#1E104E', 
          background: '#FFC85C', 
          padding: '4px 10px', 
          borderRadius: '6px'
        }}>
          {item.category}
        </span>

        <h3 style={{ fontSize: '17px', fontWeight: '700', margin: '12px 0 6px', color: '#FFFFFF' }}>
          {item.name}
        </h3>
      </div>

      <div style={{ marginTop: '16px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '12px',
          fontSize: '13px'
        }}>
          <span style={{ color: '#E2E8F0', fontWeight: '500' }}>สถานะ</span>
          <span style={{ 
            fontWeight: '700', 
            color: isAvailable ? '#4ADE80' : '#FF653F' 
          }}>
            {isAvailable ? `พร้อมยืม (${item.available_qty}/${item.total_qty})` : 'ถูกยืมหมดแล้ว'}
          </span>
        </div>

        <button 
          disabled={!isAvailable} 
          onClick={(e) => {
            e.stopPropagation(); 
            onBorrow(item);
          }}
          style={{ 
            padding: '12px', 
            width: '100%', 
            borderRadius: '10px',
            border: 'none',
            backgroundColor: isAvailable ? '#FF653F' : '#6B7280', 
            color: '#FFFFFF',
            fontWeight: '700',
            fontSize: '14px',
            cursor: isAvailable ? 'pointer' : 'not-allowed',
            boxShadow: isAvailable ? '0 4px 12px rgba(255, 101, 63, 0.3)' : 'none'
          }}
        >
          {isAvailable ? 'ขอยืมอุปกรณ์' : 'หมดชั่วคราว'}
        </button>
      </div>
    </div>
  );
}

export default EquipmentCard;