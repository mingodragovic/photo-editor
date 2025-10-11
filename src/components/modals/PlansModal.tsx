import { usePricingStore } from "@/store/PricingStore";
import Pricing from "../Home/Pricing";
import { Dialog, DialogContent } from "../ui/dialog";

const PlansModal = () => {
  const { isPricing, setIsPricing } = usePricingStore();
  if (isPricing) {
    return (
      <Dialog onOpenChange={setIsPricing} open={isPricing}>
        <DialogContent className="sm:max-w-5xl overflow-y-auto border-none">
          <Pricing />
        </DialogContent>
      </Dialog>
    );
  }
};

export default PlansModal;