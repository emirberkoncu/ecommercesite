import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUsername }) {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'emirberkoncu' && password === 'password') {
      setUsername(username); // Kullanıcı adını ayarla
      navigate('/'); // Ana sayfaya yönlendir
      console.log('giriş yapıldı');
    } else {
      setErrorMessage('Geçersiz kullanıcı adı veya şifre');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen   bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-sm:mb-40 max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Şifre
            </label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 w-full rounded hover:bg-green-600"
          >
            Giriş Yap
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
        <Link
          to="/register"
          className="flex justify-center mt-4 py-2 px-4 text-green-500 hover:underline"
        >
          Hesap oluştur
        </Link>
      </div>
    </div>
  );
}

export default Login;
