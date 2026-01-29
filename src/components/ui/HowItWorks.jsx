import React from "react";
import { UserPlus, Download, Share2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <UserPlus className="size-8 text-white" />,
      title: "Create your Own",
      desc: "It takes 2 minutes. Click here to begin and fill out the form to sign up for your RBIZ account.",
      color: "bg-blue-500",
    },
    {
      id: 2,
      icon: <Download className="size-8 text-white" />,
      title: "Save to your Device",
      desc: "RBIZ is accessible anytime from anywhere. We encourage users to save the card to their mobile home screen.",
      color: "bg-purple-500",
    },
    {
      id: 3,
      icon: <Share2 className="size-8 text-white" />,
      title: "Share with Friends",
      desc: "Share through a variety of channels like SMS, WhatsApp, Email, and Facebook using the 'Share' button.",
      color: "bg-rose-500",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-zinc-800/50" id="how-it-works">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works?
          </h2>
          <p className="text-lg text-slate-600 dark:text-zinc-400">
            3 simple steps and you've got your very own digital business card.
          </p>
        </div>

        {/* Top Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-700 hover:shadow-lg transition-all duration-300 text-center group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className={`w-16 h-16 mx-auto ${step.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown & Video Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div data-aos="fade-right">
              <span className="text-sm font-bold tracking-wider text-rosey-600 uppercase mb-2 block">
                Step 1
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Create your RBIZ
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                <strong>Create your account:</strong> <a href="https://www.revayahone.com/signup" className="text-rosey-600 hover:underline">Sign up</a> to your RBIZ account in minutes.
                <br />
                <strong>Choose a Design:</strong> Choose between our selections of beautiful designs. All our templates are mobile and user friendly, look great and are easy to customize. Not sure what to choose No worries! You can easily switch designs at any time.
                <br />
                <strong>Add your Content:</strong> RBIZ is all about rich content. Besides your contact details and social networks, consider adding a gallery of photos, YouTube videos and custom links so your customers get a rich experience of you!
              </p>
            </div>

            <div data-aos="fade-right" data-aos-delay="100">
              <span className="text-sm font-bold tracking-wider text-rosey-600 uppercase mb-2 block">
                Step 2
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Save to your device
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                Once you're done setting up your RBIZ – save the link content & share. We encourage our users to save the card to the home screen of their mobile device – that way it's accessible from practically anywhere.
              </p>
            </div>

            <div data-aos="fade-right" data-aos-delay="200">
              <span className="text-sm font-bold tracking-wider text-rosey-600 uppercase mb-2 block">
                Step 3
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Share - Share - Share
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                Just open your RBIZ and click on the "Share" button. You can choose from SMS, WhatsApp, Email, Facebook, or simply copy the link to share it just like any other web page.
              </p>
            </div>
          </div>

          {/* Video Content */}
          <div className="relative" data-aos="fade-left">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-rose-500 rounded-2xl opacity-20 blur-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-700 bg-black">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  className="w-full h-[400px] object-cover"
                  src="https://www.youtube.com/embed/Zx_Ud23OsME"
                  title="How Digital business card works"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;