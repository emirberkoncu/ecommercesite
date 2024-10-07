import { useState } from 'react';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Basit doğrulama ve kayıt işlemi
    if (username && email && password) {
      onRegister(true);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-sm:mb-40 max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold  mb-2">
              Username
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
