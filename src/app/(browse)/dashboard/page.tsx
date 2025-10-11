// src/app/(browse)/dashboard/page.tsx
"use client";

import Banner from "@/components/dashboard/Banner";
import RecentDesigns from "@/components/dashboard/RecentDesigns";
import Sizes from "@/components/dashboard/Sizes";
import Offline from "@/components/global/Offline";

const DashboardPage = () => {
  return (
    <div className="space-y-6 lg:space-y-12 mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8 pt-8">
      <Banner />
      <Offline />
      <Sizes />
      <RecentDesigns />
    </div>
  );
};

export default DashboardPage;