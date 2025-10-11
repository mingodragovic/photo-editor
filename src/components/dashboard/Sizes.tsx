"use client";

import SizeCard from "@/components/dashboard/SizeCard";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { Button } from "@/components/ui/button";
import { designTypes } from "@/types/types";
import { api } from "../../../convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";
import * as fabric from "fabric";

const Sizes = () => {
  const { isOnline } = useNetworkStatusStore();
    const router = useRouter();

  const { mutate, pending } = useApiMutation(api.design.createDesign);

  if (!isOnline) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 w-full overflow-x-auto py-2">
      {designTypes.map((design, i) => {
         const handleClick = async () => {
          await mutate({
            title: "untitled design",
            json: {
              version: fabric.version,
              objects: [],
              background: "#f0f0f0",
            },
            height: design.height,
            width: design.width,
            isPro: false,
            category: "",
            published: false,
          })
            .then((id) => {
              // console.log(id);
              router.push(`/design/${id}`);
            })
            .catch((error) => {
              console.log(error);
            });
        };
        return (
        <div key={i} className="flex flex-col items-center group">
          <Button
            className="flex flex-col items-center justify-center p-2 h-20 w-36 bg-gradient-to-br from-white/10 to-white/5 
                      border border-white/20 hover:border-white/40 backdrop-blur-sm 
                      transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
            variant={"ghost"}
          >
            <SizeCard
              name={design.label}
              Icon={design.icon}
              color={design.bgColor}
              height={design.height}
              width={design.width}
            />
          </Button>
          {/* Dimensions appear on hover */}
          <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="text-xs text-white/70 bg-black/30 px-1 py-0.5 rounded-full">
              {design.width} × {design.height}
            </p>
          </div>
        </div>
)})}
    </div>
  );
};

export default Sizes;