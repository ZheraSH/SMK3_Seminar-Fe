export const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-[#10B981]/20 text-[#10B981]";
      case "pending":
        return "bg-[#FACC15]/20 text-[#FACC15]";
      case "rejected":
        return "bg-[#FF5E53]/20 text-[#FF5E53]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  export const getStatusBadgeColor = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "di setujui":
      case "approved":
        return "bg-[#10B981]/20 text-[#10B981]";
      case "menunggu":
      case "pending":
        return "bg-[#FACC15]/20 text-[#FACC15]";
      case "ditolak":
      case "rejected":
        return "bg-[#FF5E53]/20 text-[#FF5E53]";
      default:
        return "bg-gray-500 text-white";
    }
  };
  