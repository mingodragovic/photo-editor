import Templates from "@/components/design/sidebar/Templates";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#381c73]/5 via-[#2574B7]/5 to-[#301065]/5 dark:from-[#381c73]/15 dark:via-[#2574B7]/15 dark:to-[#301065]/15">
      {/* Single continuous background for all sections */}
      <Hero />
      <Pricing />
      <div className="mx-10 lg:mx-20 pb-20">
        <Templates />
      </div>
    </div>
  );
}