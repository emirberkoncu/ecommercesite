import React from 'react';
import { useParams } from 'react-router-dom';
import { productData } from './Home'; // Ürün verilerini Home.js'den içe aktar.
import SimilarProductsSlider from './SimilarProductsSlider';

function ProductDetail({ addToCart }) {
  const { categoryId, productId } = useParams(); // İki ID'yi de al
  console.log('categoryId:', categoryId, 'productId:', productId); // Değerleri kontrol et

  // Kategori ve ürün ID'sine göre ürünü bul
  const categoryProducts = productData[categoryId];

  if (!categoryProducts) {
    return <h1 className="text-center mt-8 text-xl">Kategori Bulunamadı</h1>;
  }

  const product = categoryProducts.find(
    (item) => item.id === parseInt(productId)
  );

  if (!product) {
    return <h1 className="text-center mt-8 text-xl">Ürün Bulunamadı</h1>;
  }

  // Benzer ürünleri bul
  const similarProducts = categoryProducts
    .filter((item) => item.id !== product.id) // Mevcut ürünü hariç tut
    .sort(() => 0.5 - Math.random()) // Rastgele sırala
    .slice(0, 3); // İlk 3 rastgele ürünü al

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row">
        {/* Sol Taraf - Resim */}
        <div className="w-full lg:w-1/2 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded shadow-lg"
          />
          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded float-right hover:bg-blue-600"
          >
            Sepete Ekle
          </button>
          <p className="text-xl font-semibold mb-4 float-right mt-5 mr-2">
            {product.price}
          </p>
        </div>

        {/* Sağ Taraf - Detaylar */}
        <div className="w-full lg:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <ul className="list-disc list-inside mb-4">
            {product.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Taksit Seçenekleri */}
          <h2 className="text-xl font-bold mb-2">Taksit Seçenekleri</h2>
          <ul className="list-disc list-inside mb-4">
            {product.installmentOptions.map((option, index) => (
              <li key={index}>
                {option.months} Taksit için ayda {option.price} $
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Benzer Ürünler Slider */}
      <SimilarProductsSlider
        similarProducts={similarProducts}
        addToCart={addToCart}
        categoryId={categoryId}
      />
    </div>
  );
}

export default ProductDetail;
