import React from "react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import DigitalSolutions from "./DigitalSolutions";
import DigitalIdentityToolsSection from "./DigitalIdentityToolsSection";
import IndustryHealthcareSection from "./IndustryHealthcareSection";
import AcademyEcosystemSection from "./AcademyEcosystemSection";
import ShowcaseBanners from "./ShowcaseBanners";
import ContactStrip from "./ContactStrip";
import Footer from "./Footer";

import PageTitle from "../../components/PageTitle";

const RevayahHome = () => {
  return (
    <div className="font-sans antialiased text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-950 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
      <PageTitle title="Reva-Yah One | One Platform. Every Digital Possibility." />
      {/* 1. Header / Navigation */}
      <NavBar />

      <main className="flex-grow w-full">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Choose Your Digital Journey (4 Audience Cards) */}
        <DigitalSolutions />

        {/* 4. Unified 3-Tier Split Grid Matrix (Sections 3, 4, 5 from Screenshot) */}
        <section className="bg-white dark:bg-slate-900 border-t border-b border-slate-200/90 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto divide-y divide-slate-200/90 dark:divide-slate-800">
            {/* Row 1: Digital Identity & Digital Tools */}
            <DigitalIdentityToolsSection />

            {/* Row 2: Industry Solutions & Digital Health */}
            <IndustryHealthcareSection />

            {/* Row 3: Reva-Yah One Academy & Why Reva-Yah One */}
            <AcademyEcosystemSection />
          </div>
        </section>

        {/* 5. Bottom Showcase: The House of Reva-Yah & Partner With Us */}
        <ShowcaseBanners />

        {/* 6. Call to Action Banner: Your Digital Journey Starts Here */}
        <ContactStrip />
      </main>

      {/* 9. Global Footer */}
      <Footer />
    </div>
  );
};

export default RevayahHome;