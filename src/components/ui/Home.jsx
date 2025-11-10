import React from "react";
import { Plus, ShoppingCart } from "lucide-react";

// Image imports
import offer from "../../assets/images/landing/offer.png";
import productHome from "../../assets/images/landing/product-home.png";

const Home = () => {
  return (
    <section className="relative pb-28 xl:pb-36 pt-44 xl:pt-52 bg-white dark:bg-zinc-900" id="home">
      {/* Blurred Backgrounds */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl"></div>

      <div className="container mx-auto 2xl:max-w-[87.5rem] px-4">
        <div className="grid grid-cols-12 items-center gap-5">
          
          {/* Left Content */}
          <div className="col-span-12 xl:col-span-5">
            <h1
              className="mb-4 leading-snug text-4xl lg:text-5xl 2xl:text-6xl font-bold text-zinc-900 dark:text-zinc-100"
              data-aos="fade-right"
              data-aos-delay="300"
            >
            Create Your Forever Free
Digital Visiting Card
            </h1>
            <p
              className="text-lg mb-7 text-slate-600 dark:text-zinc-400"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              Get your lifetime professional digital visiting card - absolutely free with QRCodeChimp!
Choose from 15+ customizable templates and seamlessly add your card to Apple Wallet or Google Wallet.
Boost your connections with a built-in contact exchange form, all backed by top-notch security. Start building your professional identity today, and it's free forever!
            </p>
            <div className="flex items-center gap-3" data-aos="fade-right" data-aos-delay="800">
              <button
                type="button"
                className="px-8 py-3 text-white text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-500 transition flex items-center gap-2"
              >
                Creat Now <ShoppingCart className="size-4" />
              </button>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="col-span-12 xl:col-span-7 2xl:col-start-8 2xl:col-span-6">
            <div className="relative mt-10 xl:mt-0">
              
              {/* Background Text */}
              <div
                className="absolute text-center -top-20 xl:-right-40 text-[6rem] lg:text-[10rem] 2xl:text-[14rem] text-slate-200 dark:text-zinc-800/60 font-extrabold tracking-widest leading-none pointer-events-none select-none"
                style={{ fontFamily: `'Tourney', sans-serif` }}
                data-aos="zoom-in-down"
                data-aos-delay="1400"
              >
               Digital Card
              </div>

              {/* Tag Image */}
              <img
                src={offer}
                alt="Offer Tag"
                className="absolute h-40 left-10 xl:-left-10 top-32 opacity-80 blur-sm"
                data-aos="fade-down-right"
                data-aos-delay="900"
                data-aos-easing="linear"
              />

              {/* Main Product Image */}
              <div className="relative" data-aos="zoom-in" data-aos-delay="500">
                <button
                  data-tooltip="default"
                  data-tooltip-content="$199.99"
                  className="absolute hidden xl:flex items-center justify-center w-8 h-8 bg-white rounded-full text-slate-800 bottom-20 left-20 shadow-md"
                >
                  <Plus />
                </button>
                <img src={productHome} alt="Main Shoe" className="mx-auto" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Home;
