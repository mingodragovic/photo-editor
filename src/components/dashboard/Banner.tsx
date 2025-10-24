"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

const Banner = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") || "false";
  
  return (
    <div className="text-gray-900 dark:text-white aspect-[7/1] min-h-[248px] w-full flex justify-center items-center rounded-2xl bg-gradient-to-r from-blue-100 via-blue-200 to-purple-100 dark:from-[#381c73] dark:via-[#2574B7] dark:to-[#301065] shadow-2xl shadow-black/20 border border-gray-300 dark:border-white/10">
      <div className="text-center space-y-6">
        <h1 className="font-bold text-4xl lg:text-6xl flex items-center justify-center text-gray-900 dark:text-white">
          {success === "true" ? (
            <>
              Enjoy
              <Image
                src="/favicon.ico"
                alt="favicon"
                height={100}
                width={100}
                className="size-16 animate-bounce mx-4"
              />
              Pro
            </>
          ) : (
            <>
              <Image
                src="/favicon.ico"
                alt="favicon"
                height={100}
                width={100}
                className="size-16 animate-bounce mr-4"
              />
              Edit Without Boundaries
              <Image
                src="/favicon.ico"
                alt="favicon"
                height={100}
                width={100}
                className="size-16 animate-bounce ml-4"
              />
            </> 
          )}
        </h1>
        <p className="text-gray-700 dark:text-white/80 text-sm lg:text-xl">
          Let your mind go wild.
        </p>
      </div>
    </div>
  );
};

export default Banner;