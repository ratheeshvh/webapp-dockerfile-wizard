
import { useState } from "react";
import { DockerfileWizard } from "@/components/DockerfileWizard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500 mb-3">
              Dockerfile Generator Wizard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Create optimized Docker configurations for your web applications with just a few clicks
            </p>
          </div>
          
          <DockerfileWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
