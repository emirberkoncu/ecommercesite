import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Siparişlerim</h1>
      {orders.length > 0 ? (
        <ul className="space-y-6">
          {orders.map((order, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Sipariş {index + 1}
                </h2>
                <p className="text-gray-600">Tarih: {order.date}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Ürünler:</h3>
                <ul className="list-none list-inside">
                  {order.cartItems.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-1">
                      {item.name} - {item.quantity} adet - {item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Teslimat Adresi:</h3>
                <p>Name : {order.address.fullName}</p>
                <p>Address : {order.address.street}</p>
                <p>
                  City : {order.address.city}, Postal Code :{' '}
                  {order.address.postalCode}
                </p>
                <p>Tel: {order.address.phone}</p>
                <p>E-Mail: {order.address.email}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  Toplam: {order.totalAmount.toFixed(2)}$
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Henüz siparişiniz bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Orders;
