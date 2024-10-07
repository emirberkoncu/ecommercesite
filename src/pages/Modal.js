import React from 'react';

function Modal({ item, onConfirm, onCancel }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold">
          Silmek İstediğinize Emin Misiniz?
        </h2>
        <p className="mt-2">{item.name} ürünü sepetten silinecek.</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white py-2 px-12 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Sil
          </button>
          <button
            className="bg-gray-300  text-gray-700 py- px-12 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
