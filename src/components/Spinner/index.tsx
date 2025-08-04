import React from 'react';

interface SpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 40, 
  color = 'white', 
  thickness = 3 
}) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1002,
    }}
  >
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `${thickness}px solid rgba(255, 255, 255, 0.3)`,
        borderTop: `${thickness}px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Spinner;

