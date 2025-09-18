import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedPosts from "@/components/sections/FeaturedPosts";
import CategoriesSection from "@/components/sections/CategoriesSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <FeaturedPosts />
        <CategoriesSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
