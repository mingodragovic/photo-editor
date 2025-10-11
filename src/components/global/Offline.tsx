"use client";

import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import Image from "next/image";

const Offline = () => {
  const { isOnline } = useNetworkStatusStore();

  if (!isOnline) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col justify-center items-center z-[120] backdrop-blur-sm">
        <div className="text-center space-y-6 p-8 max-w-md">
          <div className="relative">
            <Image
              src={"/offline.png"}
              alt="offline-png"
              height={200}
              width={200}
              className="mx-auto dark:invert dark:brightness-75"
            />
          </div>
          <div className="space-y-3">
            <p className="font-bold text-xl text-gray-900 dark:text-white">
              You&apos;re offline right now
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Please connect to the internet to access your designs
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-yellow-600 dark:text-yellow-400">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Attempting to reconnect...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default Offline;