"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { Button } from "@/components/ui/button";

import { useQuery } from "convex/react";
import Link from "next/link";
import { ImSpinner6 } from "react-icons/im";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "../../../convex/_generated/api";
import NoItems from "../global/NoItems";
import { toast } from "sonner";
dayjs.extend(relativeTime);

const RecentDesigns = () => {
  const { isOnline } = useNetworkStatusStore();
  const { mutate, pending } = useApiMutation(api.design.deleteDesign);
  const designs = useQuery(api.design.designs);

  if (!isOnline) {
    return null;
  }

  const HandleDelete = async (id: string) => {
    await mutate({ id }).then(
      () => {
        toast.success("Design deleted successfully");
      }
    ).catch((error) => {
      toast.error(`Error deleting design: ${error.message}`);
    });
  };

  return (
    <div className="space-y-6 pt-10">
      <h1 className="font-bold text-2xl text-gray-900 dark:text-white">Recent Designs</h1>
      
      {designs?.length === 0 && (
        <div className="flex justify-center">
          <NoItems text="Possibilities await!" />
        </div>
      )}
      
      {designs === undefined ? (
        <div className="flex justify-center items-center h-40">
          <ImSpinner6 className="size-10 animate-spin text-gray-600 dark:text-white" />
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/20 scrollbar-track-gray-100 dark:scrollbar-track-transparent">
          {designs?.map((design) => (
            <div 
              key={design._id}
              className="flex-shrink-0 w-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/10 dark:to-white/5 
                        border border-gray-300 dark:border-white/20 rounded-2xl backdrop-blur-sm 
                        hover:border-gray-400 dark:hover:border-white/40 hover:shadow-lg transition-all duration-200 
                        hover:scale-[1.02] group"
            >
              <div className="p-4 space-y-4">
                {/* Design Preview and Info */}
                <Link href={`/design/${design._id}`} className="block space-y-3">
                  {!design.thumbnailUrl ? (
                    <div className="w-full h-32 rounded-lg bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-white/60 text-sm">No preview</span>
                    </div>
                  ) : (
                    <img
                      src={design.thumbnailUrl}
                      alt={design.title}
                      className="w-full h-32 rounded-lg object-cover border border-gray-300 dark:border-white/20"
                    />
                  )}
                  
                  <div className="space-y-2">
                    <p className="text-gray-900 dark:text-white font-semibold truncate">
                      {design.title}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-700 dark:text-white/70">
                        {design.width} × {design.height}
                      </p>
                      <p className="text-gray-600 dark:text-white/60 bg-gray-200 dark:bg-black/30 px-2 py-1 rounded-full text-xs">
                        {dayjs(design._creationTime).fromNow()}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Delete Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={pending}
                  onClick={() => HandleDelete(design._id)}
                  className="w-full bg-red-100 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30 
                            border border-red-300 dark:border-red-400/30 text-red-700 hover:text-red-800 
                            dark:text-red-200 dark:hover:text-white transition-colors duration-200"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentDesigns;