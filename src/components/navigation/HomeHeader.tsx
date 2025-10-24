"use client"
import { Button } from "@/components/ui/button";
import { useLoginStore } from "@/store/LoginStore";

import Image from "next/image";
import Link from "next/link";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ImSpinner6 } from "react-icons/im";
import UserButton from "../global/UserButton";

const HomeHeader = () => {
  const { setIsLogin } = useLoginStore();
  
  return (
    <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-gradient-to-r from-[#381c73] via-[#2574B7] to-[#301065] shadow-2xl shadow-black/20 backdrop-blur-sm border-b border-white/10">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="size-10 hover:scale-105 transition-transform duration-200"
        />
        <span className="ml-3 text-white font-bold text-xl hidden sm:block">Huncho Editor</span>
      </Link>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <AuthLoading>
          <div className="flex items-center gap-2">
            <ImSpinner6 className="animate-spin size-5 text-white" />
            <span className="text-white/80 text-sm">Loading...</span>
          </div>
        </AuthLoading>
        
        <Unauthenticated>
          <Button 
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm cursor-pointer"
            onClick={() => setIsLogin(true)}
          >
            Sign in
          </Button>
    <Button
  className="bg-gradient-to-r from-[#381c73] to-[#2574B7] text-white font-semibold px-5 py-2 rounded-md shadow-md hover:opacity-90 transition-all duration-200 cursor-pointer"
  onClick={() => setIsLogin(true)}
>
  Sign up
</Button>


        </Unauthenticated>
        
        <Authenticated>
                  <UserButton />

        </Authenticated>
      </div>
    </header>
  )
}

export default HomeHeader;