import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-20 px-4 overflow-hidden">
      {/* Background Gradient matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#381c73]/5 via-[#2574B7]/5 to-[#301065]/5 dark:from-[#381c73]/15 dark:via-[#2574B7]/15 dark:to-[#301065]/15" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-5 w-32 h-32 bg-[#381c73]/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-5 w-40 h-40 bg-[#2574B7]/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#301065]/10 rounded-full blur-lg"></div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="flex flex-col justify-center items-center space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#381c73] via-[#2574B7] to-[#301065] bg-clip-text text-transparent dark:from-blue-300 dark:via-blue-400 dark:to-purple-300">
              A perfect fit for everyone
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Choose the plan that works best for you and your team. 
              <span className="block text-lg mt-2 text-foreground/70">
                All plans include our core features with no hidden costs.
              </span>
            </p>
          </div>
          
          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 w-full">
            <PricingCard
              users="For One Person"
              priceName="Huncho Free"
              description="For designing or working on anything"
              price="$0"
              features={[
                "Basic templates & assets",
                "Standard quality exports",
                "1GB cloud storage",
                "Community support",
                "Basic collaboration tools",
                "Watermark on exports"
              ]}
            />
            
            {/* Huncho Pro - Disabled */}
            <div className="relative">
              <div className="absolute -top-3 -right-2 z-20">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  Coming Soon
                </span>
              </div>
              <div className="relative opacity-60 grayscale">
                <PricingCard
                  users="For One Person"
                  priceName="Huncho Pro"
                  description="For growing your brand or passion project with premium features"
                  price="$9.99"
                  features={[
                    "All Free features included",
                    "Premium templates & assets",
                    "HD & 4K exports",
                    "10GB cloud storage",
                    "Priority email support",
                    "Advanced design tools",
                    "No watermarks",
                    "Custom branding"
                  ]}
                  featured={true}
                />
              </div>
            </div>

            {/* Huncho Teams - Disabled */}
            <div className="relative">
              <div className="absolute -top-3 -right-2 z-20">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  Coming Soon
                </span>
              </div>
              <div className="relative opacity-60 grayscale">
                <PricingCard
                  users="For your team"
                  priceName="Huncho Teams"
                  description="For teams to create together with premium workplace tools and workflows"
                  price="$24.99"
                  features={[
                    "All Pro features included",
                    "Team workspaces & folders",
                    "100GB shared storage",
                    "Real-time collaboration",
                    "Admin & permission controls",
                    "Dedicated account manager",
                    "Advanced analytics",
                    "SSO & security features"
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center max-w-2xl mt-8">
            <p className="text-sm text-muted-foreground">
              💳 All plans come with a 14-day free trial. Cancel anytime. 
              <span className="block mt-1">
                🔒 Your data is always secure and encrypted.
              </span>
            </p>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 font-medium">
                🎉 Enjoy our <span className="font-bold">Huncho Free</span> plan while we prepare our premium offerings!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;