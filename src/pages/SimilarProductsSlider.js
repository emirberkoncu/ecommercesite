import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Slider kütüphanesini ekleyin

// Slider stillerini eklemek için import ekleyin
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SimilarProductsSlider = ({ similarProducts, addToCart, categoryId }) => {
  // Slider ayarları
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-8 max-sm:p-4 max-sm:py-8">
      <h2 className="text-2xl font-bold mb-4">Benzer Ürünler</h2>
      <Slider {...settings}>
        {similarProducts.map((similarProduct) => (
          <div
            key={similarProduct.id}
            className="border rounded-lg p-4 flex flex-col"
          >
            <Link to={`/${categoryId}/${similarProduct.id}`}>
              <img
                src={similarProduct.image}
                alt={similarProduct.name}
                className="w-full h-auto rounded mb-2 cursor-pointer"
              />
              <h3 className="text-lg font-semibold">{similarProduct.name}</h3>
              <p className="text-xl font-bold">{similarProduct.price}</p>
            </Link>
            <button
              onClick={() => addToCart(similarProduct)}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimilarProductsSlider;
