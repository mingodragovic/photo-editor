import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/fetch/useCurrentUser";

import { useAuthActions } from "@convex-dev/auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FaCrown, FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { MdLogout, MdOutlinePriceCheck } from "react-icons/md";

const UserButton = () => {
  const { setTheme, theme } = useTheme();
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { data } = useCurrentUser();

  const logout = () => {
    router.push("/");
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer mr-2 relative">
          <Avatar className="size-10 items-center rounded-full relative border-2 border-white/20 hover:border-white/40 transition-all duration-200">
            <AvatarImage
              src={data?.image}
              alt={data?.name?.charAt(0).toUpperCase()}
              className="hover:scale-105 transition-transform duration-200"
            />
            <AvatarFallback className="rounded-full bg-white/10 text-white font-medium">
              {data?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {data?.isPro && (
            <FaCrown className="size-4 text-yellow-400 absolute -top-1 -right-1 bg-gradient-to-r from-[#381c73] to-[#2574B7] rounded-full p-0.5" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-48 bg-gradient-to-br from-[#381c73] via-[#2574B7] to-[#301065] border border-white/20 backdrop-blur-md text-white z-[70]"
        align="end"
      >
        {/* User Info Section */}
        <div className="px-2 py-1.5 border-b border-white/10">
          <DropdownMenuLabel className="text-white font-semibold text-sm">
            {data?.name}
          </DropdownMenuLabel>
          <p className="text-white/70 text-xs truncate">{data?.email}</p>
          {data?.isPro && (
            <div className="flex items-center gap-1 mt-1">
              <FaCrown className="size-3 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-medium">Pro Member</span>
            </div>
          )}
        </div>

        {/* Theme Selector */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center text-sm hover:bg-white/10 focus:bg-white/10">
            {theme === "light" ? (
              <IoSunnyOutline className="mr-2 size-4" />
            ) : (
              <FaMoon className="mr-2 size-4" />
            )}
            <span className="capitalize">Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-40 bg-gradient-to-br from-[#381c73] via-[#2574B7] to-[#301065] border border-white/20 backdrop-blur-md text-white z-[70]">
              <DropdownMenuLabel className="text-white">Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuCheckboxItem
                checked={theme === "system"}
                onCheckedChange={() => setTheme("system")}
                className="text-sm hover:bg-white/10 focus:bg-white/10"
              >
                System
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={theme === "dark"}
                onCheckedChange={() => setTheme("dark")}
                className="text-sm hover:bg-white/10 focus:bg-white/10"
              >
                Dark
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={theme === "light"}
                onCheckedChange={() => setTheme("light")}
                className="text-sm hover:bg-white/10 focus:bg-white/10"
              >
                Light
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Plans & Pricing */}
        <DropdownMenuItem className="text-sm hover:bg-white/10 focus:bg-white/10"                      onClick={() => window.scrollTo({ top: document.getElementById('pricing')?.offsetTop, behavior: 'smooth' })}
>
          <MdOutlinePriceCheck className="mr-2 size-4" />

          Plans & Pricing
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Sign Out */}
        <DropdownMenuItem 
          onClick={logout}
          className="text-sm hover:bg-red-500/20 focus:bg-red-500/20 text-red-200 hover:text-red-100"
        >
          <MdLogout className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;