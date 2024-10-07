import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Payment() {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = item.quantity || 0;
      return total + (itemPrice * itemQuantity || 0);
    }, 0);
  };

  const totalAmount = calculateTotal();

  const handlePaymentClick = () => {
    setShowCardDetails(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Adres bilgilerini kontrol et
    if (
      !address.fullName ||
      !address.email ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.postalCode
    ) {
      setErrorMessage('Lütfen tüm adres bilgilerini doldurun.');
      return;
    }

    // Ödeme işlemi simülasyonu
    console.log('Ödeme yapılıyor...');

    // Yeni siparişi oluştur
    const newOrder = {
      cartItems,
      address,
      totalAmount,
      date: new Date().toLocaleDateString(),
    };

    // Mevcut siparişleri localStorage'dan al
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Yeni siparişi ekle
    const updatedOrders = [...existingOrders, newOrder];

    // Güncellenmiş siparişleri localStorage'a kaydet
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // localStorage'dan sepeti temizle
    localStorage.removeItem('cart');

    // Ödeme başarı sayfasına yönlendir
    navigate('/payment-success', { state: { paymentCompleted: true } });
  };

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = input.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = input.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(input);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' || name === 'postalCode') {
      const formattedPhone = value.replace(/\D/g, '').slice(0, 15); // 15 haneli telefon numarası
      setAddress({ ...address, [name]: formattedPhone });
    } else {
      setAddress({ ...address, [name]: value });
    }
  };

  return (
    <div className="container mx-auto py-8 max-sm:p-4 max-sm:py-8 ">
      <h1 className="text-3xl font-bold mb-4">Ödeme Sayfası</h1>

      {/* Hata Mesajı */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      {/* Adres Bilgileri Formu */}
      <form className="border p-4 rounded mb-4">
        <div className="mb-4">
          <label className="block mb-1">Ad Soyad</label>
          <input
            type="text"
            name="fullName"
            value={address.fullName}
            onChange={handleAddressChange}
            required
            className="border p-2 rounded w-full"
            placeholder="Ad Soyad"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">E-posta</label>
          <input
            type="email"
            name="email"
            value={address.email}
            onChange={handleAddressChange}
            required
            className="border p-2 rounded w-full"
            placeholder="E-posta"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Telefon Numarası</label>
          <input
            type="tel"
            name="phone"
            value={address.phone}
            onChange={handleAddressChange}
            required
            className="border p-2 rounded w-full"
            placeholder="Telefon Numarası"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sokak</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            required
            className="border p-2 rounded w-full"
            placeholder="Sokak Adresi"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Şehir</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            required
            className="border p-2 rounded w-full"
            placeholder="Şehir"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Posta Kodu</label>
          <input
            type="text"
            name="postalCode"
            value={address.postalCode}
            onChange={handleAddressChange}
            required
            className="border p-2 rounded w-full"
            placeholder="Posta Kodu"
          />
        </div>
      </form>

      {/* Alınan Ürünler ve Ödeme Bilgileri */}
      <h2 className="text-lg font-semibold mb-2">Alınan Ürünler</h2>
      <ul className="mb-4">
        {cartItems.map((item, index) => (
          <li key={index} className="flex justify-between border-b py-2">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Toplam Tutar:</span>
        <span>{totalAmount.toFixed(2)}$</span>
      </div>

      <h2 className="text-lg font-semibold mb-2">Taksit Seçenekleri</h2>
      <select className="border rounded p-2 mb-4 w-full">
        <option value="1">Tek Çekim</option>
        <option value="3">3 Taksit</option>
        <option value="6">6 Taksit</option>
        <option value="9">9 Taksit</option>
        <option value="12">12 Taksit</option>
      </select>

      <button
        onClick={handlePaymentClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
      >
        Ödeme Yap
      </button>

      {showCardDetails && (
        <form onSubmit={handleSubmit} className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Kart Bilgileri</h2>
          <div className="mb-4">
            <label className="block mb-1">Kart Numarası</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
              className="border p-2 rounded w-full"
              placeholder="1234 5678 9123 4567"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Son Kullanma Tarihi</label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              required
              className="border p-2 rounded w-full"
              placeholder="CVV"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Ödemeyi Tamamla
          </button>
        </form>
      )}
    </div>
  );
}

export default Payment;
