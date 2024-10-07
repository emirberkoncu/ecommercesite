import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { productData } from './Home';
import Error from './Error';

function Navbar({ username, setUsername }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null); // Menü butonunu referansı için yeni
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    let allFoundProducts = [];
    for (let category in productData) {
      const foundProducts = productData[category].filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      allFoundProducts = [...allFoundProducts, ...foundProducts];
    }

    if (allFoundProducts.length > 0) {
      setError(null);
      navigate('/search-results', { state: { results: allFoundProducts } });
      return;
    } else {
      setError('Arama sonucu bulunamadı');
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Menü durumunu değiştir
  };

  const handleLogout = () => {
    // Çıkış yapma işlemleri (örneğin kullanıcıyı sıfırlama)
    setUsername('');
    setMenuOpen(false);
    alert('Çıkış yapıldı.');
    navigate('/'); // Ana sayfaya yönlendir
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !menuButtonRef.current.contains(e.target) // Menü butonuna tıklamaları da kontrol et
      ) {
        setMenuOpen(false);
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleMenuClick = (e) => {
    // Menü tıklaması durumunu kontrol et
    if (menuOpen) {
      setMenuOpen(false); // Menüyü kapat
    } else {
      toggleMenu(); // Menü durumunu değiştir
    }
  };

  return (
    <>
      <nav className="bg-gray-800 text-white py-4 shadow-md ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo veya başlık */}
          <Link
            to="/"
            className="text-2xl font-bold mx-2 hover:text-blue-400 max-sm:mb-2"
          >
            BOE🦦🦍🐢
          </Link>
          {/* Arama formu */}
          <form
            onSubmit={handleSearch}
            className="relative w-full md:w-auto mb-2 max-sm:p-1 md:mb-0"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pr-12 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-blue-500 w-full sm:w-64 md:w-80 lg:w-96"
              placeholder="Ürün ara..."
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black px-3 py-2 rounded hover:text-blue-400"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          {/* Navigasyon bağlantıları ve kullanıcı eylemleri */}
          <div className="flex items-center space-x-4 max-sm:mt-2">
            {username ? (
              <>
                <button
                  ref={menuButtonRef}
                  onClick={handleMenuClick} // Menü tıklama işlevini güncelleyelim
                  className="text-white px-4 hover:text-blue-400 focus:outline-none"
                >
                  Hoş geldin, {username}
                </button>
                <Link to="/cart" className="text-white hover:text-blue-400">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-sm mr-1"
                  />
                  Sepetim
                </Link>
                {/* Menü */}
                {menuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute top-12 max-sm:top-[140px] mt-2 w-40 bg-white text-black rounded shadow-md z-10"
                  >
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Ayarlar
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Siparişlerim
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-400">
                  Giriş Yap
                </Link>
                <Link to="/register" className="text-white hover:text-blue-400">
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {error && <Error message={error} />}
    </>
  );
}

export default Navbar;
