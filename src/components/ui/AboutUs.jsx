// import React from "react";
// import { MoveRight } from "lucide-react";
// import about from "../../assets/images/landing/about.jpg";

// const AboutUs = () => {
//   return (
//     <section className="relative py-24 bg-white overflow-hidden" id="about">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row items-center gap-16">
//           {/* Image Block */}
//           <div 
//             className="relative flex-1 min-w-[300px] max-w-2xl"
//             data-aos="fade-right" 
//             data-aos-delay="100"
//           >
//             <div 
//               className="absolute top-[-60px] right-[-2px] w-4/5 h-[90%] border-[12px] border-double border-green-500/10 z-0 opacity-0 animate-[fadeInBox_1s_ease-in-out_forwards]"
//               data-aos="fade-in" 
//               data-aos-delay="0"
//             ></div>
//             <img 
//               src={about} 
//               alt="About Us" 
//               className="relative z-10 w-4/5 rounded-md opacity-0 translate-y-8 animate-[fadeInImage_1s_ease-in-out_0.3s_forwards]" 
//             />
//           </div>

//           {/* Text Block */}
//           <div 
//             className="flex-1 min-w-[320px] max-w-2xl opacity-0 translate-y-8 animate-[fadeInText_1s_ease-in-out_0.6s_forwards]"
//             data-aos="fade-left" 
//             data-aos-delay="300"
//           >
//             <p className="mb-2 text-purple-500 text-sm font-semibold">About Us</p>
//             <h2 className="mb-5 text-4xl font-bold">We Provide High Quality Shoes</h2>
//             <p className="mb-5 text-lg text-slate-600 leading-relaxed">
//               Look for a shoe with solid construction that will give your feet the support they need.
//               Next, look for quality materials that will make your feet comfortable and keep them healthy.
//             </p>
//             <p className="mb-5 text-lg text-slate-600 leading-relaxed">
//               Low-quality shoes may skimp on stitching, or use low quality glue that's prone to coming apart.
//               A higher-quality shoe will use advanced construction to ensure that the shoe holds up over time,
//               and also eliminate any spots.
//             </p>
//             <button className="px-5 py-3 text-white text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 rounded-md flex items-center transition-all duration-300">
//               Explore Now <MoveRight size={16} className="ml-1.5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;
import React from "react";
import { MoveRight } from "lucide-react";
import about from "../../assets/images/landing/about.webp";

const AboutUs = () => {
  return (
    <section className="relative py-24 xl:py-32 bg-white overflow-hidden" id="about">
      {/* Decorative blurred background */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl"></div>

      <div className="container mx-auto 2xl:max-w-[87.5rem] px-4">
        <div className="grid lg:grid-cols-12 items-center gap-10 mt-20">
          {/* Left Image Block */}
          <div className="relative lg:col-span-5">
            <div
              className="relative"
              data-aos="zoom-out-up"
            >
              <div className="absolute w-full h-full border-[15px] border-double border-green-500/10 -top-16 -right-16 z-0"></div>
              <img
                src={about}
                alt="About Us"
                className="relative z-10 rounded-md"
                data-aos="zoom-out-up"
                data-aos-delay="500"
              />
            </div>
          </div>

          {/* Right Text Block */}
          <div className="lg:col-span-5 lg:col-start-8">
            <p
              className="text-sm text-purple-500 font-medium mb-2"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              About Us
            </p>
            <h4
              className="text-4xl font-bold text-slate-900 mb-4 leading-snug capitalize"
              data-aos="fade-left"
              data-aos-delay="400"
            >
             One profile for everything
            </h4>
            <p
              className="text-lg text-slate-600 dark:text-zinc-400 mb-5"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              Make your digital Personal card stand out.
            </p>
            <p
              className="text-lg text-slate-600 dark:text-zinc-400 mb-5"
              data-aos="fade-left"
              data-aos-delay="550"
            >
              Stand out by customizing your digital Personal card to reflect your brand’s identity. From adding your logo to using personalized colors, fonts, and designs, Wave Connect digital Personal cards offer endless possibilities. Whether you’re a freelancer, entrepreneur, or part of a corporate team, you can showcase your personal brand and create a professional impression.
            </p>
            <button
              type="button"
              className="inline-flex items-center px-8 py-3 text-white text-sm rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition-all"
              data-aos="fade-left"
              data-aos-delay="600"
            >
              Explore Now
              <MoveRight className="ml-2 size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
