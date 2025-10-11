import { Button } from "@/components/ui/button";
import { useLoginStore } from "@/store/LoginStore";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const LoginModal = () => {
  const { signIn } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const { isLogin, setIsLogin } = useLoginStore();
  const { isOnline } = useNetworkStatusStore();
  
  const onProviderSignUp = async (provider: "github" | "google") => {
    setLoading(true);
    await signIn(provider)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  if (isLogin) {
    return (
      <Dialog onOpenChange={setIsLogin} open={isLogin}>
        <DialogContent className="flex p-0 border-none md:max-w-lg lg:max-w-4xl rounded-lg overflow-hidden">
          {/* Left side - Content */}
          <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-[#381c73] via-[#2574B7] to-[#301065] text-white">
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              Log in or sign up in seconds
            </DialogTitle>
            <p className="text-white/90 mt-4 text-center text-lg mb-8">
              Use your email or another service to continue with{" "}
              <span className="font-bold">Huncho Editor</span> (it&apos;s free)!
            </p>
            
            <div className="w-full space-y-4">
              <Button
                className="w-full relative h-12 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                onClick={() => onProviderSignUp("google")}
                disabled={loading || !isOnline}
              >
                <FcGoogle className="size-5 absolute left-4" />
                <span className="text-white font-medium">Continue with Google</span>
              </Button>
              
              <Button
                className="w-full relative h-12 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                onClick={() => onProviderSignUp("github")}
                disabled={loading || !isOnline}
              >
                <FaGithub className="size-5 absolute left-4 text-white" />
                <span className="text-white font-medium">Continue with Github</span>
              </Button>
              
              <Button 
                className="w-full relative h-12 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <MdOutlineMail className="size-5 absolute left-4" />
                <span className="text-white font-medium">Continue with email</span>
              </Button>
            </div>
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center mt-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          
          {/* Right side - Image */}
          <div className="hidden md:flex flex-1">
            <Image
              src="/auth_dialog_canva.jpg"
              alt="auth_dialog_canva"
              height={500}
              width={400}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};

export default LoginModal;