import React from "react";
import { CheckCircle } from "lucide-react";

const Feature = () => {
  const features = [
    {
      title: "Thousands of Personal cards",
      desc: "Browse and choose from thousands of Personal cards, customised with your logo colors to match your brand."
    },
    {
      title: "Professional Personal cards",
      desc: "Each and every Personal card at Design.com is created by professional designers."
    },
    {
      title: "All the Personal card files you need",
      desc: "Access all the high resolution files you need for printing and sharing including vectors (SVG, EPS and PDF)."
    },
    {
      title: "Color and layout variations",
      desc: "With unlimited colors and layouts to choose from, personalise your Personal card till it's perfect."
    },
    {
      title: "Social media designs",
      desc: "Create branded social media designs to match your Personal card. Download social posts & stories customized with your brand colors."
    },
    {
      title: "Brand identity designs",
      desc: "Get access to letterheads and email signatures matched to your brand colors to complete your brand identity."
    },
    {
      title: "Unlimited customization",
      desc: "Edit the layout, colors and font on your Personal card. With unlimited edits you can create as many variations as you want."
    },
    {
      title: "Support",
      desc: "24/7 support from our team of design experts means you're always looked after. Help with customization, download and print."
    },
    {
      title: "Royalty free logos",
      desc: "Get a worldwide, irrevocable license to use your logo for any commercial and non-commercial purpose."
    }
  ];

  return (
    <section
      className="relative py-24 xl:py-32 bg-white overflow-hidden text-center"
      id="features"
    >
      {/* Decorative Blur Background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-purple-500/10 blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <h2
          className="text-4xl font-bold text-slate-900 mb-4"
          data-aos="fade-up"
        >
          Features
        </h2>
        <p
          className="text-xl text-slate-600 mb-10 font-medium"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          What you get with a Personal card from <span className="text-purple-600">Degicard.com</span>
        </p>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-2xl border border-slate-100 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="text-purple-600 mt-1 w-5 h-5" />
                <h3 className="text-lg font-semibold text-slate-800">
                  {item.title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
