"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginStore } from "@/store/LoginStore";
import { useRouter } from "next/navigation";
import { FaRocket, FaPaintBrush, FaMagic } from "react-icons/fa";

const Hero = () => {
  const { data } = useCurrentUser();
  const { setIsLogin } = useLoginStore();
  const router = useRouter();

  const handleClick = () => {
    if (data) {
      router.push("/dashboard");
    } else {
      setIsLogin(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#381c73]/10 via-[#2574B7]/10 to-[#301065]/10 dark:from-[#381c73]/20 dark:via-[#2574B7]/20 dark:to-[#301065]/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-pulse">
        <FaPaintBrush className="text-[#381c73] dark:text-blue-400 size-20" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-bounce">
        <FaMagic className="text-[#2574B7] dark:text-blue-300 size-16" />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-15 animate-spin-slow">
        <FaRocket className="text-[#301065] dark:text-purple-400 size-24" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center space-y-10 max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            What will you
            <span className="block sm:inline">
              <span className="bg-gradient-to-r from-[#381c73] via-[#2574B7] to-[#301065] dark:from-blue-300 dark:via-blue-400 dark:to-purple-300 bg-clip-text text-transparent mx-2">
                design
              </span>
              today?
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Huncho Editor makes it easy to create and share professional designs 
            with powerful AI-assisted tools and seamless collaboration.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            onClick={handleClick}
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-[#381c73] to-[#2574B7] hover:from-[#381c73]/90 hover:to-[#2574B7]/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <FaRocket className="mr-2 size-5" />
            Start designing for free
          </Button>
          
          {/* Secondary CTA */}
          <Button 
            variant="outline"
            className="px-6 py-6 text-lg border-2 border-[#381c73]/30 dark:border-blue-400/30 text-foreground hover:bg-[#381c73]/10 dark:hover:bg-blue-400/10 transition-all duration-300"
            onClick={() => window.scrollTo({ top: document.getElementById('pricing')?.offsetTop, behavior: 'smooth' })}
          >
            View pricing
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
          <div className="flex flex-col items-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
            <div className="p-3 bg-gradient-to-r from-[#381c73] to-[#2574B7] rounded-full mb-4">
              <FaMagic className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
            <p className="text-sm text-muted-foreground text-center">
              Smart design suggestions and automated formatting
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
            <div className="p-3 bg-gradient-to-r from-[#2574B7] to-[#301065] rounded-full mb-4">
              <FaPaintBrush className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Professional Tools</h3>
            <p className="text-sm text-muted-foreground text-center">
              Advanced editing features for stunning visuals
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
            <div className="p-3 bg-gradient-to-r from-[#301065] to-[#381c73] rounded-full mb-4">
              <FaRocket className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground text-center">
              Real-time collaboration and instant publishing
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-20 text-sm text-muted-foreground">
          <p>Trusted by thousands of designers worldwide</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#381c73] dark:border-blue-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#381c73] dark:bg-blue-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;