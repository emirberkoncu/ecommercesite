import React, { useState } from 'react';

function Settings() {
  // Kullanıcı bilgilerini tutmak için state kullanımı
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Ayarları kaydetme işlemi
  const handleSave = (e) => {
    e.preventDefault();
    // Burada kullanıcı bilgilerini güncelleme işlemlerini yapabilirsiniz.
    console.log('Kullanıcı adı:', username);
    console.log('E-posta:', email);
    // Kullanıcı bilgilerini kaydetmek için bir API çağrısı veya benzeri bir işlem yapılabilir.
  };

  return (
    <div className="container mx-auto py-8 max-sm:p-4">
      <h1 className="text-3xl font-bold mb-4">Ayarlar</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">
            Kullanıcı Adı
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Kullanıcı adınızı girin"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="E-posta adresinizi girin"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default Settings;
