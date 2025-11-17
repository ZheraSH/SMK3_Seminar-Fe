export const getStatusColor = (status) => {
    switch (status) {
      case "Di Setujui":
        return "bg-[#10B981] text-[#10B981]";
      case "Di Proses":
        return "bg-[#FACC15]/20 text-[#FACC15]";
      case "Di Tolak":
        return "bg-[#FF5E53]/20 text-[#FF5E53]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  export const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Di Setujui":
        return "bg-[#10B981] text-[#10B981]";
      case "Di Proses":
        return "bg-[#FACC15]/20 text-[#FACC15]";
      case "Di Tolak":
        return "bg-[#FF5E53]/20 text-[#FF5E53]";
      default:
        return "bg-gray-500 text-white";
    }
  };
  