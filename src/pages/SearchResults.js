import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { productData } from './Home'; // Ürün verilerini içe aktarın.

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || []; // Arama sonuçlarını al

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Arama Sonuçları</h1>
      {results.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => {
            const category = Object.keys(productData).find((cat) =>
              productData[cat].some((p) => p.id === product.id)
            );
            return (
              <li
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
              >
                <Link
                  to={`/${category}/${product.id}`}
                  className="block text-blue-600  mb-2"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">{product.price}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-600">Ürün bulunamadı.</p>
      )}
    </div>
  );
};

export default SearchResults;
