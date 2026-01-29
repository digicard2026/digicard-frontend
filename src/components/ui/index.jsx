// // import React, { useEffect } from "react";
// // import { FiChevronUp } from "react-icons/fi";
// // import Navbar from "./Navbar";
// // import Home from "./Home";
// // import OurProduct from "./OurProduct";
// // import Features from "./Features";
// // import AboutUs from "./AboutUs";
// // import Feedback from "./Feedback";
// // import Footer from "./Footer";

// // const Product = () => {
// //   useEffect(() => {
// //     document.title = "Product Landing Page | Tailwick - React Admin & Dashboard Template";

// //     const windowScroll = () => {
// //       const backToTop = document.getElementById("back-to-top");
// //       if (backToTop) {
// //         const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
// //         backToTop.style.opacity = scrollTop >= 50 ? "1" : "0";
// //       }
// //     };

// //     window.addEventListener("scroll", windowScroll);
// //     window.addEventListener("load", windowScroll);

// //     return () => {
// //       window.removeEventListener("scroll", windowScroll);
// //       window.removeEventListener("load", windowScroll);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const bodyElement = document.body;
// //     bodyElement.classList.add(
// //       "text-base",
// //       "bg-white",
// //       "text-zinc-600",
// //       "font-sans",
// //       "dark:text-zinc-60",
// //       "dark:bg-zinc-600"
// //     );
// //   }, []);

// //   const handleScroll = () => {
// //     window.scrollTo({
// //       top: 0,
// //       behavior: "smooth"
// //     });
// //   };

// //   return (
// //     <div className="text-base bg-white text-zinc-600 font-sans dark:text-zinc-60 dark:bg-zinc-600">
// //       <Navbar />
// //       <Home />
// //       <OurProduct />
// //       <Features />
// //       <AboutUs />
// //       <Feedback />
// //       <Footer />
      
// //       {/* Back to Top Button */}
// //       <button
// //         id="back-to-top"
// //         onClick={handleScroll}
// //         className="fixed flex items-center justify-center w-10 h-10 text-white bg-purple-500 rounded-md bottom-10 right-10 opacity-0 transition-opacity duration-300 hover:bg-purple-600"
// //       >
// //         <FiChevronUp className="animate-bounce" />
// //       </button>
// //     </div>
// //   );
// // };

// // export default Product;
// import React, { useEffect } from "react";
// import { FiChevronUp } from "react-icons/fi";
// import Navbar from "./Navbar";
// import Home from "./Home";
// import OurProduct from "./OurProduct";
// import Features from "./Features";
// import AboutUs from "./AboutUs";
// import Feedback from "./Feedback";
// import Footer from "./Footer";

// const Product = () => {
//   useEffect(() => {
//     document.title = "Product Landing Page | Tailwick - React Admin & Dashboard Template";

//     const windowScroll = () => {
//       const backToTop = document.getElementById("back-to-top");
//       if (backToTop) {
//         const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//         backToTop.style.opacity = scrollTop >= 50 ? "1" : "0";
//       }
//     };

//     window.addEventListener("scroll", windowScroll);
//     window.addEventListener("load", windowScroll);

//     return () => {
//       window.removeEventListener("scroll", windowScroll);
//       window.removeEventListener("load", windowScroll);
//     };
//   }, []);

//   const handleScroll = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white text-zinc-600 font-sans dark:text-zinc-60 dark:bg-zinc-600">
//       <Navbar />
      
//       <main className="flex-1 overflow-visible">
//         <Home />
//         <OurProduct />
//         <Features />
//         <AboutUs />
//         <Feedback />
//         <Footer />
//       </main>
      
//       {/* Back to Top Button */}
//       <button
//         id="back-to-top"
//         onClick={handleScroll}
//         className="fixed flex items-center justify-center w-10 h-10 text-white bg-purple-500 rounded-md bottom-10 right-10 opacity-0 transition-opacity duration-300 hover:bg-purple-600 z-50"
//       >
//         <FiChevronUp className="animate-bounce" />
//       </button>
//     </div>
//   );
// };

// export default Product;
import React, { useEffect } from "react";
import { ChevronUp } from "lucide-react";

// Sections
import Navbar from "./Navbar";
import Home from "./Home";
// import OurProduct from "./OurProduct";
import Features from "./Features";
import AboutUs from "./AboutUs";
import Feedback from "./Feedback";
import Footer from "./Footer";
import Feature from "./Feature";
// import PlanSection from "../../pages/Card/PlanSelection";
 import PlanSelection from "../../pages/Card/PlanSelection";
import NavBar from "../../pages/Revayah/NavBar";
import HowItWorks from "./HowItWorks";
// import DoctorList from "../../pages/Doctor/DoctorList";
const Product = () => {
  useEffect(() => {
    document.title = "DigitalCard";

    const windowScroll = () => {
      const backToTop = document.getElementById("back-to-top");
      if (backToTop) {
        if (window.scrollY >= 50) {
          backToTop.style.opacity = "1";
        } else {
          backToTop.style.opacity = "0";
        }
      }
    };

    window.addEventListener("scroll", windowScroll);
    window.addEventListener("load", windowScroll);

    return () => {
      window.removeEventListener("scroll", windowScroll);
      window.removeEventListener("load", windowScroll);
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.classList.add(
      
      "bg-white",
      "text-zinc-600",
      "font-sans",
      "dark:text-zinc-50",
      "dark:bg-zinc-900",
      "overflow-x-hidden"
    );
    document.body.style.overflowY = "auto";
  }, []);

  return (
    <>
      <div className=" bg-white text-zinc-600 font-sans dark:text-zinc-50 dark:bg-zinc-900">
        <NavBar />
        <main>
          <Home /> 
           {/* <OurProduct /> */}
          <Features /> 
           <AboutUs /> 
          {/* <DoctorList/> */}
          <Feature/>
          <HowItWorks/>
           <Feedback />
           <PlanSelection/>
        </main>
        <Footer />

        {/* Back to Top Button */}
        <button
          id="back-to-top"
          onClick={handleScroll}
          className="fixed bottom-10 right-10 w-10 h-10 flex items-center justify-center text-white bg-rosey-600 rounded-md opacity-0 transition-opacity duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp className="animate-bounce" />
        </button>
      </div>
    </>
  );
};

export default Product;
