import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex items-center gap-2">
    <Loader2 className="animate-spin" size={18} />
    <span>Memproses...</span>
  </div>
);
