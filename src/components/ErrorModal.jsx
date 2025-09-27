import React, { useEffect, useState } from 'react';

const ErrorModal = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Modal will hide after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [message]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <p className="text-xl font-semibold text-red-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
