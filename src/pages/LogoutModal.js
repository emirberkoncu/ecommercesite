import React from 'react';

const LogoutModal = ({ isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg text-black font-semibold mb-4">
          Çıkış Yapmak İstiyor Musunuz?
        </h2>
        <p className="text-black">
          Lütfen çıkış yapmak istediğinizi onaylayın.
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onConfirm} // Çıkış işlemi için onay butonu
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
          >
            Evet
          </button>
          <button
            onClick={onClose} // İptal butonu
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Hayır
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
