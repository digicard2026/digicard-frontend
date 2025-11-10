import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import product16 from "../../assets/images/product/img-16.png";
import product17 from "../../assets/images/product/img-17.png";
import product18 from "../../assets/images/product/img-18.png";
import product19 from "../../assets/images/product/img-19.png";

const OurProduct = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const products = [
    {
      id: 1,
      image: product16,
      name: "Green Sneakers Skate",
      price: "$299.99",
      rating: 4.8,
    },
    {
      id: 2,
      image: product17,
      name: "Nike Running Shoes",
      price: "$129.49",
      rating: 4.4,
    },
    {
      id: 3,
      image: product18,
      name: "Nike Air Max Sneakers Shoe",
      price: "$149.99",
      rating: 4.9,
    },
    {
      id: 4,
      image: product19,
      name: "Dunk Sneakers Skate shoe",
      price: "$174.65",
      rating: 4.6,
    },
  ];

  return (
    <section id="product" className="py-24 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-slate-800">Our Latest Product</h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="bg-[#f1f5f9] hover:bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-contain mx-auto mb-4 transition-transform group-hover:scale-105"
              />
              <div className="text-yellow-400 text-sm flex items-center justify-center mb-2">
                <FaStar className="mr-1" /> ({product.rating})
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-slate-900">{product.price}</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProduct;
