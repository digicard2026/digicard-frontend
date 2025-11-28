// import React from "react";
// import { MoveRight } from "lucide-react";
// import productCta from "../../assets/images/product/cta.png";
// import productBg from "../../assets/images/product/cta-2.png";

// const Features = () => {
//   return (
//     <section
//       className="relative py-24 bg-white overflow-hidden ml-20 mt-80"
//       id="features"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
//         {/* Left Text Section */}
//         <div className="flex-1">
//           <h1
//             className="text-4xl font-extrabold text-slate-900 leading-tight mb-6"
//             data-aos="fade-right"
//             data-aos-delay="200"
//           >
//             Explore Our Flagship <br />
//             Product And Discover Its <br />
//             Unique Features
//           </h1>
//           <p
//             className="text-lg text-slate-500 mb-6"
//             data-aos="fade-right"
//             data-aos-delay="300"
//           >
//             Whatever your running gait, a good pair of running shoes will
//             provide flexibility, durability, and support.
//           </p>
//           <ul
//             className="list-disc pl-5 space-y-2 text-gray-800"
//             data-aos="fade-right"
//             data-aos-delay="400"
//           >
//             <li>Matches Your Foot Shape & Type</li>
//             <li>Easy to Wear</li>
//             <li>Heels That You Can Wear</li>
//             <li>Good Quality & Condition</li>
//             <li>Segments of Solid Rubber</li>
//           </ul>

//           <a
//             href="#"
//             className="mt-6 inline-flex items-center text-indigo-600 hover:text-purple-600 font-semibold transition-all"
//             data-aos="fade-right"
//             data-aos-delay="500"
//           >
//             Shopping Now <MoveRight className="ml-1.5" size={18} />
//           </a>
//         </div>

//         {/* Right Image Section */}
//         <div className="flex-1 relative flex justify-center items-center">
//           {/* Background leg image */}
//           <img
//             src={productBg}
//             alt="background-leg"
//             className="absolute top-[-90px] right-[12%] w-[230px] opacity-40 z-0 rounded-xl blur-sm"
//             data-aos="zoom-in"
//             data-aos-delay="800"
//           />

//           {/* Foreground shoe image */}
//           <img
//             src={productCta}
//             alt="main-shoe"
//             className="relative z-10 max-w-[440px] w-full"
//             data-aos="fade-up"
//             data-aos-delay="300"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;
import React from "react";
import { MoveRight } from "lucide-react";
import productCta from "../../assets/images/product/cta.webp";
// import productBg from "../../assets/images/product/cta-2.png";

const Features = () => {
  return (
    <section className="relative py-24 xl:py-32 bg-white overflow-hidden" id="features">
      {/* Blurred BG Shape */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 blur-3xl"></div>

      <div className="container 2xl:max-w-[87.5rem] px-4 mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center mt-20">
          {/* Left Text Section */}
          <div className="lg:col-span-5">
            <ul
              className="list-disc list-inside text-base text-slate-700 dark:text-zinc-300 space-y-2 mb-6"
              data-aos="fade-right"
              data-aos-delay="500"
            >
             <b>Grow Your Network</b> 
            </ul>
            <h1
              className="text-4xl font-bold text-slate-900 mb-4 leading-snug capitalize"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              The best digital Personal card & contact manager.
            </h1>
            <p
              className="text-lg text-slate-500 dark:text-zinc-400 mb-5"
              data-aos="fade-right"
              data-aos-delay="500"
            >
             A digital Personal card goes beyond just sharing contact information—it includes a powerful contact manager designed to help you build and grow your network. Store and organize all your contacts in one place with details like names, addresses, and phone numbers. You can personalize your contact book by adding notes, tags, and updated info.
            </p>
            
            <a
              href="#"
              className="text-custom-500 font-medium text-base inline-flex items-center hover:text-purple-600 transition-colors"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              Shopping Now
              <MoveRight className="ml-2 size-4 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            </a>
          </div>

          {/* Right Image Section */}
          <div className="lg:col-span-7 lg:col-start-8 relative flex justify-end items-center">
            {/* Background Shoe Image */}
            {/* <div
              className="absolute bottom-40 right-0 w-52 h-96 rounded-md bg-cover bg-center"
              style={{ backgroundImage: `url(${productBg})` }}
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-white dark:to-zinc-900 from-30%"></div>
            </div> */}

            {/* Foreground Shoe Image */}
            <div className="relative z-10 mr-16">
              <img
                src={productCta}
                alt="Main Product"
                className="inline-block max-w-full"
                data-aos="fade-up-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
