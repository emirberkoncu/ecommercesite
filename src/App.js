import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymenSuccess';
import SearchResults from './pages/SearchResults';
import Settings from './pages/Settings';
import { productData } from './pages/Home';
import Orders from './pages/Orders';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './pages/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]); // Sepet durumu
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Giriş durumu
  const [username, setUsername] = useState('');

  const handleLogin = (usernameInput, passwordInput) => {
    if (usernameInput === 'user' && passwordInput === 'password') {
      setIsAuthenticated(true); // Giriş başarılı
      setUsername(usernameInput);
      localStorage.setItem('username', usernameInput); // Kullanıcı adını localStorage'a kaydet
    } else {
      alert('Geçersiz kimlik bilgileri');
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false); // Giriş durumu sıfırlanır
    setUsername('');
    localStorage.removeItem('username'); // localStorage'daki kullanıcı bilgileri temizlenir
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleRegister = (usernameInput, passwordInput) => {
    // Kayıt işlemleri burada gerçekleştirilir
    // Örneğin, kullanıcıyı veritabanına kaydedebilirsiniz
    alert(`Kayıt başarılı: ${usernameInput}`);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Router>
        <div className="App">
          <Navbar
            productData={productData}
            username={username}
            setUsername={setUsername}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    onLogin={handleLogin}
                    setIsAuthenticated={setIsAuthenticated}
                    setUsername={setUsername}
                  />
                )
              }
            />
            <Route
              path="/register"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/:categoryId/:productId"
              element={
                <ProductDetail
                  addToCart={addToCart}
                  setCartItems={setCartItems}
                />
              }
            />
            <Route path="/search-results" element={<SearchResults />} />
            <Route
              path="/cart"
              element={<Cart items={cartItems} setCartItems={setCartItems} />}
            />
            <Route
              path="/payment"
              element={<Payment cartItems={cartItems} />} // Ödeme bileşenine yönlendirme
            />
            <Route
              path="/payment-success"
              element={<PaymentSuccess clearCart={clearCart} />} // Ödeme başarılı bileşenine yönlendirme
            />
            <Route
              path="/settings"
              element={
                <Settings username={username} setUsername={setUsername} />
              }
            />
            <Route
              path="/redirect"
              element={
                isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
