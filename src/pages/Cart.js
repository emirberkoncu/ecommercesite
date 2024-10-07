import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function Cart({ items, setCartItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // localStorage'dan sepet durumunu yükle
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length > 0) {
      setCartItems(savedCart);
    }

    // Ödeme başarılı sayfasından dönüldüğünde sepeti kontrol et
    if (location.state && location.state.paymentCompleted) {
      setCartItems([]);
      localStorage.removeItem('cart'); // localStorage'dan sepeti temizle
      // Durum bilgisini temizle
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, setCartItems, navigate]);

  // Sepet değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const handlePayment = () => {
    navigate('/payment', { state: { cartItems: items } });
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemToDelete.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteAllClick = () => {
    setIsDeleteAllModalOpen(true);
  };

  const handleConfirmDeleteAll = () => {
    setCartItems([]);
    setIsDeleteAllModalOpen(false);
  };

  const handleCancelDeleteAll = () => {
    setIsDeleteAllModalOpen(false);
  };

  return (
    <div className="container mx-auto max-sm:p-4 max-sm:py-8 py-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Sepetim
        </h1>
        {items.length > 0 && (
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleDeleteAllClick}
          >
            Tümünü Sil
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} className="border-b py-4 flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">{item.price} TL</p>
                {item.quantity > 1 && (
                  <p className="text-gray-500">Miktar: {item.quantity}</p>
                )}
              </div>
              <button
                className="text-red-500"
                onClick={() => handleDeleteClick(item)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <button
          onClick={handlePayment}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Ödeme Yap
        </button>
      )}

      {isModalOpen && (
        <Modal
          item={itemToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isDeleteAllModalOpen && (
        <Modal
          item={{ name: 'Tüm Ürünler' }}
          onConfirm={handleConfirmDeleteAll}
          onCancel={handleCancelDeleteAll}
          confirmText="Evet, tüm ürünleri sil"
          cancelText="Hayır, iptal et"
        />
      )}
    </div>
  );
}

export default Cart;
