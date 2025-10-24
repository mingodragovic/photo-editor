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
    <div className="flex flex-wrap justify-center gap-4 w-full overflow-x-auto py-2">
      {designTypes.map((design, i) => {
        const handleClick = async () => {
          await mutate({
            title: design.label,
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
              router.push(`/design/${id}`);
            })
            .catch((error) => {
              console.log(error);
            });
        };
        return (
          <div key={i} className="flex flex-col items-center group">
            <Button
              className="flex flex-col items-center justify-center p-4 h-24 w-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/10 dark:to-white/5 
                        border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 backdrop-blur-sm 
                        transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer rounded-xl"
              variant={"ghost"}
              onClick={handleClick}
              disabled={pending}
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
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-xs text-gray-600 dark:text-white/70 bg-gray-200 dark:bg-black/30 px-2 py-1 rounded-full">
                {design.width} × {design.height}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sizes;