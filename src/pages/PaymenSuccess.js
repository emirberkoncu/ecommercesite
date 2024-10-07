import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function PaymentSuccess({ clearCart }) {
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Ödeme Başarılı!</h1>
      <p className="text-lg mb-4">
        Ödeme işleminiz başarıyla gerçekleştirilmiştir.
      </p>
      <Link to="/">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Anasayfaya Dön
        </button>
      </Link>
    </div>
  );
}

export default PaymentSuccess;
