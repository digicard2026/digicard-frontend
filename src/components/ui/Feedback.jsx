import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import avatar2 from "../../assets/images/users/avatar-2.png";
import avatar4 from "../../assets/images/users/avatar-4.png";
import avatar7 from "../../assets/images/users/avatar-7.png";
import avatar9 from "../../assets/images/users/avatar-9.png";

const Feedback = () => {
  useEffect(() => {
    document.querySelector(".swiper-pagination")?.classList.add("-mb-3");
    return () => {
      document.querySelector(".swiper-pagination")?.classList.remove("-mb-3");
    };
  }, []);

  return (
    <section className="relative py-24 xl:py-32 bg-white" id="feedback">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center max-w-3xl">
          <h1 className="text-4xl font-semibold text-gray-800 capitalize mt-20">
           Loved by 100,000 Customers in 170 Countries.
          </h1>
          <h4>Discover why we've been ranked as the easiest to use digital Personal card globally. Customers across the world can't stop sharing their positive experiences. Read their reviews and discover the difference for yourself. ⭐⭐⭐⭐⭐</h4>
        </div>

        <Swiper
          className="pb-6"
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {[
            {
              avatar: avatar2,
              name: "Angela Ulligan",
              review: "The best templates which is supported multiple programming languages with beautiful templates. Thank you for the valuable template.",
            },
            {
              avatar: avatar4,
              name: "muratoztrkk01",
              review: "I encountered a few errors in the design of the product detail page in Angular. I contacted the support team and they established.",
            },
            {
              avatar: avatar7,
              name: "Christine Marbury",
              review: "This theme is very good. I really recommend it. It's very good optimized, elegant, well documented, etc.",
            },
            {
              avatar: avatar9,
              name: "Anthony Hobbs",
              review: "ThemesDesign used Anydesk to fix the bug in Flask and Django version. I highly recommend this product!",
            },
          ].map(({ avatar, name, review }, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-5 text-center shadow-md rounded-xl h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/10">
                  <img src={avatar} alt={name} className="w-20 h-20 rounded-full" />
                </div>
                <p className="mt-6 text-gray-700 max-w-[280px] leading-relaxed">"{review}"</p>
                <h4 className="mt-4 mb-1 font-semibold text-gray-900">{name}</h4>
                <div className="text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Feedback;