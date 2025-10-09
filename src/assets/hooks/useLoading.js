import { useState, useEffect } from "react";

const useLoading = (initialLoading = true) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [connectionSpeed, setConnectionSpeed] = useState("normal");

  useEffect(() => {
    if (!isLoading) return;

    // Deteksi kecepatan koneksi
    const detectConnectionSpeed = () => {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        switch (effectiveType) {
          case "slow-2g":
          case "2g":
            return "slow";
          case "3g":
            return "normal";
          case "4g":
            return "fast";
          default:
            return "normal";
        }
      }
      return "normal";
    };

    const speed = detectConnectionSpeed();
    setConnectionSpeed(speed);

    // Deteksi apakah semua resource sudah loaded
    const checkResourcesLoaded = () => {
      // Cek apakah DOM sudah fully loaded
      if (document.readyState === "complete") {
        // Cek apakah semua gambar sudah loaded
        const images = document.querySelectorAll("img");
        const allImagesLoaded = Array.from(images).every((img) => img.complete);

        // Cek apakah ada font yang masih loading
        const fontsLoaded = document.fonts
          ? document.fonts.ready
          : Promise.resolve();

        return Promise.all([Promise.resolve(allImagesLoaded), fontsLoaded]);
      }
      return Promise.resolve([false, false]);
    };

    // Simulasi loading berdasarkan koneksi
    const getLoadingTime = () => {
      switch (speed) {
        case "slow":
          return 4000; // 4 detik untuk koneksi lambat
        case "fast":
          return 1500; // 1.5 detik untuk koneksi cepat
        default:
          return 2500; // 2.5 detik untuk koneksi normal
      }
    };

    const loadingTime = getLoadingTime();

    // Kombinasi timer dan resource checking
    const timer = setTimeout(() => {
      checkResourcesLoaded().then(([imagesLoaded, fontsLoaded]) => {
        // Jika semua resource sudah loaded atau sudah mencapai waktu maksimal
        if ((imagesLoaded && fontsLoaded) || loadingTime >= 3000) {
          setIsLoading(false);
        } else {
          // Tunggu sedikit lagi jika resource belum ready
          setTimeout(() => setIsLoading(false), 1000);
        }
      });
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    connectionSpeed,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
