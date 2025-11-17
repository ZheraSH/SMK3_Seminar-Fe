import { PermissionCard } from "./PermissionCard";

export const PermissionCardsSection = ({ permissions, onViewDetail }) => {
  const cardsPerView = 3;
  const visibleCards = permissions.slice(0, cardsPerView);

  if (permissions.length === 0) {
    return (
      <div className="">
        <div className="flex flex-col items-center justify-center">
          <div className="w-[350px] h-[320px] mb-6 flex items-center justify-center">
            <img
              src="../../../../images/people/10.png"
              alt="Empty state"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-gray-500 text-center text-sm">
            Belum ada izin yang dikiukan, klik tombol buat izin untuk memulai.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex gap-4">
        {visibleCards.map((perm) => (
          <PermissionCard
            key={perm.id}
            permission={perm}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>
    </div>
  );
};
