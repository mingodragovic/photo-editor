"use client";

import { useRouter } from "next/navigation";
import { FaCrown, FaCheck, FaStar } from "react-icons/fa";
import { useTransition } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginStore } from "@/store/LoginStore";
import { Badge } from "@/components/ui/badge";

interface PricingCardProps {
  users: string;
  priceName: string;
  description: string;
  price?: string;
  features?: string[];
  featured?: boolean;
}

const PricingCard = ({
  description,
  priceName,
  users,
  price,
  features = [],
  featured = false,
}: PricingCardProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const { setIsLogin } = useLoginStore();
  const isPro = user?.data?.isPro;

  const handleAction = () => {
    if (!user.data) {
      setIsLogin(true);
      return;
    }

    if (priceName === "Huncho Free") {
      router.push("/editor");
    } else {
      // Handle upgrade logic
      toast.success(`Starting your ${priceName} trial!`);
    }
  };

  return (
    <div
      className={cn(
        "relative group flex flex-col h-full p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl",
        featured
          ? "border-[#381c73] dark:border-blue-400 bg-gradient-to-br from-[#381c73]/10 to-[#2574B7]/10 dark:from-blue-950/30 dark:to-purple-950/30 shadow-lg"
          : "border-border bg-card/50 dark:bg-card/80 backdrop-blur-sm"
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-[#381c73] to-[#2574B7] text-white px-4 py-1 border-0 shadow-lg">
            <FaStar className="mr-1 size-3" />
            Most Popular
          </Badge>
        </div>
      )}

      {/* User Type */}
      <div className="flex justify-between items-center mb-6">
        <Badge 
          variant="secondary" 
          className={cn(
            "text-xs font-medium",
            featured ? "bg-white/80 dark:bg-black/20" : ""
          )}
        >
          {users}
        </Badge>
        {priceName !== "Huncho Free" && (
          <div className={cn(
            "p-2 rounded-full",
            featured ? "bg-yellow-400/20" : "bg-primary/10"
          )}>
            <FaCrown className={cn(
              "size-4",
              featured ? "text-yellow-400" : "text-primary"
            )} />
          </div>
        )}
      </div>

      {/* Plan Name & Price */}
      <div className="mb-4">
        <h3 className={cn(
          "text-2xl font-bold mb-2",
          featured ? "text-[#381c73] dark:text-blue-300" : "text-foreground"
        )}>
          {priceName}
        </h3>
        {price && (
          <div className="flex items-baseline gap-2 mb-2">
            <span className={cn(
              "text-3xl font-bold",
              featured ? "text-[#2574B7] dark:text-blue-400" : "text-foreground"
            )}>
              {price}
            </span>
            <span className="text-muted-foreground text-sm">
              {priceName !== "Huncho Free" ? "/month" : "forever"}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        {description}
      </p>

      {/* Features List */}
      {features.length > 0 && (
        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <FaCheck className={cn(
                "size-4 mt-0.5 flex-shrink-0",
                featured ? "text-green-500" : "text-primary"
              )} />
              <span className="text-sm text-foreground/90">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Action Button */}
      <Button
        onClick={handleAction}
        disabled={isPending || user.isLoading || (isPro && priceName !== "Huncho Teams")}
        className={cn(
          "w-full font-semibold transition-all duration-200 mt-auto",
          featured
            ? "bg-gradient-to-r from-[#381c73] to-[#2574B7] hover:from-[#381c73]/90 hover:to-[#2574B7]/90 text-white shadow-lg"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        size="lg"
      >
        {isPending ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        ) : null}
        
        {!user.data ? (
          "Get Started"
        ) : priceName === "Huncho Free" ? (
          "Use Huncho Free"
        ) : isPro && priceName === "Huncho Pro" ? (
          "Current Plan"
        ) : (
          `Start free ${priceName.includes('Pro') ? 'Pro' : 'Team'} trial`
        )}
      </Button>

      {/* Current User Status */}
      {user.data && isPro && priceName === "Huncho Pro" && (
        <p className="text-xs text-green-600 dark:text-green-400 text-center mt-3 font-medium">
          ✓ Your current plan
        </p>
      )}
    </div>
  );
};

export default PricingCard;