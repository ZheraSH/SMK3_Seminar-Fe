import { Loader2 } from "lucide-react";

export default function LoadingData({ loading}) {
  if (!loading) return null;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      <p className="mt-3 text-lg text-gray-700">Memuat Data...</p>
    </div>
  );
}
